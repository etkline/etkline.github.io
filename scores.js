// Cloud Firestore GET Request (Don't use during testing):
// https://firestore.googleapis.com/v1/projects/test-9d6bc/databases/(default)/documents/easy

// Firebase API Test: Send HTTP GET Request to Firebase Cloud Functions
function viewScores() {
    var request = new XMLHttpRequest();
    request.open("GET", "https://us-central1-test-9d6bc.cloudfunctions.net/helloWorld");

    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status == 200) {
            document.getElementById("apiTest").innerHTML = "<h3>" + data.message + "</h3>";
        } else {
            document.getElementById("apiTest").innerHTML = "<h3>Connection Error!</h3>";
        }
    }
    //request.send(); // Comment out line when wanting to disable http requests
}