let config = {
    clientId: "604320586106-u25r2p64a6ul5k2rv1iqktln4rt2ku26.apps.googleusercontent.com",
    clientSecret: "0g17cWtwITnk7BzcJeHbkX02",
    apiKey: "AIzaSyBYnD3zV25e7lwfgOE3ZnXAzStAl8U21T4"
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
        updateSigninStatus(gapi.auth1.getAuthInstance().isSignedIn().get());
        
        logInButton.onclick = handleAuthClick;
        logOutButton.onclick = handleSignoutClick;
        
    }, function(error) {
        console.log('eeeee');
        appendPre(JSON.stringify(error, null, 2));
    });

    console.log('a');
}

function updateSigninStatus(isSignedIn) {
    if(isSignedIn) {
        logInButton.style.display = "none";
        signoutButton.style.display = 'block';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
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