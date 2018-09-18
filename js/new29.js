var Timer;
var width;
var height;
var x ;
var y;
var L; // длительность прорисовки
var k = 0;
//Включение инвертора
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
    //Проверка ввода на текст и допустимые значения
    if(isNaN(a.value) || a.value === '' || a.value > 1 || a.value < 0) {
        alert('Поле X не подходящее значение');
        a.style.background = 'red';
        a.value = '';
        b.value = '';
        return false
    }
    document.getElementById("OnInvert").disabled=true;
    document.getElementById("OffInvert").disabled=false;
    document.getElementById("Calc").disabled=false;
    document.getElementById("Gen").disabled=false;
}
//Выключение инвертора и очистка всех полей, таблиц и таймеров
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
    clearTimeout(T);
    Timer=null;
    clearOscilloscopeScreen()
    var table = document.getElementById("TruthTable");
    for(var i=1;i<=2;i++)
    {
        table.rows[i].cells[1].innerHTML="";
    }
}
//Таблица истинности
function Calculate()
{
    var table = document.getElementById("TruthTable");
    for(var i=1;i<=2;i++)
    {
        table.rows[i].cells[1].innerHTML = i % 2;
    }
    document.getElementById("Calc").disabled=true;
}
//Генератор последовательных прямоугольных импульсов
function Generator() {
    var a = document.getElementById("tInput");
    var b = document.getElementById("qOutput");
    if(Timer==null){
        document.getElementById("Gen").textContent="Выключить генератор";
        L = 3600 / width;
        drawImpuls();
        clearOscilloscopeScreen();
        Timer = setTimeout(function ff() {
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

        clearOscilloscopeScreen();
    }
    else
    {
        document.getElementById("Gen").textContent="Включить генератор";
        clearTimeout(Timer);
        clearTimeout(T);
        Timer=null;
        a.value="";
        b.value="";
        a.style.background = defaultStatus;
        b.style.background = defaultStatus;
        clearOscilloscopeScreen();
    }
}
//Создание сетки на осях координат
function drawExes() {
    var canvas = document.getElementById("oscilloscopeScreen");
    var context = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
    // рисуем вертикальные линии (13)
    x = 0;
    for (var i = 1; i <= 13; i++) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.lineWidth = 1;
        context.strokeStyle = "white";
        context.stroke();
        x += 30;
    }
    // рисуем горизонтальные линии (6)
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
}
//Рисование последовательных прямоугольных импульсов
function drawImpuls() {
    var canvas = document.getElementById("oscilloscopeScreen");
    var context = canvas.getContext("2d");
    if(x >= 0 && x <= 90)
    {
        y = 30;
    }

    else if (x > 90 && x <= 180)
    {
        y = 119;
    }

    else if(x >= 180 && x <= 270)
    {
        y = 30;
    }
    else if (x > 270 && x <= 360)
    {
        y = 119;
    }

    context.beginPath();
    context.moveTo(x, y);
    x = x + 1;

    if(x >= 0 && x <= 90)
    {
        y = 30;
    }

    else if (x > 90 && x <= 180)
    {
        y = 119;
    }

    else if(x >= 180 && x <= 270)
    {
        y = 30;
    }
    else if (x > 270 && x <= 360)
    {
        y = 119;
    }
    context.lineTo(x, y);
    context.lineWidth = 4;
    context.strokeStyle = "#ffffff";
    context.stroke();
    if(x == 360){
        clearOscilloscopeScreen();
    }
    T = setTimeout("drawImpuls()", L);
}
function clearOscilloscopeScreen() {
    var canvas = document.getElementById("oscilloscopeScreen");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    drawExes();
    x = 0;
    y = 0;
}


