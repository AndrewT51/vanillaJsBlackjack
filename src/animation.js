function animateDeal(dealer){
  var holder = document.getElementsByClassName('cardStart')[0];
  var button = document.getElementsByTagName('button')[0];
  let coordsX = dealer ? dealerX+=51 : playerX+=51;
  let coordsY = dealer ? dealerY : playerY;
  activate()
  
  function activate(){
    // deal(coordsX,coordsY) 
    deal()
  }

  function deal(){
    console.log(dealer)
    var cardToDeal = document.getElementsByClassName('animCard')[0]
    var temp = document.createElement('div');
    temp.classList.add('card');
    temp.classList.add('animCard');
    temp.classList.add('facedown');
    holder.insertBefore(temp,holder.firstChild);
    setTimeout(function(){
      setTimeout(function(){
        cardToDeal.style.webkitTransform = "rotate(-45deg) translateX("+coordsX+"%) translateY("+coordsY+"%)"
        setTimeout(function(){
          if(dealer){
            dealerCardPosition.lastChild.style.visibility = "visible";
          }else{
            p1CardPosition.lastChild.style.visibility = "visible"; 
          }
          // cardToDeal.style.display = "none";
          cardStart.removeChild(cardStart.firstChild)
        },1300)  
      },700)
      cardToDeal.style.webkitTransform = "rotate(90deg) translateX(80%)"
    },300)
  }
}
