'use strict';

document.addEventListener("DOMContentLoaded", ()=>{
  let cardPosition = document.getElementById('position');
  let dealButton = document.getElementsByTagName('button');
  let handTotal = document.getElementById('running-score')
  let card = document.createElement('div');
  card.className += "card";
  let shuffledDeck = shuffle(newDeck())
  let totalSoFar = 0;
  dealButton[0].addEventListener("click", ()=>{
    let currentCard = shuffledDeck.shift();
    cardPosition.appendChild(card)
    let cardFace = currentCard.match(/\[(.+)\]/)[1];
    card.innerText = cardFace;
    if(cardFace.indexOf('\u2660') + cardFace.indexOf('\u2663') ===-2){
      card.className += " red"
    }
    totalSoFar = totalSoFar + Number(currentCard.match(/\](\d+)/)[1])
    handTotal.innerText = totalSoFar;
   
    card = document.createElement('div')
    card.className += "card";
    console.log(card)

   
  })


});


