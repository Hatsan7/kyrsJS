var TimerID;
function TurnOnInvert()
{
    var val =Math.random();
    if(val>=0.5)
        Setter(null,1);
    else
        Setter(1,null);
    document.getElementById("OnInvert").disabled=true;
    document.getElementById("OffInvert").disabled=false;
    document.getElementById("Calc").disabled=false;
    document.getElementById("Gen").disabled=false;
    console.log(TurnOnInvert);
}
function TurnOffInvert()
{
    Setter(null,null);
    document.getElementById("OnInvert").disabled=false;
    document.getElementById("OffInvert").disabled=true;
    document.getElementById("Calc").disabled=true;
    document.getElementById("Gen").disabled=true;
    var table = document.getElementById("TruthTable");
    for(var i=1;i<9;i++)
    {

        table.rows[i].cells[2].innerHTML="";
    }
console.log(TurnOffInvert);
}
// $('#name').allowInt();
// function validInp()
// {
//     console.log(this);
// }
function Setter(Xval,Yval) {
    var X = document.getElementById("tInput");
    var Y = document.getElementById("qOutput");
    if (Xval == null)
    {
        Y.value=null;
        X.value=null;
    }
    else

    {
        Y.value=Yval*1;
        X.value=Xval;
    }


    console.log(Setter);
}

function Logic(T,Q)
{

    X=Boolean(X);
    Y=Boolean(Y);
    console.log(T,Q);
    return !((X|!Y)&(Y|!X));
}

function Generator()
{
    var T = document.getElementById("tInput");
    if(TimerID==null)
    {
        document.getElementById("Gen").textContent="Выключить генератор";

        T.value=0;
        TimerID = setTimeout(function ff(){
            if(T.value==0)
            {
                console.log(document.getElementById("tInput").value);
                var res = Logic(1,document.getElementById("qOutput").value);
                Setter(res,1);
            }
            else
            {
                console.log(document.getElementById("tInput").value);
                var res = Logic(0,document.getElementById("qOutput").value);
                Setter(res,0*1);
            }
            TimerID = setTimeout(ff,1000)
        },1000);
    }
    else
    {

        document.getElementById("Gen").textContent="Включить генератор";

        clearTimeout(TimerID);
        TimerID=null;
        T.value="";

    }
}
function Calculate()
{
    var table = document.getElementById("TruthTable");
    for(var i=1;i<5;i++)
    {

        table.rows[i].cells[2].innerHTML=table.rows[i].cells[1].innerHTML;
    }
    for(var i=5;i<9;i++)
    {
        table.rows[i].cells[2].innerHTML=Logic(table.rows[i].cells[0].innerHTML.charAt(4)*1,table.rows[i].cells[1].innerHTML*1)*1;
    }

}