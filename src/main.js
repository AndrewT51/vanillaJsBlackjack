let firstGame = true;
let p1CardPosition = document.getElementById('p1Position');
let dealerCardPosition = document.getElementById('dealerPosition');
let container = document.getElementsByClassName('container');
let startButton = document.getElementsByTagName('button')[0];
let clnStartButton;
let hitButton = document.createElement('button');
let holdButton = document.createElement('button');
let yourDisplayedTotal = document.getElementById('yourTotalVal')
let dealerDisplayedTotal = document.getElementById('dealerTotalVal')
let overlay = document.getElementsByClassName('overlay');
let gameFinishedText = document.getElementById('textBox');
let shuffledDeck, p1TotalSoFar,dealerTotalSoFar, dealersAces, playersAces, p1Finished,dealerFinished;
gameReset();

function btnControl(switched){
  holdButton.disabled=switched;
  hitButton.disabled=switched;
}

function gameReset(){
  setTimeout(()=>{
    overlay[0].style.zIndex = '-1';
    p1CardPosition.innerHTML = '';
    dealerCardPosition.innerHTML = '';
    yourDisplayedTotal.textContent = '0';
    dealerDisplayedTotal.textContent = '0';
  },1500)
  shuffledDeck = shuffle(newDeck())
  dealersAces = [];
  playersAces = [];
  p1Finished = false;
  dealerFinished = false;
  btnControl(false);
  if(!firstGame){
    startButton = clnStartButton;
    container[0].removeChild(container[0].children[1])
    container[0].removeChild(container[0].children[1])
    container[0].appendChild(startButton)
  }
  startButton.addEventListener("click", begin)

}

function begin(){
  p1TotalSoFar = 0;
  dealerTotalSoFar = 0;
  dealToP1();
  setTimeout(()=>{
    dealToDealer();
     setTimeout(()=>{
      dealToP1()
      setTimeout(()=>{
        dealToDealer("facedown");
        container[0].appendChild(holdButton).innerText = "Stick"
        container[0].appendChild(hitButton).innerText = "Hit"
    },1500)
    },1500)
  },1500)
  clnStartButton = startButton.cloneNode(true);
  startButton.parentNode.removeChild(startButton)
}
function turnDealersSecondCard(){
  dealerCardPosition.childNodes[1].classList.remove('facedown');
  dealerDisplayedTotal.textContent = dealerTotalSoFar;
}

holdButton.addEventListener("click", ()=>{
  p1Finished = true;
  btnControl(true);
    if(dealerFinished){
      winSequence();
    }else{
      setTimeout(()=>{
        continueDealersMove(); 
        turnDealersSecondCard();
      },1000)
    }
})

hitButton.addEventListener("click", ()=>{
  dealToP1();
})

let dealToP1 = ()=>{
  let card = produceCard(playersAces);
  p1CardPosition.appendChild(card.card)
  p1TotalSoFar += Number(card.value);
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
  dealerTotalSoFar += Number(card.value);

  dealerDisplayedTotal.textContent = p1Finished ? dealerTotalSoFar : '?';
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
  var gameOverText;
  btnControl(true);
  turnDealersSecondCard();
  switch(true){
    case dealerTotalSoFar > 21:
      console.log('You won, dealer went bust');
      gameOverText ='You won, dealer went bust';
      break;
    case p1TotalSoFar > 21:
      console.log('You lost, you went bust')
      gameOverText='You lost, you went bust';
      break;
    case p1TotalSoFar <= dealerTotalSoFar:
      console.log('You lost');
      gameOverText = 'You lost';
      break;
    case p1TotalSoFar > dealerTotalSoFar:
      console.log('You won');
      gameOverText = 'You won';
      break;
  }
  console.log('gameOverText', gameOverText)
  gameResult(gameOverText);

}

let gameResult = (result)=>{
  overlay[0].style.zIndex = '1';
  gameFinishedText.textContent = result;
  firstGame = false;
  gameReset();

}



