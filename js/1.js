var Timer;
var width;
var height;
var x;
var y;
var T; // период развертки
var L; // длительность прорисовки
var x1 = 0; // нижняя граница
var x2 = 50; // верхняя граница
var k = 0;

function TurnOnInvert()
{
    var a = document.getElementById("tInput");
    var b = document.getElementById("qOutput");
    if (a.value == 1){
        b.value = 0;
        a.style.background = defaultStatus;
    }
    else
    if (a.value == 0)
    {
        b.value = 1;
        a.style.background = defaultStatus;
    }
    if(isNaN(a.value) || a.value === '' || a.value > 1 || a.value < 0) {
        alert('Поле А не подходящее значение');
        a.style.background = 'red';
        a.value = '';
        b.value = '';
        return false
    } else
    if(isNaN(b.value) || b.value === '') {
        alert('Поле В не подходящее значение');
        b.value = '';
        a.value = '';
        a.style.background = defaultStatus;
        b.style.background = 'red';
        return false
    }
    document.getElementById("OnInvert").disabled=true;
    document.getElementById("OffInvert").disabled=false;
    document.getElementById("Calc").disabled=false;
    document.getElementById("Gen").disabled=false;


    console.log(TurnOnInvert);
}
function TurnOffInvert()
{

    document.getElementById("OnInvert").disabled=false;
    document.getElementById("OffInvert").disabled=true;
    document.getElementById("Calc").disabled=true;
    document.getElementById("Gen").disabled=true;
    var a = document.getElementById("tInput");
    var b = document.getElementById("qOutput");
    a.value = '';
    b.value = '';
    clearTimeout(Timer);
    Timer=null;
    clearOscilloscopeScreen();
    var table = document.getElementById("TruthTable");
    for(var i=1;i<=2;i++)
    {

        table.rows[i].cells[1].innerHTML="";
    }
    console.log(TurnOffInvert);
}
function Calculate()
{
    var table = document.getElementById("TruthTable");
    for(var i=1;i<=2;i++)
    {

        table.rows[i].cells[1].innerHTML = i % 2;
    }
    console.log(TurnOnInvert);
}

function Generator() {

    var a = document.getElementById("tInput");
    var b = document.getElementById("qOutput");

    if(Timer==null){
        document.getElementById("Gen").textContent="Выключить генератор";

        Timer = setTimeout(function ff() {
            T = width / 6;
            L = 6000 / width;
            drawVariant13();
            if (a.value ==0)
                a.value =1;
            else
                a.value =0;

            if (a.value == 1)
            {
                b.value = 0;


            }
            else
            {
                b.value = 1

            }

            Timer = setTimeout(ff, 1000)
        },1000);


    }
    else
    {
        document.getElementById("Gen").textContent="Включить генератор";
        clearTimeout(Timer);
        Timer=null;
        a.value="";
        b.value="";
        clearOscilloscopeScreen();
    }
}
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
