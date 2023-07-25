var len=document.querySelectorAll(".drum").length;

for(var i=0;i<len;i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function(){
       
        this.style.color="green";

    }); 
}




// var audio=new Audio("sounds/tom-1.mp3");
        // audio.play();