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
        console.log(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    logInButton = document.getElementById("logInButton");
    logOutButton = document.getElementById("logOutButton");

    if(isSignedIn) {
        document.getElementById("loginBody").style.visibility = "hidden";

        let id_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).id_token;
        let access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).access_token;

        let profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        document.getElementById("avatar-image").setAttribute("src", profile.getImageUrl());
        document.getElementById("avatar-name").innerHTML = profile.getName();


        const credential = firebase.auth.GoogleAuthProvider.credential(
            id_token,
            access_token
        );
        displayRandomTip();
        firebase.auth().signInWithCredential(credential).then(() => {
            userId = firebase.auth().currentUser.uid;
            getBaseNumber().then(function() {
                calculateStress();
            });
        });
        
    } else {
        document.getElementById("loginBody").style.visibility = "visible";
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