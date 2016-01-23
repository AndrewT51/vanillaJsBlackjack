function animateDeal(dealer){
  let vendors =['webkitTransform','mozTransform','oTransform','msTransform','transform'];
  var holder = document.getElementsByClassName('cardStart')[0];
  var button = document.getElementsByTagName('button')[0];
  let coordsX = dealer ? dealerX+=51 : playerX+=51;
  let coordsY = dealer ? dealerY : playerY;
  deal()
  

  function deal(){
    var cardToDeal = document.getElementsByClassName('animCard')[0]
    var temp = document.createElement('div');
    temp.classList.add('card');
    temp.classList.add('animCard');
    temp.classList.add('facedown');
    holder.insertBefore(temp,holder.firstChild);
    setTimeout(function(){
      setTimeout(function(){
        vendors.forEach(vendor=> cardToDeal.style[vendor]= "rotate(-45deg) translateX("+coordsX+"%) translateY("+coordsY+"%)")
        setTimeout(function(){
          if(dealer){
            dealerCardPosition.lastChild.style.visibility = "visible";
            dealerSoft.style.visibility = dealerShowSoft ? (initialTwoCards?"hidden": "visible") : "hidden";
            dealerDisplayedTotal.textContent = initialTwoCards ? '?' : dealerTotalSoFar;
          }else{
            p1CardPosition.lastChild.style.visibility = "visible";
            playerSoft.style.visibility = playerShowSoft ? "visible" : "hidden";
            yourDisplayedTotal.textContent= p1TotalSoFar;
            if(p1TotalSoFar<=21) btnControl(false)
          }
          holder.removeChild(cardToDeal)
        },1000)  
      },700)
      for (let i = 0; i< vendors.length;i++){
        vendors.forEach(vendor=> cardToDeal.style[vendor]= "rotate(90deg) translateX(80%)")
        }
    },300)
  }
}
