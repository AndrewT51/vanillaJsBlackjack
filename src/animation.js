function animateDeal(dealer){
  var holder = document.getElementsByClassName('cardStart')[0];
  var button = document.getElementsByTagName('button')[0];
  let coordsX = dealer ? dealerX+=51 : playerX+=51;
  let coordsY = dealer ? dealerY : playerY;
  deal()
  

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
        cardToDeal.style.mozTransform = "rotate(-45deg) translateX("+coordsX+"%) translateY("+coordsY+"%)"
        cardToDeal.style.oTransform = "rotate(-45deg) translateX("+coordsX+"%) translateY("+coordsY+"%)"
        cardToDeal.style.msTransform = "rotate(-45deg) translateX("+coordsX+"%) translateY("+coordsY+"%)"
        cardToDeal.style.transform = "rotate(-45deg) translateX("+coordsX+"%) translateY("+coordsY+"%)"
        setTimeout(function(){
          if(dealer){
            dealerCardPosition.lastChild.style.visibility = "visible";
            dealerDisplayedTotal.textContent = initialTwoCards ? '?' : dealerTotalSoFar;
          }else{
            p1CardPosition.lastChild.style.visibility = "visible"; 
            yourDisplayedTotal.textContent= p1TotalSoFar
          }
          holder.removeChild(cardToDeal)
        },1000)  
      },700)
      cardToDeal.style.webkitTransform = "rotate(90deg) translateX(80%)"
      cardToDeal.style.mozTransform = "rotate(90deg) translateX(80%)"
      cardToDeal.style.oTransform = "rotate(90deg) translateX(80%)"
      cardToDeal.style.msTransform = "rotate(90deg) translateX(80%)"
      cardToDeal.style.transform = "rotate(90deg) translateX(80%)"
    },300)
  }
}
