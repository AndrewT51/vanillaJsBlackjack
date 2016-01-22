const shuffle = deck => {
  let backend = deck.splice(~~(deck.length/2))
  let splitDeck = backend.concat(deck)
  let shuffledDeck = [];
  while (splitDeck.length){
    shuffledDeck.push(splitDeck.splice(Math.random()*splitDeck.length,1)[0])
  }
  return shuffledDeck
  // return ['[A♥]11','[A♥]11','[A♥]11','[5♥]5','[7♥]7','[10♥]10','[A♥]11','[4♥]4','[A♥]11','[A♥]11'] //test
  // return ['[A♥]11','[A♥]11','[A♥]11','[5♥]5','[7♥]7','[A♥]11','[3♥]3','[4♥]4','[A♥]11','[A♥]11'] //test dealer wins and aces go soft
    // return ['[K♥]10','[K♥]10','[5♥]5','[K♥]10','[7♥]7','[A♥]11','[3♥]3','[4♥]4','[A♥]11','[A♥]11'] //test dealer wins on first two
}
