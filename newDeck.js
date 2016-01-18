'use strict';

const newDeck = ()=>{
  let suits = ['\u2665','\u2666','\u2660','\u2663'];
  let faceCards = ['K','Q','J','A']
  let deckArr = [];
  suits.forEach(suit =>{
    faceCards.forEach(faceCard=>{
      deckArr.push(`[${faceCard+suit}]${faceCard==='A'? 11 : 10}`);
    })
    for(let i=2; i<=10;i++){
      deckArr.push(`[${i+suit}]${i}`)
    }
  })
  return deckArr
}

