'use strict';
document.addEventListener("DOMContentLoaded", ()=>{
  let cardPosition = document.getElementById('position');
  let dealButton = document.getElementsByTagName('button');
  let handTotal = document.getElementById('running-score')
  let shuffledDeck = shuffle(newDeck())
  let totalSoFar = 0;
  dealButton[0].addEventListener("click", ()=>{
    let currentCard = shuffledDeck.shift();
    cardPosition.innerText = currentCard.match(/\[(.+)\]/)[1]
    totalSoFar = totalSoFar + Number(currentCard.match(/\](\d+)/)[1])
    handTotal.innerText = totalSoFar;
   
  })


});


