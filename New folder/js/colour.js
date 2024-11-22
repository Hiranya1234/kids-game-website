
var isDone = ['false', 'false', 'false', 'false' , 'false'];
$( document ).ready(function() {

    setTimeout(function (){
    document.getElementById('loadGame').style.display = 'none';
    document.getElementById('Game').style.display = 'block';
    document.getElementById('showRole').style.display = 'block';
    document.getElementById('HideDiv').style.display = 'block';
    
})
});

function drag1(event){
    event.preventDefault();
}
function drag2(event){
    event.preventDefault();
}
function drag3(event){
    event.preventDefault();
}
function drag4(event){
    event.preventDefault();
}
function drag5(event){
    event.preventDefault();
}

///////////////////////////////////////////////////////////
function dragStart1(event){
    event.dataTransfer.setData("choice1",event.target.id);
}
function dragStart2(event){
    event.dataTransfer.setData("choice2",event.target.id);
}
function dragStart3(event){
    event.dataTransfer.setData("choice3",event.target.id);
}
function dragStart4(event){
    event.dataTransfer.setData("choice4",event.target.id);
}
function dragStart5(event){
    event.dataTransfer.setData("choice5",event.target.id);
}
///////////////////////////////////////////////////////////
function drop1(event){
    var data = event.dataTransfer.getData("choice1");
    event.target.appendChild(document.getElementById(data));
    var elm = document.getElementById("target1").innerHTML ="RED";
    place1.innerHTML=elm;
    isFininsh();
}
function drop2(event){
    var data = event.dataTransfer.getData("choice2");
    event.target.appendChild(document.getElementById(data));
    var elm = document.getElementById("target2").innerHTML ="BLUE";
    place2.innerHTML=elm;
    isFininsh();
}
function drop3(event){
    var data = event.dataTransfer.getData("choice3");
    event.target.appendChild(document.getElementById(data));
    var elm = document.getElementById("target3").innerHTML ="GREEN";
    place3.innerHTML=elm;
    isFininsh();
}
function drop4(event){
    var data = event.dataTransfer.getData("choice4");
    event.target.appendChild(document.getElementById(data));
    var elm = document.getElementById("target4").innerHTML ="YELLOW";
    place4.innerHTML=elm;
    isFininsh();
}
function drop5(event){
    var data = event.dataTransfer.getData("choice5");
    event.target.appendChild(document.getElementById(data));
    var elm = document.getElementById("target5").innerHTML ="ORANGE";
    place5.innerHTML=elm;
    isFininsh();
  
}
///////////////////////////////////////////////////////////
function allowDrop1(event){
    event.preventDefault();
}
function allowDrop2(event){
    event.preventDefault();
}
function allowDrop3(event){
    event.preventDefault();
}
function allowDrop4(event){
    event.preventDefault();
}
function allowDrop5(event){
   
    event.preventDefault();
}

function isFininsh()
{
    var isTrue = true;
    for (let i = 0; i < isDone.length; i++) {
        if (isDone[i] == 'false') {
            isDone[i] = 'true'
            break;
        }
    }

    for (let i = 0; i < isDone.length; i++) {
        if (isDone[i] == 'false') {
            isTrue = false;
            break;
        }
    }

    if(isTrue == true)
    {
        var audio = new Audio('audio/clapping.mp3');
        audio.play();
        document.getElementById('NextGame').style.display = 'block';
    }


}
function goBack() {
    window.history.back();
  }

