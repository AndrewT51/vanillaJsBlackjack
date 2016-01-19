'use strict';

document.addEventListener("DOMContentLoaded", ()=>{
  let p1CardPosition = document.getElementById('p1Position');
  let dealerCardPosition = document.getElementById('dealerPosition');
  let container = document.getElementsByClassName('container');
  let startButton = document.getElementsByTagName('button');
  let hitButton = document.createElement('button');
  let holdButton = document.createElement('button');
  let handTotal = document.getElementById('running-score')
  let shuffledDeck = shuffle(newDeck())
  let p1TotalSoFar = 0;
  let dealerTotalSoFar = 0;
  let dealersAces = [];
  let playersAces = [];
  let p1Finished = false;
  let dealerFinished = false;


  startButton[0].addEventListener("click", ()=>{
    dealToP1();
    setTimeout(()=>{
      dealToDealer();
       setTimeout(()=>{
        dealToP1();
        container[0].appendChild(holdButton).innerText = "Hold"
        container[0].appendChild(hitButton).innerText = "Hit"
      },1500)
    },1500)
    startButton[0].parentNode.removeChild(startButton[0])
  })

  holdButton.addEventListener("click", ()=>{
    p1Finished = true;
    if(dealerFinished){
      winSequence();
    }
    while(!dealerFinished){
      dealersMove();
    }
  })

  hitButton.addEventListener("click", ()=>{
    dealToP1();
    setTimeout(()=>{
      dealersMove(); 
    },1500)
  })

  let dealToP1 = ()=>{
    let card = produceCard(playersAces);
    p1CardPosition.appendChild(card.card)
    p1TotalSoFar += card.value;
    if(p1TotalSoFar>21){
      p1TotalSoFar=checkLose(playersAces,p1TotalSoFar);
    }
  }

  let dealToDealer = ()=>{
    let card = produceCard(dealersAces);
    dealerCardPosition.appendChild(card.card)
    dealerTotalSoFar += card.value;
    if(dealerTotalSoFar>21){
      dealerTotalSoFar = checkLose(dealersAces,dealerTotalSoFar);
    }
  }

  let produceCard = (whichPlayer)=>{
    let card = document.createElement('div')
    card.classList.add("card");
    let currentCard = shuffledDeck.shift();
    let cardFace = currentCard.match(/\[(.+)\]/)[1];
    card.innerText = cardFace;
    if(cardFace.indexOf('\u2660') + cardFace.indexOf('\u2663') ===-2){
      card.classList.add("red")
    }
    let value = Number(currentCard.match(/\](\d+)/)[1]);
    if(cardFace.indexOf('A')===0){
      whichPlayer.push('A')
    }
    return {card,value};
  }

  let checkLose = (aces,total)=>{
    while(aces.length){
        aces.pop()
        total -= 10;
      }
      if(total>21){
        winSequence()
      }
      return total;
  }

  let dealersMove = ()=>{
    if(dealerTotalSoFar < 17){
      dealToDealer()
    }else{
      dealerFinished = true;
      if(p1Finished){
        winSequence()
      }
    }
  }

  let winSequence = ()=>{
    switch(true){
      case dealerTotalSoFar > 21:
        console.log('You won, dealer went bust');
        break;
      case p1TotalSoFar > 21:
        console.log('You lost, you went bust')
        break;
      case p1TotalSoFar <= dealerTotalSoFar:
        console.log('You lost');
        break;
      case p1TotalSoFar > dealerTotalSoFar:
        console.log('You won')



    }
    // case
    // let winOrLose = p1TotalSoFar < dealerTotalSoFar ? 'You lost! Better luck next time' : 'You won!';
    // console.log('The other way '+ winOrLose)

  }

  // while (!dealerFinished && !p1Finished){

  // }


});


