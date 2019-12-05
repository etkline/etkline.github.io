// Firebase API Test: Send HTTP GET Request to Firebase Cloud Functions
var endpoints = ["easy", "medium", "hard"];
function viewScores() {

    var entries = [];
    for (var i = 0; i < 3; i++) {
        var url = "https://us-central1-test-9d6bc.cloudfunctions.net/" + endpoints[i] + "Scores";

        // Synchronous XMLHttpRequests are deprecated but are the most
        // straightforward way of enforcing consecutive REST API Calls
        let request = new XMLHttpRequest();
        request.onload = function() {
            entries.push(JSON.parse(this.response)[endpoints[i]]);
        }
        request.open("GET", url, false);
        request.send(); // Comment out line when wanting to disable http requests
    }
    document.getElementById("mTitle").innerHTML = "High Scores";
    document.getElementById("myModal").style.display = "block";
    var len = Math.max(entries[0].length, entries[1].length, entries[2].length);

    // Creates table to display data
    var table = '<table id="leaderboard" class="scoreTable" style="border: 1.5pt solid black;">'
                    + '<thead><tr>'
                    + '<th class="cap end" colspan="3">Easy</th>'
                    + '<th class="cap end" colspan="3">Medium</th>'
                    + '<th class="cap" colspan="3">Hard</th>'
                    + '</tr><tr>'
                    + '<th class="head">Rank</th><th class="head">Name</th><th class="head end">Time (s)</th>'
                    + '<th class="head">Rank</th><th class="head">Name</th><th class="head end">Time (s)</th>'
                    + '<th class="head">Rank</th><th class="head">Name</th><th class="head">Time (s)</th>'
                    + '</tr></thead><tbody>';

    for (var i = 0; i < len; i++) {
        table += '<tr>';
        for (var j = 0; j < 3; j++) {
            if (i < entries[j].length) {
                table += '<td class="cell">' + (i+1) + '</td>'
                            + '<td class="cell">' + entries[j][i].name + '</td>'
                            + '<td class="cell end">' + entries[j][i].time + '</td>';
            } else {
                table += '<td class="cell"></td><td class="cell"></td><td class="cell end"></td>';
            }
        }
        table += '</tr>';
    }
    table += '</tbody><table>';
    document.getElementById("mBody").innerHTML = table;
}

function enterTime() {
    document.getElementById("mTitle").innerHTML = "Victory!";
    document.getElementById("myModal").style.display = "block";

    var mBody = document.getElementById("mBody");
    if (isCustom){
        mBody.innerHTML = '<p>Play with a preset difficulty to record your time.</p>'
                + '<p>Time: ' + numTicks + ' seconds</p>'
                + '<button onclick="closeModal()">OK</button>';
    } else {
        mBody.innerHTML = '<label for="name"><b>Name: </b></label>'
                + '<input type="text" placeholder="Name" name="name" id="name">'
                + '<p>Time: ' + numTicks + ' seconds</p>'
                + '<button onClick="submit()">Submit</button>';
    }
}

function submit() {

    var nameInput = document.getElementById("name");
    if (nameInput != null && nameInput.value != "") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                document.getElementById("myModal").style.display = "block";
                var mBody = document.getElementById("mBody");
                mBody.innerHTML = '<p>Form Data Submitted</p>'
                        + '<p>Timestamp: ' + JSON.parse(this.response).id + '</p>'
                        + '<p>Name: ' + nameInput.value + '</p>'
                        + '<p>Time: ' + numTicks + ' seconds</p>'
                        + '<button onclick="closeModal()">OK</button>';
            }
        };
        xhttp.open("POST", "https://us-central1-test-9d6bc.cloudfunctions.net/insertScore");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send('{"difficulty":"' + diffSetting + '","name":"' + nameInput.value + '","time":' + numTicks + '}'); // Comment out line when wanting to disable http requests
    } else {
        document.getElementById("myModal").style.display = "block";
        var mBody = document.getElementById("mBody");
        mBody.innerHTML = '<label for="name"><b>Name: </b></label>'
                + '<input type="text" placeholder="Name" name="name" id="name">'
                + ' &nbsp;<span style="color:red">**Must Enter Name</span></p>'
                + '<p>Time: ' + numTicks + ' seconds</p>'
                + '<button onClick="submit()">Submit</button>';
    }
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}