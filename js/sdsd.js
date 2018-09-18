function drawExes() {
    var canvas = document.getElementById("oscilloscopeScreen");
    var context = canvas.getContext("2d");

    width = canvas.width;
    height = canvas.height;

    // рисуем вертикальные линии (11)
    x = 0;
    for (var i = 1; i <= 12; i++) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.lineWidth = 1;
        context.strokeStyle = "white";
        context.stroke();
        x += 30;
    }

    // рисуем горизонтальные линии (9)
    y = 0;
    for (var j = 1; j <= 6; j++) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.lineWidth = 1;
        context.strokeStyle = "white";
        context.stroke();
        y += 30;
    }
    console.log(drawExes)
}

/ U = 100 - 2 * x, 0 < x < 50
function drawVariant13() {
    var canvas = document.getElementById("oscilloscopeScreen");
    var context = canvas.getContext("2d");
    y = 20 + (100 - 2 * k);
    context.beginPath();
    context.moveTo(x, y);
    x += 1;
    k += 1;
    if (k >= x2) {
        k = x1;
    }
    y = 20 + (100 - 2 * k);
    context.lineTo(x, y);
    context.lineWidth = 4;
    context.strokeStyle = "white";
    context.stroke();
    if (x >= width) {
        clearOscilloscopeScreen();
    }
    Timer = setTimeout("drawVariant13()", L);
}
function clearOscilloscopeScreen() {
    var canvas = document.getElementById("oscilloscopeScreen");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    drawExes();
    x = 0;
    y = 0;
    k = 0;
}