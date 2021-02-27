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
let baseNumber = 10.0;
//----------------------------------------------------------------


//----------------- USER PROPERTIES ------------------------------
async function getBaseNumber() {
    doc = await db.collection('users').doc(userId).get();
    if(!doc.exists) {
        console.log("Creating new base number...");
        setBaseNumber(10.0);
    } else {
        baseNumber = doc.data().baseNumber;
    }
}

async function setBaseNumber(n) {
    await db.collection('users').doc(userId).set({
        baseNumber: n
    });
    baseNumber = n;
    console.log("Created new base number");
}
//----------------------------------------------------------------


function appendPre(message) {
    var pre = document.getElementById("scriptOutput");
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}