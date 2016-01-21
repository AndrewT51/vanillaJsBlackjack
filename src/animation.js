// document.addEventListener("DOMContentLoaded", ()=>{

function animateDeal(){
  // var moveX = -900;
  // var moveY = 350;
  var holder = document.getElementsByClassName('cardStart')[0];
  var button = document.getElementsByTagName('button')[0];
  // button.addEventListener('click',activate)
  activate()
  
  function activate(){
    deal(moveX,moveY) 
    moveX+=51
  }
  


  function deal(moveX,moveY){
    var cardToDeal = document.getElementsByClassName('animCard')[0]
    var temp = document.createElement('div');
    temp.classList.add('card');
    temp.classList.add('animCard');
    temp.classList.add('facedown');
    holder.insertBefore(temp,holder.firstChild);


    setTimeout(function(){
      
      setTimeout(function(){
        cardToDeal.style.webkitTransform = "rotate(-45deg) translateX("+moveX+"%) translateY("+moveY+"%)"
        // cardToDeal.classList.remove('cardToDeal')
       // cardToDeal.style.webkitTransform = "rotate(-45deg) translateX(-900%) translateY(80%)"
        setTimeout(function(){
          cardToDeal.style.display = "none";

        },1300)
        
      },700)
      cardToDeal.style.webkitTransform = "rotate(90deg) translateX(80%)"
      // cardToDeal.style.webkitTransform = "translateY(300%)"

    },300)
  }
}
// });