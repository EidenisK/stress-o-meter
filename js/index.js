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
        
        alert("To make the results more accurate, please fill out the questionnaire!\n(click the button in the sidebar)");
    } else {
        baseNumber = doc.data().baseNumber;
        if(!doc.data().filledOut) {
            alert("To make the results more accurate, please fill out the questionnaire!\n(click the button in the sidebar)");
        }
    }
}

async function setBaseNumber(n, date) {
    let q = {
        baseNumber: n
    };
    if(date) {
        q.filledOut = date;
    }
    await db.collection('users').doc(userId).set(q);
    baseNumber = n;
    console.log("Created new base number");
}
//----------------------------------------------------------------


function appendPre(message) {
    var pre = document.getElementById("scriptOutput");
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}


function loadColors() {
    let array = document.getElementsByClassName("calendar__day");

    let today = new Date();
    let monthDays = moment(today).daysInMonth();
    let weekDay = moment(today).day();
    let thisDay = moment(today).date();
    let startWeekDay = moment(today).subtract(thisDay, 'days').day();
    let thisMonth = moment(today).month();

    for (let index = 0; index < startWeekDay; index++) {
      const element = array[index];
      element.innerHTML = "";
    }

    let dayOfMonth = 1;
    for (let index = startWeekDay; index < startWeekDay + monthDays; index++) {
      const element = array[index];
      element.innerHTML = dayOfMonth;
      dayOfMonth++;
    }
    for (let index = startWeekDay + monthDays; index < array.length; index++) {
      const element = array[index];
      element.innerHTML = "";
    }

    for (let index = 0; index < monthDayInfo.length; index++) {
      const element = monthDayInfo[index];
      if (moment(element.date).month() == thisMonth) {
        let day = moment(element.date).date();
        let transparentValue = 110 - element.score / 40 * 100;
        //array[startWeekDay + day - 1].css('style', 'background-color', "background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.01) 1%, rgba(0,0,0,1) 100%)'");
        //array[startWeekDay + day - 1].style.backgroundImage = "repeating-linear-gradient(45deg, transparent " + transparentValue + "%, rgba(255 0 0 / 50%) 100%)";
        //array[startWeekDay + day - 1].style.background = "-moz-repeating-linear-gradient(45deg, rgb(255, 0, 0) 0%, rgb(255, 0, 0) 10%, rgb(255, 255, 255) 10%, rgb(255, 255, 255) 50%)";
        array[startWeekDay + day - 1].style.background = "repeating-linear-gradient(45deg, rgba(255 0 0 / 50%), rgba(255 0 0 / 50%) 12px, #f2f2f2 12px, #f2f2f2 " + transparentValue + "px)";

        /*let rValue = Math.min(
          50 + element.score / 40 * 150, 200
          );
        /let gValue = 255 - rValue;
        let day = moment(element.date).date();
        array[startWeekDay + day - 1].style.backgroundColor = "rgba(" + rValue + "," + gValue + "," + 0 + "," + 0.8 + ")";*/

        /*if (element.score <= 15) {
          let day = moment(element.date).date();
          array[startWeekDay + day - 1].classList.setAttribute("bacground-color", "rgb(" + rValue + "," + gValue + "," + 0 + ")");
        }
        else if (element.score <= 25) {
          let day = moment(element.date).date();
          array[startWeekDay + day - 1].classList.add('stress_25');
        }
        else if (element.score <= 35) {
          let day = moment(element.date).date();
          array[startWeekDay + day - 1].classList.add('stress_35');
        }
        else if (element.score > 35) {
          let day = moment(element.date).date();
          array[startWeekDay + day - 1].classList.add('stress_40');
        }*/
      }
    }
}