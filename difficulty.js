var diffs = [[9, 9, 10], [16, 16, 40], [16, 30, 99]];
var rowCount = 16;
var colCount = 30;
var mineCount = 99;

var diffIndex = 2;
var custom = false;

function difficulty(index, id) {
    rowCount = diffs[index][0];
    colCount = diffs[index][1];
    mineCount = diffs[index][2];

    diffIndex = index;

    document.getElementById(id).checked = true;
    document.getElementById("row").style.display = "none";
    document.getElementById("col").style.display = "none";
    document.getElementById("mine").style.display = "none";

    custom = false;
}

function customDiff() {

    document.getElementById("c").checked = true;
    document.getElementById("row").style.display = "block";
    document.getElementById("col").style.display = "block";
    document.getElementById("mine").style.display = "block";

    custom = true;
}

