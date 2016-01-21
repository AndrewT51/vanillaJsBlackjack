function animateDeal(dealer){
  var holder = document.getElementsByClassName('cardStart')[0];
  var button = document.getElementsByTagName('button')[0];
  let coordsX = dealer ? dealerX+=51 : playerX+=51;
  let coordsY = dealer ? dealerY : playerY;
  activate()
  
  function activate(){
    deal(coordsX,coordsY) 
  }

  function deal(moveX,moveY){
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
          holder.removeChild(cardToDeal)

          finalCheck()
          // yourDisplayedTotal.textContent = p1TotalSoFar;
          // dealerDisplayedTotal.textContent = p1Finished ? dealerTotalSoFar : '?';
          // if(dealerTotalSoFar>21){
          //   // dealerDisplayedTotal.textContent = p1TotalSoFar;
          //   dealerTotalSoFar = checkLose(dealersAces,dealerTotalSoFar);
          //   dealerDisplayedTotal.textContent = dealerTotalSoFar;
          // }
          // if(p1TotalSoFar>21){
          //   // yourDisplayedTotal.textContent = p1TotalSoFar;
          //   p1TotalSoFar=checkLose(playersAces,p1TotalSoFar);
          //   yourDisplayedTotal.textContent = p1TotalSoFar;
          // }
        },1300)  
      },700)
      cardToDeal.style.webkitTransform = "rotate(90deg) translateX(80%)"
    },300)
  }
}

function finalCheck(){
   yourDisplayedTotal.textContent = p1TotalSoFar;
          dealerDisplayedTotal.textContent = p1Finished ? dealerTotalSoFar : '?';
          if(dealerTotalSoFar>21){
            // dealerDisplayedTotal.textContent = p1TotalSoFar;
            dealerTotalSoFar = checkLose(dealersAces,dealerTotalSoFar);
            dealerDisplayedTotal.textContent = dealerTotalSoFar;
          }
          if(p1TotalSoFar>21){
            // yourDisplayedTotal.textContent = p1TotalSoFar;
            p1TotalSoFar=checkLose(playersAces,p1TotalSoFar);
            yourDisplayedTotal.textContent = p1TotalSoFar;
          }

}
