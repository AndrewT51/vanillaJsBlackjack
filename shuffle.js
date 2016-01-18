'use strict';

const shuffle = deck => {
  let backend = deck.splice(~~(deck.length/2))
  let splitDeck = backend.concat(deck)
  let shuffledDeck = [];
  while (splitDeck.length){
    shuffledDeck.push(splitDeck.splice(Math.random()*splitDeck.length,1)[0])
  }
  return shuffledDeck
}
