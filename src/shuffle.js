const shuffle = deck => {
  let backend = deck.splice(~~(deck.length/2))
  let splitDeck = backend.concat(deck)
  let shuffledDeck = [];
  while (splitDeck.length){
    shuffledDeck.push(splitDeck.splice(Math.random()*splitDeck.length,1)[0])
  }
  // return shuffledDeck
  return ['[A♥]11','[A♥]11','[A♥]11','[5♥]5','[7♥]7','[10♥]10','[A♥]11','[4♥]4','[A♥]11','[A♥]11'] //test
}
