console.log("i do my lil dancy dance");


//------------ CONFIG -------------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDpzC52LL7rOGsowOGEYvqf-PyfL49EBR0",
    authDomain: "stress-o-meter-1614429921764.firebaseapp.com",
    projectId: "stress-o-meter-1614429921764",
    storageBucket: "stress-o-meter-1614429921764.appspot.com",
    messagingSenderId: "224492503332",
    appId: "1:224492503332:web:a1114c94c713173b8f33b1",
    measurementId: "G-L1XYTE15H9"
};
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let config = { // google calendar API
    clientId: "224492503332-3o7i3da82k1u7pnm2esp3pu7jk0nln10.apps.googleusercontent.com",
    clientSecret: "_tRhBWrP5A47r1gDIJw-krSH",
    apiKey: "AIzaSyDpzC52LL7rOGsowOGEYvqf-PyfL49EBR0"
};
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
//----------------------------------------------------------------


//------------ GLOBALS -------------------------------------------
let userId;
var monthDayInfo = [];
let baseNumber = 1.0;
//----------------------------------------------------------------


//-------------- AUTHENTICATION -----------------------------------
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: config.apiKey,
        clientId: config.clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        
        logInButton.onclick = handleAuthClick;
        logOutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    logInButton = document.getElementById("logInButton");
    logOutButton = document.getElementById("logOutButton");

    if(isSignedIn) {
        logInButton.style.display = "none";
        logOutButton.style.display = 'block';

        let id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).id_token;
        let access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token;

        const credential = firebase.auth.GoogleAuthProvider.credential(
            id_token,
            access_token
        );
        firebase.auth().signInWithCredential(credential).then(() => {
            userId = firebase.auth().currentUser.uid;
            getBaseNumber().then(calculateStress());
        });
        
    } else {
        logInButton.style.display = 'block';
        logOutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut()
    .then(() => {
        return firebase.auth().signOut()
    });
}
//----------------------------------------------------------------


//----------------- USER PROPERTIES ------------------------------
async function getBaseNumber() {
    db.collection('users').doc(userId).get().then((doc) => {
        if(!doc.exists) {
            setBaseNumber(1);
        } else {
            baseNumber = doc.data().baseNumber;
        }
    });
}

async function setBaseNumber(n) {
    db.collection('users').doc(userId).set({
        baseNumber: n
    });
    baseNumber = n;
}
//----------------------------------------------------------------


//-------------------- CALCULATION ---------------------------------
function calculateStress() {
    console.log(baseNumber);
    let monthEndDate = moment().endOf("month");
    let daliklis = Math.pow(baseNumber, 1/7);

    let tasks = [];
    let score = [];
    for(let i = 1; i <= parseInt(monthEndDate.format("DD")); i++) {
        tasks[i] = 0;
        score[i] = 1; // 1 is default
    }        

    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': moment().startOf("month").toISOString(),
        'timeMax': moment().endOf("month").add(1, "month").toISOString(),
        'showDeleted': false,
        'maxResults': 2500,
        'singleEvents': true,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;

        for(let i = 0; i < events.length; i++) {
            // check if event is an assignment
            let summary = events[i].summary.toLowerCase();
            if(!summary.includes("assignment") && !summary.includes("exam")) {
                continue;
            }

            // get event date, increase amount of tasks that day
            var when = events[i].start.dateTime ?? events[i].start.date;
            if(moment(when) <= monthEndDate) {
                tasks[moment(when).format("D")]++; 
            } 

            // go through each day 7 days before assignment, calculate day's score
            let stressPerDay = {};
            for(let delta = 0; delta < 8; delta++) {
                stressPerDay[
                    moment(when).add(-delta, "days").toISOString()
                ] = baseNumber/Math.pow(daliklis, delta) -1;
            }

            // check each of the 7 days if they are in this month, if so, increase day score
            for(const dateBeforeExam in stressPerDay) {
                if(moment(dateBeforeExam) < monthEndDate) {
                    score[
                        moment(dateBeforeExam).format("D")
                    ] += stressPerDay[dateBeforeExam];
                }
            }
        }

        for(let i = 1; i <= parseInt(monthEndDate.format("D")); i++) {
            monthDayInfo.push({
                'date': moment().startOf("month").add(i, "days").format("YYYY-MM-DD"),
                'numOfAssignments': tasks[i],
                'score': (score[i]*10).toFixed(2)
            });
        }
        
        appendPre(`Date\t\tNumber of assignments\tStress level`)
        for(const mdi of monthDayInfo) {
            appendPre(`${mdi.date}\t\t${mdi.numOfAssignments}\t\t${mdi.score}`);
        }
    })
}
//----------------------------------------------------------------

function appendPre(message) {
    var pre = document.getElementById("scriptOutput");
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}