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
var mines = 99;
var numRows;
var numCols;

// board state vars
var flagCount = 99;
var putFlags = false;
var minePos = [];
var remSpaces = 0;

// Creates game board
function start(countR, countC) {

    numRows = countR;
    numCols = countC;
    remSpaces = numRows * numCols;

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
    flagCount = 99;

    document.getElementById("flgRem").innerHTML = flagCount;
    started = false;
    numTicks = 0;
    document.getElementById('time').innerHTML = numTicks;
}

function swapSelect() {
    putFlags = !putFlags;
    var flags = document.getElementById("flags");
    if (putFlags) {
        flags.style.backgroundColor = "#ddd";
        flags.style.color = "#000000";
    } else {
        flags.style.backgroundColor = "";
        flags.style.color = "";
    }
}