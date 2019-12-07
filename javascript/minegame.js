// global static variables
var isCustom = false;
var diffSetting = "hard";

var mines;
var numRows;
var numCols;

// board state vars
var flagCount;
var putFlags = false;
var minePos = [];
var remSpaces;

// Creates game board
function start() {
    started = false;

    isCustom = custom;
    diffSetting = endpoints[diffIndex];
    if (custom) {
        numRows = document.getElementById("rVal").value;
        numCols = document.getElementById("cVal").value;
        mines = Math.min(document.getElementById("mVal").value, (numRows * numCols - 1));
    } else {
        numRows = rowCount;
        numCols = colCount;
        if (numRows * numCols - mineCount < 9) {
            mines = 8;
        } else {
            mines = mineCount;
        }
    }
    remSpaces = numRows * numCols;
    flagCount = mines;
    numTicks = 0;

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

    document.getElementById("flgRem").innerHTML = flagCount;
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