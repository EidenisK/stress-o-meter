let config = {
    clientId: "224492503332-3o7i3da82k1u7pnm2esp3pu7jk0nln10.apps.googleusercontent.com",
    clientSecret: "_tRhBWrP5A47r1gDIJw-krSH",
    apiKey: "AIzaSyDpzC52LL7rOGsowOGEYvqf-PyfL49EBR0"
};

console.log("i'll do my lil dancy dance");

var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var logInButton = document.getElementById("logInButton");
var logOutButton = document.getElementById("logOutButton");

function handleClientLoad() {
    console.log("handleClientLoad");
    gapi.load('client:auth2', initClient);
}

function initClient() {
    console.log('initClient');

    gapi.client.init({
        apiKey: config.apiKey,
        clientId: config.clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        console.log('add onclick func');
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        
        logInButton.onclick = handleAuthClick;
        logOutButton.onclick = handleSignoutClick;
        
    }, function(error) {
        console.log('eeeee');
        appendPre(JSON.stringify(error, null, 2));
    });

    console.log('a');
}

function updateSigninStatus(isSignedIn) {
    logInButton = document.getElementById("logInButton");
    logOutButton = document.getElementById("logOutButton");

    if(isSignedIn) {
        logInButton.style.display = "none";
        logOutButton.style.display = 'block';
        listUpcomingEvents();
    } else {
        logInButton.style.display = 'block';
        logOutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function appendPre(message) {
    var pre = document.getElementById("scriptOutput");
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;
        appendPre('Upcoming events:');

        if(events.length > 0) {
            for(let i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if(!when) {
                    when = event.start.date;
                }

                appendPre(event.summary + ' (' + when + ')');
            }
        } else {
            appendPre('No upcoming events found');
        }
    })
}