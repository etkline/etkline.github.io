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
        if (sEvent == 1 && !putFlags && document.getElementById(id).innerHTML == "") {

            // generate mines after first selection (for fairness)
            if (!started) {
                var pos = id.split(",");
                var rPos = parseInt(pos[0]);
                var cPos = parseInt(pos[1]);

                // Generates mines
                while (minePos.length < mines) {
                    var prng = new Math.seedrandom();
                    var row = Math.floor(prng() * numRows);
                    var col = Math.floor(prng() * numCols);

                    var mineId = row + "," + col;
                    if (!minePos.includes(mineId) && ((numRows * numCols - mines < 9 && id != mineId)
                        || Math.abs(rPos - row) > 1 || Math.abs(cPos - col) > 1)) {
                        minePos.push(mineId);
                    }
                }
                remSpaces -= mines;

                started = true;
                startTime = new Date();
            }

            // If square holds a mine...
            if (minePos.includes(id)) {
                started = false;
                disableBoard();
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
                remSpaces--;
                displayValue(id);
            }
        } else if (sEvent == 3 || putFlags) {
            var btn = document.getElementById(id);

            // UTF-16 equivalent for 🚩
            if (btn.innerHTML == "\uD83D\uDEA9") {
                btn.innerHTML = "";
                flagCount++;

                document.getElementById("flgRem").innerHTML = flagCount;
            } else if (flagCount > 0 && btn.innerHTML == "") {
                btn.innerHTML = "&#128681;";
                flagCount--;

                document.getElementById("flgRem").innerHTML = flagCount;
            }
        }
    }
}

var colors = ["white", "forestgreen", "blue", "#ff8000", "saddlebrown ", "red", "deeppink", "purple", "black"];
// Computes the square's values from the adjacent spaces
// each adjacent mine increments the square's value
function displayValue(id) {

    // Reformat button to display text
    var btn = document.getElementById(id);
    btn.classList.remove("img");
    btn.classList.add("txt");

    // UTF-16 equivalent for 🚩
    // Clears flags from board (prevents bug with flag count)
    if (btn.innerHTML == "\uD83D\uDEA9") {
        flagCount++;

        document.getElementById("flgRem").innerHTML = flagCount;
    }

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
                remSpaces--;
                displayValue(pos);
            }
        }
    } else {

        // Display the square's value
        btn.innerHTML = "<b>" + count + "</b>";
        btn.style.color = colors[count];
        btn.disabled = true;
    }

    if (remSpaces == 0) {
        disableBoard();
        enterTime();
    }
}

function disableBoard() {
    started = false;
    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            document.getElementById(row + "," + col).disabled = true;
        }
    }
}