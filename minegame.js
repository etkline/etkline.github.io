// Cloud Firestore GET Request (Don't use during testing):
// https://firestore.googleapis.com/v1/projects/test-9d6bc/databases/(default)/documents/easy

// Firebase API Test: Send HTTP GET Request to Firebase Cloud Functions
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

// global static variables
var numRows;
var numCols;
var started = false;

var minePos = [];

// Creates game board
function start(countR, countC) {

    numRows = countR;
    numCols = countC;

    // Get's table and creates body to contain the board
    var game = document.getElementById("game");
    var board = document.createElement("tbody");
    board.id = "board";

    // creates rows to house buttons
    for (var i = 0; i < numRows; i++) {
        var tr = document.createElement("tr");

        // creates buttons in the row
        for (var j = 0; j < numCols; j++) {
            var td = document.createElement("td");
            var btn = document.createElement("button");
            //btn.classList.add("btn");

            // adds style and identification to buttons
            btn.onmousedown = function() {select(event, this.id)};
            btn.onmouseup = function() {confirm(this.id)};

            btn.classList.add("sqr");
            btn.classList.add("img");
            btn.id = i + "," + j;

            // appends button to row
            td.appendChild(btn);
            tr.appendChild(td)
        }
        board.appendChild(tr);
    }
    // creates a new gameboard
    game.replaceChild(board, document.getElementById("board"));
    minePos.length = 0;

    started = false;
}

// Remember selection made
var sEvent;
var sId;

function select(event, id) {
    sEvent = event.which;
    sId = id;
}

function confirm(id) {

    // if selection confirmed
    if (id == sId) {

        // if left button click...
        if (sEvent == 1 && document.getElementById(id).innerHTML == "") {

            // generate mines after first selection (for fairness)
            if (!started) {
                var pos = id.split(",");
                var rPos = parseInt(pos[0]);
                var cPos = parseInt(pos[1]);

                // Generates mines
                while (minePos.length < 99) {
                    var prng = new Math.seedrandom();
                    var row = Math.floor(prng() * numRows);
                    var col = Math.floor(prng() * numCols);

                    var mineId = row + "," + col;
                    if (!minePos.includes(mineId) && (Math.abs(rPos - row) > 1 || Math.abs(cPos - col) > 1)) {
                        minePos.push(mineId);
                    }
                }
            }

            // If square holds a mine...
            if (minePos.includes(id)) {
                alert('Game over!');

                for (var mineId of minePos) {

                    // Shows different icon for mine that was hit
                    if (mineId == id) {
                        document.getElementById(mineId).innerHTML = "&#128165;";
                    } else {
                        document.getElementById(mineId).innerHTML = "&#128163;";
                    }
                }
            } else {
                displayValue(id);
            }
        } else if (sEvent == 3) {
            var btn = document.getElementById(id);

            // UTF-16 equivalent for 🚩
            if (btn.innerHTML == "\uD83D\uDEA9") {
                btn.innerHTML = "";
            } else if (btn.innerHTML == "") {
                btn.innerHTML = "&#128681;";
            }
        }
    }
}

// Computes the square's values from the adjacent spaces
// each adjacent mine increments the square's value
function displayValue(id) {

    // Reformat button to display text
    var btn = document.getElementById(id);
    btn.classList.remove("img");
    btn.classList.add("txt");

    // Get position from id
    var pos = id.split(",");
    var row = parseInt(pos[0]);
    var col = parseInt(pos[1]);

    // Keep track of adjacent positions
    // (for when there are no adjacent mines)
    var adjPos = [];
    var count = 0;

    // Checks adjacent squares
    for (var i = -1; i <= 1; i++) {
        var r = row + i;

        for (var j = -1; j <= 1; j++) {
            var c = col + j;

            if (minePos.includes(r + "," + c)) {
                count++;
            } else if (r >= 0 && r < numRows && c >= 0 && c < numCols) {
                adjPos.push(r + "," + c);
            }
        }
    }

    // If no adjacent mines then display adj sqrs
    if (count == 0) {

        // Text for squares with a value of 0 is set to a
        // "space" to differentiate from unchecked spuares.
        btn.innerHTML = " ";
        btn.disabled = true;

        for (var pos of adjPos) {
            var sqr = document.getElementById(pos);

            // Includes flags in checked squares
            if (sqr.innerHTML == "" || sqr.innerHTML == "\uD83D\uDEA9") {
                displayValue(pos);
            }
        }
    } else {

        // Display the square's value
        btn.innerHTML = "<b>" + count + "</b>";
        btn.disabled = true;
    }
}