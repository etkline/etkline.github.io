// Disables Right-Click
//window.oncontextmenu = function() {return false;}

// Firebase API Test
var request = new XMLHttpRequest();
request.open("GET", "https://us-central1-test-9d6bc.cloudfunctions.net/:helloWorld");
request.onload = function() {
    var data = JSON.parse(this.response);
    if (request.status == 200) {
        document.getElementById("apiTest").innerHTML = data.message;
    } else {
        document.getElementById("apiTest").innerHTML = "Error!";
    }
}
request.send();

// global static vars
var sEvent;
var sId;

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

function select(event, id) {
    sEvent = event.which;
    sId = id;
}

function confirm(id) {

    // if selection confirmed
    if (id == sId) {

        // if left-click
        if (sEvent == 1 && document.getElementById(id).innerHTML == "") {
            if (!started) {
                var pos = id.split(",");
                var rPos = parseInt(pos[0]);
                var cPos = parseInt(pos[1]);

                while (minePos.length < 99) {
                    var prng = new Math.seedrandom();
                    var row = Math.floor(prng() * numRows);
                    var col = Math.floor(prng() * numCols);

                    var mineId = row + "," + col;
                    if (Math.abs(rPos - row) > 1 || Math.abs(cPos - col) > 1) {
                        minePos.push(mineId);
                    }
                }
            }

            if (minePos.includes(id)) {
                for (var mineId of minePos) {
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

function displayValue(id) {
    var btn = document.getElementById(id);
    btn.classList.remove("img");
    btn.classList.add("txt");

    var pos = id.split(",");

    var row = parseInt(pos[0]);
    var col = parseInt(pos[1]);

    var adjPos = [];
    var count = 0;

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
    if (count == 0) {
        btn.innerHTML = " ";
        btn.disabled = true;

        for (var pos of adjPos) {
            var sqr = document.getElementById(pos);
            if (sqr.innerHTML == "" || sqr.innerHTML == "\uD83D\uDEA9") {
                displayValue(pos);
            }
        }
    } else {
        btn.innerHTML = "<b>" + count + "</b>";
        btn.disabled = true;
    }
}
