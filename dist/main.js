'use strict';

document.addEventListener("DOMContentLoaded", function () {
  function animateDeal(dealer) {
    var vendors = ['webkitTransform', 'mozTransform', 'oTransform', 'msTransform', 'transform'];
    var holder = document.getElementsByClassName('cardStart')[0];
    var button = document.getElementsByTagName('button')[0];
    var coordsX = dealer ? dealerX += 51 : playerX += 51;
    var coordsY = dealer ? dealerY : playerY;
    deal();

    function deal() {
      var cardToDeal = document.getElementsByClassName('animCard')[0];
      var temp = document.createElement('div');
      temp.classList.add('card');
      temp.classList.add('animCard');
      temp.classList.add('facedown');
      holder.insertBefore(temp, holder.firstChild);
      setTimeout(function () {
        setTimeout(function () {
          vendors.forEach(function (vendor) {
            return cardToDeal.style[vendor] = "rotate(-45deg) translateX(" + coordsX + "%) translateY(" + coordsY + "%)";
          });
          setTimeout(function () {
            if (dealer) {
              dealerCardPosition.lastChild.style.visibility = "visible";
              dealerSoft.style.visibility = dealerShowSoft ? initialTwoCards ? "hidden" : "visible" : "hidden";
              dealerDisplayedTotal.textContent = initialTwoCards ? '?' : dealerTotalSoFar;
            } else {
              p1CardPosition.lastChild.style.visibility = "visible";
              playerSoft.style.visibility = playerShowSoft ? "visible" : "hidden";
              yourDisplayedTotal.textContent = p1TotalSoFar;
              if (p1TotalSoFar <= 21) btnControl(false);
            }
            holder.removeChild(cardToDeal);
          }, 1000);
        }, 700);
        for (var i = 0; i < vendors.length; i++) {
          vendors.forEach(function (vendor) {
            return cardToDeal.style[vendor] = "rotate(90deg) translateX(80%)";
          });
        }
      }, 300);
    }
  }

  'use strict';

  var curveText = function curveText(obj) {
    // destructured
    var _obj$text = obj.text;
    var text = _obj$text === undefined ? "curveText" : _obj$text;
    var _obj$textColor = obj.textColor;
    var textColor = _obj$textColor === undefined ? "black" : _obj$textColor;
    var _obj$fontSize = obj.fontSize;
    var fontSize = _obj$fontSize === undefined ? 2 : _obj$fontSize;
    var _obj$circleSize = obj.circleSize;
    var circleSize = _obj$circleSize === undefined ? "200" : _obj$circleSize;
    var _obj$curvature = obj.curvature;
    var curvature = _obj$curvature === undefined ? .3 : _obj$curvature;
    var under = obj.under;
    var _obj$backColor = obj.backColor;
    var backColor = _obj$backColor === undefined ? "transparent" : _obj$backColor;
    var lineSides = obj.lineSides;
    var lineOnTop = obj.lineOnTop;
    var lineOnBottom = obj.lineOnBottom;
    var lengthOfLines = obj.lengthOfLines;
    var _obj$lineColor = obj.lineColor;
    var lineColor = _obj$lineColor === undefined ? "black" : _obj$lineColor;

    var arrayWithSpaces = text.split('');
    var arrayOfLetters = arrayWithSpaces.map(function (letter) {
      return letter === ' ' ? " " : letter;
    });
    var centreLetter = arrayOfLetters.length / 2 - .5;
    var textContainer = document.createElement("div");
    curvature = curvature * (360 / arrayOfLetters.length);

    if (under) {
      arrayOfLetters.reverse();
    }

    var characterElements = arrayOfLetters.map(function (char, index) {
      var span = document.createElement('span');
      var innerSpan = document.createElement('span');
      innerSpan.innerText = char;
      innerSpan.style.borderBottom = lineOnBottom + "px solid " + (lineColor || 'black');
      innerSpan.style.borderTop = lineOnTop + "px solid " + (lineColor || 'black');
      innerSpan.style.paddingLeft = innerSpan.style.paddingRight = lengthOfLines + "px";
      innerSpan.style.backgroundColor = backColor;
      span.appendChild(innerSpan);
      innerSpan.setAttribute('char-id', index);

      // This code swaps the side the border appears on first/last characters to adjust
      // for whether the text is over or under the circle
      if (lineSides) {
        if (index === 0) {
          if (under) {
            innerSpan.style.borderRight = lineOnBottom + "px solid " + lineColor;
          } else {
            innerSpan.style.borderLeft = lineOnBottom + "px solid " + lineColor;
          }
        }
        if (index === arrayOfLetters.length - 1) {
          if (under) {
            innerSpan.style.borderLeft = lineOnBottom + "px solid " + lineColor;
          } else {
            innerSpan.style.borderRight = lineOnBottom + "px solid " + lineColor;
          }
        }
      }

      span.style.position = "absolute";
      under ? span.style.paddingTop = circleSize + "px" : span.style.paddingBottom = circleSize + "px";
      span.style.transformOrigin = under ? "top center" : "bottom center";
      span.style.fontFamily = "monospace";
      span.style.color = textColor;
      innerSpan.style.fontSize = fontSize + "em";
      span.style.transform = "rotate(" + (index * curvature - centreLetter * curvature) + "deg)";
      return span;
    });

    characterElements.forEach(function (element) {
      return textContainer.appendChild(element);
    });
    textContainer.setAttribute("id", "curvy");
    return textContainer;
  };

  // Use an object with the following properties in the function's argument

  // curveText({
  //   text:"B L A C K J A C K",
  //   textColor:"blue",
  //   fontSize:4,
  //   circleSize:200,
  //   curvature:.6,
  //   under:true,
  //   backColor: "lightgrey",
  //   lineSides: true,
  //   lineOnTop:1,
  //   lineOnBottom:1,
  //   lengthOfLines:14,
  //   lineColor:"red",
  // })
  var newDeck = function newDeck() {
    var suits = ['♥', '♦', '♠', '♣'];
    var faceCards = ['K', 'Q', 'J', 'A'];
    var deckArr = [];
    suits.forEach(function (suit) {
      faceCards.forEach(function (faceCard) {
        deckArr.push('[' + (faceCard + suit) + ']' + (faceCard === 'A' ? 11 : 10));
      });
      for (var i = 2; i <= 10; i++) {
        deckArr.push('[' + (i + suit) + ']' + i);
      }
    });
    return deckArr;
  };

  var shuffle = function shuffle(deck) {
    var backend = deck.splice(~ ~(deck.length / 2));
    var splitDeck = backend.concat(deck);
    var shuffledDeck = [];
    while (splitDeck.length) {
      shuffledDeck.push(splitDeck.splice(Math.random() * splitDeck.length, 1)[0]);
    }
    return shuffledDeck;
    // return ['[A♥]11','[A♥]11','[A♥]11','[5♥]5','[7♥]7','[10♥]10','[A♥]11','[4♥]4','[A♥]11','[A♥]11'] //test
    // return ['[A♥]11','[A♥]11','[A♥]11','[5♥]5','[7♥]7','[A♥]11','[3♥]3','[4♥]4','[A♥]11','[A♥]11'] //test dealer wins and aces go soft
    // return ['[K♥]10','[K♥]10','[5♥]5','[K♥]10','[7♥]7','[A♥]11','[3♥]3','[4♥]4','[A♥]11','[A♥]11'] //test dealer wins on first two
  };

  var firstGame = true;
  var p1CardPosition = document.getElementById('p1Position');
  var dealerCardPosition = document.getElementById('dealerPosition');
  var container = document.getElementsByClassName('container');
  var startButton = document.getElementsByTagName('button')[0];
  var hitButton = document.createElement('button');
  var holdButton = document.createElement('button');
  var yourDisplayedTotal = document.getElementById('yourTotalVal');
  var dealerDisplayedTotal = document.getElementById('dealerTotalVal');
  var overlay = document.getElementsByClassName('overlay');
  var gameFinishedText = document.getElementById('textBox');
  var dealerSoft = document.getElementById('dealerSoft');
  var playerSoft = document.getElementById('playerSoft');

  var table = document.getElementById("table");
  // var curvedText = curveText("B\u00A0L\u00A0A\u00A0C\u00A0K\u00A0J\u00A0A\u00A0C\u00A0K","under",1100,4);
  // curvedText.style.position = "relative"
  // curvedText.style.zIndex = "0"
  // curvedText.style.color = "#438C43;"
  // curvedText.style.top = "-902px"
  // curvedText.style.left = "-20px"
  var curvedText = curveText({
    text: "B L A C K J A C K",
    textColor: "#438C43",
    fontSize: 5,
    circleSize: 670,
    curvature: 0.12,
    lineOnTop: 1,
    lineOnBottom: 1,
    lineColor: "#438C43",
    under: true
  });

  table.insertBefore(curvedText, table.firstChild);

  var shuffledDeck = undefined,
      p1TotalSoFar = undefined,
      dealerTotalSoFar = undefined,
      dealersAces = undefined,
      playersAces = undefined,
      p1Finished = undefined,
      dealerFinished = undefined,
      playerX = undefined,
      playerY = undefined,
      dealerX = undefined,
      dealerY = undefined,
      dealerShowSoft = undefined,
      playerShowSoft = undefined,
      initialTwoCards = undefined,
      clnStartButton = undefined;
  gameReset();

  function btnControl(switched) {
    holdButton.disabled = switched;
    hitButton.disabled = switched;
  }

  function gameReset() {
    setTimeout(function () {
      playerShowSoft = dealerShowSoft = false;
      playerSoft.style.visibility = "hidden";
      dealerSoft.style.visibility = "hidden";
      overlay[0].style.visibility = 'hidden';
      p1CardPosition.innerHTML = '';
      dealerCardPosition.innerHTML = '';
      yourDisplayedTotal.textContent = '0';
      dealerDisplayedTotal.textContent = '0';
    }, firstGame ? 0 : 1500);
    shuffledDeck = shuffle(newDeck());
    btnControl(false);
    if (!firstGame) {
      startButton = clnStartButton;
      container[0].removeChild(container[0].children[1]);
      container[0].removeChild(container[0].children[1]);
      container[0].appendChild(startButton);
    }
    startButton.addEventListener("click", begin);
  }

  function begin() {

    initialTwoCards = true;
    playerX = dealerX = -875;
    playerY = 329;
    dealerY = 73;
    dealersAces = [];
    playersAces = [];
    p1Finished = dealerFinished = false;
    p1TotalSoFar = dealerTotalSoFar = 0;
    dealToP1();
    setTimeout(function () {
      dealToDealer();
      setTimeout(function () {
        dealToP1();
        setTimeout(function () {
          dealToDealer("facedown");
          setTimeout(function () {
            container[0].appendChild(holdButton).textContent = "Stick";
            container[0].appendChild(hitButton).textContent = "Hit";
          }, 2000);
        }, 1500);
      }, 1500);
    }, 1500);
    clnStartButton = startButton.cloneNode(true);
    startButton.parentNode.removeChild(startButton);
  }
  function turnDealersSecondCard() {
    dealerCardPosition.childNodes[1].classList.remove('facedown');
    initialTwoCards = false;
    dealerSoft.style.visibility = dealerShowSoft ? "visible" : "hidden";
    dealerDisplayedTotal.textContent = dealerTotalSoFar;
  }

  holdButton.addEventListener("click", function () {
    p1Finished = true;
    btnControl(true);
    setTimeout(function () {
      turnDealersSecondCard();
      continueDealersMove();
    }, 800);
  });

  hitButton.addEventListener("click", function () {
    btnControl(true);
    dealToP1();
  });

  var dealToP1 = function dealToP1() {
    animateDeal(false);
    var card = produceCard(playersAces);
    p1CardPosition.appendChild(card.card);
    p1TotalSoFar += Number(card.value);
    if (p1TotalSoFar > 21) {
      p1TotalSoFar = checkLose(playersAces, p1TotalSoFar);
    }
  };

  var dealToDealer = function dealToDealer(cardStatus) {
    animateDeal(true);
    var card = produceCard(dealersAces);
    if (cardStatus) {
      card.card.classList.add(cardStatus);
    }
    setTimeout(function () {
      dealerCardPosition.appendChild(card.card);
    }, 2000);
    setTimeout(function () {
      dealerTotalSoFar += Number(card.value);
      if (dealerTotalSoFar > 21) {
        dealerTotalSoFar = checkLose(dealersAces, dealerTotalSoFar);
      }
    }, 1500);
  };

  var produceCard = function produceCard(whichPlayer) {
    var card = document.createElement('div');
    card.classList.add("card");
    var currentCard = shuffledDeck.shift();
    var cardFace = currentCard.match(/\[(.+)\]/)[1];
    card.textContent = cardFace;
    if (cardFace.indexOf('♠') + cardFace.indexOf('♣') === -2) {
      card.classList.add("red");
    }
    var value = Number(currentCard.match(/\](\d+)/)[1]);
    if (cardFace.indexOf('A') === 0) {
      whichPlayer.push('A');
      checkHardOrSoft();
    }
    return { card: card, value: value };
  };

  var checkHardOrSoft = function checkHardOrSoft() {
    dealerShowSoft = dealersAces.length ? true : false;
    playerShowSoft = playersAces.length ? true : false;
  };

  var checkLose = function checkLose(aces, total) {
    if (aces.length) {
      aces.pop();
      total -= 10;
    }
    if (aces.length) {
      aces.pop();
      total -= 10;
    }
    checkHardOrSoft();
    if (total > 21) {
      setTimeout(function () {
        winSequence();
      }, 3000);
    }
    return total;
  };

  var continueDealersMove = function continueDealersMove() {
    setTimeout(function () {
      if (dealerTotalSoFar < 17) {
        dealToDealer();
        continueDealersMove();
      } else if (dealerTotalSoFar <= 21) {
        dealerFinished = true;
        if (p1Finished) {
          setTimeout(function () {
            winSequence();
          });
        }
      }
    }, 1500);
  };

  var winSequence = function winSequence() {
    var gameOverText;
    btnControl(true);
    switch (true) {
      case dealerTotalSoFar > 21:
        gameOverText = 'You won, dealer went bust';
        break;
      case p1TotalSoFar > 21:
        gameOverText = 'You lost, you went bust';
        break;
      case p1TotalSoFar < dealerTotalSoFar:
        gameOverText = 'You lost';
        break;
      case p1TotalSoFar > dealerTotalSoFar:
        gameOverText = 'You won';
        break;
      case p1TotalSoFar === dealerTotalSoFar:
        gameOverText = 'That was a draw';
    }
    setTimeout(function () {
      gameResult(gameOverText);
    }, 1000);
  };

  var gameResult = function gameResult(result) {
    overlay[0].style.visibility = 'visible';
    gameFinishedText.textContent = result;
    firstGame = false;
    gameReset();
  };
});