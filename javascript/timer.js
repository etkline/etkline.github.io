// timer vars
var startTime;
var started = false;
var numTicks = 0;

// count game time
function tick() {
    if (started) {
        numTicks = Math.floor((Date.now() - startTime.valueOf()) / 1000);
        document.getElementById('time').innerHTML = numTicks;
    }
    var t = setTimeout(tick, 500);
}