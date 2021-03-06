let firstGame = true;
let p1CardPosition = document.getElementById('p1Position');
let dealerCardPosition = document.getElementById('dealerPosition');
let container = document.getElementsByClassName('container');
let startButton = document.getElementsByTagName('button')[0];
let hitButton = document.createElement('button');
let holdButton = document.createElement('button');
let yourDisplayedTotal = document.getElementById('yourTotalVal')
let dealerDisplayedTotal = document.getElementById('dealerTotalVal')
let overlay = document.getElementsByClassName('overlay');
let gameFinishedText = document.getElementById('textBox');
let dealerSoft =document.getElementById('dealerSoft');
let playerSoft =document.getElementById('playerSoft');

let shuffledDeck, 
p1TotalSoFar,
dealerTotalSoFar, 
dealersAces, 
playersAces, 
p1Finished,
dealerFinished,
playerX,
playerY,
dealerX,
dealerY,
dealerShowSoft,
playerShowSoft,
initialTwoCards,
clnStartButton;
gameReset();

function btnControl(switched){
  holdButton.disabled=switched;
  hitButton.disabled=switched;
}

function gameReset(){
  setTimeout(()=>{
    playerShowSoft = dealerShowSoft = false;
    playerSoft.style.visibility = "hidden";
    dealerSoft.style.visibility = "hidden";
    overlay[0].style.visibility= 'hidden';
    p1CardPosition.innerHTML = '';
    dealerCardPosition.innerHTML = '';
    yourDisplayedTotal.textContent = '0';
    dealerDisplayedTotal.textContent = '0';
  },firstGame?0:1500)
  shuffledDeck = shuffle(newDeck())
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
  
  initialTwoCards = true;
  playerX = dealerX = -875;
  playerY = 329;
  dealerY = 73;
  dealersAces = [];
  playersAces = [];
  p1Finished = dealerFinished = false;
  p1TotalSoFar = dealerTotalSoFar = 0;
  dealToP1();
  setTimeout(()=>{
    dealToDealer();
    setTimeout(()=>{
      dealToP1()
      setTimeout(()=>{
        dealToDealer("facedown");
        setTimeout(()=>{
          container[0].appendChild(holdButton).textContent = "Stick"
          container[0].appendChild(hitButton).textContent = "Hit"
          
        },2000)
      },1500)
    },1500)
  },1500)
  clnStartButton = startButton.cloneNode(true);
  startButton.parentNode.removeChild(startButton)
}
function turnDealersSecondCard(){
  dealerCardPosition.childNodes[1].classList.remove('facedown');
  initialTwoCards =false;
  dealerSoft.style.visibility = dealerShowSoft ? "visible": "hidden";
  dealerDisplayedTotal.textContent = dealerTotalSoFar;
}

holdButton.addEventListener("click", ()=>{
  p1Finished = true;
  btnControl(true);
  setTimeout(()=>{
    turnDealersSecondCard();
    continueDealersMove();  
  },800)
})

hitButton.addEventListener("click", ()=>{
  btnControl(true)
  dealToP1();
})

let dealToP1 = ()=>{
  animateDeal(false);
  let card = produceCard(playersAces);
  p1CardPosition.appendChild(card.card)
  p1TotalSoFar += Number(card.value);
  if(p1TotalSoFar>21){
    p1TotalSoFar=checkLose(playersAces,p1TotalSoFar);
  }
}

let dealToDealer = (cardStatus)=>{
  animateDeal(true);
  let card = produceCard(dealersAces);
  if (cardStatus){
    card.card.classList.add(cardStatus)
  }
  setTimeout(()=>{
    dealerCardPosition.appendChild(card.card);
  },2000)
  setTimeout(()=>{
    dealerTotalSoFar += Number(card.value);
    if(dealerTotalSoFar>21){
      dealerTotalSoFar = checkLose(dealersAces,dealerTotalSoFar);
    }

  },1500)
}

let produceCard = (whichPlayer)=>{
  let card = document.createElement('div')
  card.classList.add("card");
  let currentCard = shuffledDeck.shift();
  let cardFace = currentCard.match(/\[(.+)\]/)[1];
  card.textContent = cardFace;
  if(cardFace.indexOf('\u2660') + cardFace.indexOf('\u2663') ===-2){
    card.classList.add("red")
  }
  let value = Number(currentCard.match(/\](\d+)/)[1]);
  if(cardFace.indexOf('A')===0){
    whichPlayer.push('A')
    checkHardOrSoft()
  }
  return {card,value};
}

let checkHardOrSoft = ()=> {
  dealerShowSoft = dealersAces.length ? true : false;
  playerShowSoft = playersAces.length ? true : false;
}

let checkLose = (aces,total)=>{
  if(aces.length){
    aces.pop()
    total -= 10;
  }
  checkHardOrSoft()
  if(total>21){
    setTimeout(()=>{
      winSequence()    
    },3000)
  }
  return total;

}

let continueDealersMove = ()=>{
  setTimeout(()=>{
    if(dealerTotalSoFar < 17){
      dealToDealer()
      continueDealersMove();
    }else if(dealerTotalSoFar <=21){
      dealerFinished = true;
      if(p1Finished){
        setTimeout(()=>{
          winSequence()
        })
      }
    }
    
  },1500)
}

let winSequence = ()=>{
  var gameOverText;
  btnControl(true);
  switch(true){
    case dealerTotalSoFar > 21:
      gameOverText ='You won, dealer went bust';
    break;
    case p1TotalSoFar > 21:
      gameOverText='You lost, you went bust';
    break;
    case p1TotalSoFar < dealerTotalSoFar:
      gameOverText = 'You lost';
    break;
    case p1TotalSoFar > dealerTotalSoFar:
      gameOverText = 'You won';
    break;
    case p1TotalSoFar === dealerTotalSoFar:
      gameOverText = 'That was a draw'
  }
  setTimeout(()=>{
    gameResult(gameOverText);

  },1000)
}

let gameResult = (result)=>{
  overlay[0].style.visibility = 'visible';
  gameFinishedText.textContent = result;
  firstGame = false;
  gameReset();

}



