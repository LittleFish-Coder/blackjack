/*
E14076423 許茗洋 第3次作業 5/2
E14076423 Ming-Yang Hsu The Third Homework 5/2
*/

const pokerCards = [
  "ace_of_spades",
  "2_of_spades",
  "3_of_spades",
  "4_of_spades",
  "5_of_spades",
  "6_of_spades",
  "7_of_spades",
  "8_of_spades",
  "9_of_spades",
  "10_of_spades",
  "jack_of_spades",
  "queen_of_spades",
  "king_of_spades",
  "ace_of_hearts",
  "2_of_hearts",
  "3_of_hearts",
  "4_of_hearts",
  "5_of_hearts",
  "6_of_hearts",
  "7_of_hearts",
  "8_of_hearts",
  "9_of_hearts",
  "10_of_hearts",
  "jack_of_hearts",
  "queen_of_hearts",
  "king_of_hearts",
  "ace_of_diamonds",
  "2_of_diamonds",
  "3_of_diamonds",
  "4_of_diamonds",
  "5_of_diamonds",
  "6_of_diamonds",
  "7_of_diamonds",
  "8_of_diamonds",
  "9_of_diamonds",
  "10_of_diamonds",
  "jack_of_diamonds",
  "queen_of_diamonds",
  "king_of_diamonds",
  "ace_of_clubs",
  "2_of_clubs",
  "3_of_clubs",
  "4_of_clubs",
  "5_of_clubs",
  "6_of_clubs",
  "7_of_clubs",
  "8_of_clubs",
  "9_of_clubs",
  "10_of_clubs",
  "jack_of_clubs",
  "queen_of_clubs",
  "king_of_clubs",
];

var cardPool = [];

var dealerCards = [];
var myCards = [];

var dealerPoints = 0;
var playerPoints = 0;

var dealerRounds = 0;
var playerRounds = 0;

var chips = 100;
var turn = "dealer"; // turn will be dealer or player
var chipsToBet = 0;

var playerStand = false;
var gameStart = false;

function newGame() {
  restart();
  console.log("New Game");
  var userInput = prompt("How much to bet in chips?");
  if (userInput != null && userInput != "" && !isNaN(parseInt(userInput))) {
    chipsToBet = parseInt(userInput);
    console.log("You bet: ", chipsToBet);
    document.getElementById("bet").innerHTML = "Your bet amount: " + chipsToBet;
    gameStart = true;
  } else {
    alert("Please input a valid integer number, before you start a new game!");
    console.log("Hello, " + userInput + "!");
    return;
  }
  cardPool = pokerCards.slice();
  dealerHit();
  switchTurn();
  hit();
  hit();
}

function dealerHit() {
  dealerRounds += 1;
  console.log("Dealer Hit");
  randomIndex = Math.floor(Math.random() * cardPool.length); // random choose the card
  tempCard = cardPool[randomIndex]; //  pick the specific card
  console.log("Dealer gets ", tempCard);
  cardPool.splice(randomIndex, 1); // remove the card in cardPool
  dealerCards.push(tempCard); // add the card to dealerCards
  console.log("Dealer Cards: ", dealerCards);
  var number = cardToInteger(tempCard);
  dealerPoints += number;
  showImage(tempCard);
  updateTable(tempCard);
  // delay the function
  setTimeout(function () {
    checkPoints();
  }, 10);
  setTimeout(function () {
    if (playerStand) {
      dealerTurn();
    }
  }, 100);
}

function hit() {
  if (!gameStart) {
    alert("You have to start a new game before you hit!");
    return;
  }
  playerRounds += 1;
  console.log("Hit");
  randomIndex = Math.floor(Math.random() * cardPool.length); // random choose the card
  tempCard = cardPool[randomIndex]; //  pick the specific card
  console.log("You get ", tempCard);
  cardPool.splice(randomIndex, 1); // remove the card in cardPool
  myCards.push(tempCard); // add the card to myCards
  console.log("My Cards: ", myCards);
  playerPoints += cardToInteger(tempCard);
  showImage(tempCard);
  updateTable(tempCard);
  // delay the function
  setTimeout(function () {
    checkPoints();
  }, 10);
}

function updateTable(cardName) {
  cardName = cardName.replace(/_/g, " ");

  switch (turn) {
    case "dealer":
      var tableBody = document.getElementById("dealer-table-body");
      var points = dealerPoints;
      var rounds = dealerRounds;
      break;
    case "player":
      var tableBody = document.getElementById("player-table-body");
      var points = playerPoints;
      var rounds = playerRounds;
      break;
    default:
      break;
  }
  var newRow = tableBody.insertRow(-1);
  var round = newRow.insertCell(0);
  var cards = newRow.insertCell(1);
  var total = newRow.insertCell(2);

  round.innerHTML = rounds;
  cards.innerHTML = cardName;
  total.innerHTML = points;
}

function stand() {
  if (!gameStart) {
    return;
  }
  // if player press stand, this line will be triggered
  if (turn == "player") {
    playerStand = true;
    switchTurn();
    return;
  }
  // if dealer stands, this line will be triggered
  if (playerStand == true) {
    compare();
    return;
  }
}

function cardToInteger(cardName) {
  const tokens = cardName.split("_");
  number = tokens[0];
  suit = tokens[2];

  switch (turn) {
    case "dealer":
      var points = dealerPoints;
      break;
    case "player":
      var points = playerPoints;
      break;
    default:
      break;
  }

  switch (number) {
    case "ace":
      if (points + 11 > 21) {
        number = 1;
      } else {
        number = 11;
      }
      break;
    case "jack":
    case "queen":
    case "king":
      number = 10;
      break;
    default:
      number = parseInt(number);
  }

  return number;
}

function showImage(cardName) {
  switch (turn) {
    case "dealer":
      // get the div tag with id=dealer-playground
      var playground = document.getElementById("dealer_playground");
      if (dealerCards.length == 1) {
        coverImage = document.createElement("img");
        coverImage.src = "PlayingCards/cover.png";
        coverImage.id = "cover-card";
        playground.appendChild(coverImage);
        cardImage = document.createElement("img");
        cardImage.src = "PlayingCards/" + cardName + ".png";
        cardImage.id = "first-card";
        playground.appendChild(cardImage);
        document.getElementById("cover-card").style.display = "inline";
        document.getElementById("first-card").style.display = "none";
      } else {
        // create a new img tag
        var cardImage = document.createElement("img");
        // set image src
        cardImage.src = "PlayingCards/" + cardName + ".png";
        // append it to div tag
        playground.appendChild(cardImage);
      }
      break;
    case "player":
      // get the div tag with id=player-playground
      var playground = document.getElementById("player_playground");
      // create a new img tag
      var cardImage = document.createElement("img");
      // set image src
      cardImage.src = "PlayingCards/" + cardName + ".png";
      // append it to div tag
      playground.appendChild(cardImage);
    default:
      break;
  }
}

function checkPoints() {
  // check dealer
  if (dealerPoints > 21) {
    document.getElementById("cover-card").style.display = "none";
    document.getElementById("first-card").style.display = "inline";
    alert("Boom! Dealer lose!");
    endGame();
  }
  // check player
  if (playerPoints > 21) {
    alert("Boom! You lose!");
    endGame();
  }
}

function dealerTurn() {
  if (dealerPoints < 17) {
    dealerHit();
  } else {
    stand();
  }
}

function switchTurn() {
  if (turn == "dealer") {
    turn = "player";
  } else if (turn == "player") {
    turn = "dealer";
    dealerTurn();
  }
}

function endGame() {
  var bulletin = document.getElementById("bulletin");

  if (dealerPoints > 21) {
    winner = "Player";
    loser = "Dealer";
    bulletin.innerHTML = winner + " Win ! " + loser + " Lose !";
  } else if (playerPoints > 21) {
    winner = "Dealer";
    loser = "Player";
    bulletin.innerHTML = winner + " Win ! " + loser + " Lose !";
  } else if (dealerPoints == playerPoints) {
    bulletin.innerHTML = "Tie!";
    alert(bulletin.innerHTML);
  } else if (dealerPoints > playerPoints) {
    winner = "Dealer";
    loser = "Player";
    bulletin.innerHTML = winner + " Win ! " + loser + " Lose !";
    alert(bulletin.innerHTML);
  } else if (playerPoints > dealerPoints) {
    winner = "Player";
    loser = "Dealer";
    bulletin.innerHTML = winner + " Win ! " + loser + " Lose !";
    alert(bulletin.innerHTML);
  }

  return;
}

function compare() {
  // set the cover-card display: none
  document.getElementById("cover-card").style.display = "none";
  document.getElementById("first-card").style.display = "inline";
  // show all the cards, and compare both
  setTimeout(function () {
    endGame();
  }, 10);
}

function surrender() {
  alert("You lose!");
}

function restart() {
  dealerCards = [];
  myCards = [];

  dealerPoints = 0;
  playerPoints = 0;

  dealerRounds = 0;
  playerRounds = 0;

  turn = "dealer";
  playerStand = false;
  gameStart = false;

  document.getElementById("dealer_playground").innerHTML = "";
  document.getElementById("player_playground").innerHTML = "";
  document.getElementById("dealer-table-body").innerHTML = "";
  document.getElementById("player-table-body").innerHTML = "";
  document.getElementById("bulletin").innerHTML = "Bulletin";
  document.getElementById("bet").innerHTML = "Your bet amount:";
}
