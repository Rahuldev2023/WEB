var randomnumber1= Math.floor(Math.random()*6)+1;//1-6
var randomimg1="dice"+randomnumber1+".png";//dice1-dice6.png
var randomsrc1="images/"+randomimg1;
var image1=document.querySelectorAll("img")[0].setAttribute("src",randomsrc1);



var randomnumber2= Math.floor(Math.random()*6)+1;//1-6
var randomimg2="dice"+randomnumber2+".png";//dice1-dice6.png
var randomsrc2="images/"+randomimg2;
var image2=document.querySelectorAll("img")[1].setAttribute("src",randomsrc2);

//if p1 wins
if(randomnumber1 > randomnumber2){
    document.querySelector("h1").innerHTML="🚩 Player 1 WINS";
}
//if p2 wins
else if(randomnumber2 > randomnumber1){
    document.querySelector("h1").innerHTML="Player 2 WINS🚩";
}
//if draw
else{
    document.querySelector("h1").innerHTML="😩 DRAW !";
}