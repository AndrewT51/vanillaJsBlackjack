'use strict';

document.addEventListener("DOMContentLoaded", ()=>{
  let p1CardPosition = document.getElementById('p1Position');
  let dealerCardPosition = document.getElementById('dealerPosition');
  let container = document.getElementsByClassName('container');
  let startButton = document.getElementsByTagName('button');
  let hitButton = document.createElement('button');
  let holdButton = document.createElement('button');
  let yourDisplayedTotal = document.getElementById('yourTotal')
  let dealerDisplayedTotal = document.getElementById('dealerTotal')
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
        dealToP1()
        setTimeout(()=>{
          dealToDealer("facedown");
          container[0].appendChild(holdButton).innerText = "Hold"
          container[0].appendChild(hitButton).innerText = "Hit"
      },1500)
      },1500)
    },1500)
    startButton[0].parentNode.removeChild(startButton[0])
  })

  holdButton.addEventListener("click", ()=>{
    p1Finished = true;
    holdButton.disabled=true;
    hitButton.disabled=true;
      if(dealerFinished){
        winSequence();
      }else{
        setTimeout(()=>{
          continueDealersMove(); 
          dealerCardPosition.childNodes[1].classList.remove('facedown');
        },1000)
      }
  })

  hitButton.addEventListener("click", ()=>{
    dealToP1();
  })

  let dealToP1 = ()=>{
    let card = produceCard(playersAces);
    p1CardPosition.appendChild(card.card)
    p1TotalSoFar += card.value;
    yourDisplayedTotal.textContent = p1TotalSoFar;
    if(p1TotalSoFar>21){
      p1TotalSoFar=checkLose(playersAces,p1TotalSoFar);
      yourDisplayedTotal.textContent = p1TotalSoFar;
    }
  }

  let dealToDealer = (cardStatus)=>{
    let card = produceCard(dealersAces);
    if (cardStatus){
      card.card.classList.add(cardStatus)
    }
    dealerCardPosition.appendChild(card.card)
    dealerTotalSoFar += card.value;
    dealerDisplayedTotal.textContent = dealerTotalSoFar;
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
      }else{
        return total;
      }
  }

  let continueDealersMove = ()=>{
    // dealerCardPosition.childNodes[1].classList.remove('facedown');
    setTimeout(()=>{
      if(dealerTotalSoFar < 17){
        dealToDealer()
        continueDealersMove();
      }else{
        dealerFinished = true;
        if(p1Finished){
          winSequence()
        }
      }
    },1500)
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
        console.log('You won');
        break;
    }

  }
});


