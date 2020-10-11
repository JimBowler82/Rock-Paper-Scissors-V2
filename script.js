
// References To DOM Elements
const usernameInput = document.querySelector('#username');
const usernameSubmit = document.querySelector('#userSubmit');
const registerDiv = document.querySelector('#userEnter');
const welcomeDiv = document.querySelector('#userReady');
const welcomeMsg = document.querySelector('#welcomeMessage');
const userSelectDiv = document.querySelector('#userSelections');
const rockIcon = document.querySelector('#rock');
const paperIcon = document.querySelector('#paper');
const scissorsIcon = document.querySelector('#scissors');
const startBtn = document.querySelector('#start');
const area2 = document.querySelector('#area2');
const threeDiv = document.querySelector('#three');
const twoDiv = document.querySelector('#two');
const oneDiv = document.querySelector('#one');
const resultsArea = document.querySelector('#resultsArea');
const resultDiv = document.querySelector('#results');
const winMsg = document.querySelector('#winner');
const loseMsg = document.querySelector('#loser');
const drawMsg = document.querySelector('#draw');
const statsArea = document.querySelector('#stats');
const statsUsername = document.querySelector('#statsUsername');
const stats1GamesPlayed = document.querySelector('#stats1GamesPlayed');
const stats1Score = document.querySelector('#stats1Score');
const stats2GamesWon = document.querySelector('#stats2GamesWon');
const stats2GamesLost = document.querySelector('#stats2GamesLost');
const playAgainBtn = document.querySelector('#playAgain');
const reset = document.querySelector('#reset');


// Event Listeners
usernameSubmit.addEventListener('click', registerUser);
userSelectDiv.addEventListener('click', userSelection);
startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', playAgain);
reset.addEventListener('click', resetGame);

// Global Variables
let userChoice;
let computerChoice;
let result;
let user = '';
let gamesPlayed = 0;
let score = 0;
let gamesWon = 0;
let gamesLost = 0;

// Takes the username input and reveals the welcome message.
function registerUser() {
  if(usernameInput.value === '' || usernameInput.value.match(/[@<>"'.,%$£*()]/gi)) {
    alert('Invalid Username.  Please enter a real name!');
    return;
  }
  user = usernameInput.value;
  welcomeMsg.innerText = `Welcome ${user}, make your choice below to begin!`;
  registerDiv.style.display = 'none';
  usernameInput.value = '';
  revealArea(welcomeDiv);
  revealArea(area2);
  revealArea(userSelectDiv);
  revealArea(startBtn);
}

// Sets the user selection from click event.
function userSelection(e) {
  if(e.target.id === 'rock') {
    userSelectDiv.removeEventListener('click', userSelection);
    rockIcon.classList.remove('hoverable');
    paperIcon.classList.remove('hoverable');
    scissorsIcon.classList.remove('hoverable');
    rockIcon.classList.add('selected');
    userChoice = 'rock';
  }
  if(e.target.id === 'paper') {
    userSelectDiv.removeEventListener('click', userSelection);
    rockIcon.classList.remove('hoverable');
    paperIcon.classList.remove('hoverable');
    scissorsIcon.classList.remove('hoverable');
    paperIcon.classList.add('selected');
    userChoice = 'paper';
  }
  if(e.target.id === 'scissors') {
    userSelectDiv.removeEventListener('click', userSelection);
    rockIcon.classList.remove('hoverable');
    paperIcon.classList.remove('hoverable');
    scissorsIcon.classList.remove('hoverable');
    scissorsIcon.classList.add('selected');
    userChoice = 'scissors';
  }
}

// Determines computers choice using a random number.
function computer() {
  let random = Math.floor(Math.random() * 3);
  if(random === 0){
    return 'rock';
  } else if(random === 1) {
    return 'paper';
  } else if(random === 2) {
    return 'scissors';
  }
}

// Function to start the game when start button clicked.
function startGame() {
  if(!userChoice) {
    alert('Please a make a selection!' );
    return;
  }
  startBtn.setAttribute('disabled', true);
  computerChoice = computer();
  result = computeResult();
  revealArea(resultsArea);
  begin();
  gamesPlayed++;
}

// Determines result from user & computers choice
// returns Integer 0=draw, 1=win, -1=lose
function computeResult() {
  if(userChoice === computerChoice) {
    return 0;
  }

  if(userChoice === 'rock') {
    if(computerChoice ==='paper') {
      score--;
      gamesLost++;
      return -1;
    } else {
      score++;
      gamesWon++;
      return 1;
    }
  }
  if(userChoice === 'paper') {
    if(computerChoice ==='rock') {
      score++;
      gamesWon++;
      return 1;
    } else {
      score--;
      gamesLost++;
      return -1;
    }
  }
  if(userChoice === 'scissors') {
    if(computerChoice === 'rock') {
      score--;
      gamesLost++;
      return -1;
    } else {
      score++;
      gamesWon++;
      return 1;
    }
  }
}

// Sets up the requirements for the countdown loop.
function begin() {
	resultDiv.style.display = 'none';
	const screens = [threeDiv, twoDiv, oneDiv];
  let i = 1;
  screens[0].style.display = 'flex';
  loop(i, screens);
}

// Loop for displaying the '3,2,1' countdown.
// When calls displayResult when countdown finished.
function loop(i, screens) {
	setTimeout(function() {
  if(i === 3) {
  	screens[2].style.display = 'none';
    return displayResult();
  }
  screens[i-1].style.display = 'none';
  screens[i].style.display = 'flex';
  i++;
  loop(i, screens);
  }, 1500);
}

// Sets the required image to display in the results div
// representing the computers choice.
function displayResult() {
  let src;
  if(computerChoice === 'rock') {
    src = `./images/rock.png`;
  } else if(computerChoice === 'paper') {
    src = `./images/stationery.png`;
  } else {
    src = `./images/scissors.png`;
  }

  let resultImg = document.createElement('img');
  resultImg.setAttribute('src', src);
  resultImg.classList.add('resultImg');
  resultDiv.appendChild(resultImg);
  resultDiv.style.display = 'flex';

  setTimeout(displayBanner, 1000);
}

// Displays the required result banner based on result.
function displayBanner() {
  if(result === 1) {
    loseMsg.style.display = 'none';
    winMsg.style.display = 'block';
  } else if( result === -1) {
    winMsg.style.display = 'none';
  	loseMsg.style.display = 'block';
  } else {
    winMsg.style.display = 'none';
    loseMsg.style.display = 'none';
    drawMsg.style.display = 'block';
  }
  displayPlayAgain();
}

// Calls to reveal the play again button
// If already revealed, will remove the 'disabled' attribute
function displayPlayAgain() {
  if(playAgainBtn.style.visibility !== 'visible') {
    revealArea(playAgainBtn);
  }
  if(playAgainBtn.hasAttribute('disabled')) {
     playAgainBtn.removeAttribute('disabled');
  }
  
  displayStats();
}

// Updates the game stats and calls to reveal the stats area.
function displayStats() {
  if(statsArea.style.visibility !== 'visible') {
    console.log('first display');
    revealArea(statsArea);
    revealArea(reset);
  }
  statsUsername.innerHTML = `<strong>Player:</strong>   <em>${user}</em>`;
  stats1GamesPlayed.innerHTML = `<strong>Games Played:</strong>\t${gamesPlayed}`;
  stats1Score.innerHTML = `<strong>Score:</strong>   ${score}`;
  stats2GamesWon.innerHTML = `<strong>Games Won:</strong>   ${gamesWon}`;
  stats2GamesLost.innerHTML = `<strong>Games Lost:</strong>   ${gamesLost}`;
  
}

// Clears the results area of any images or messages
// Re-enables the game start button
// Re-enables the event listener back on to the user selections
// Adds the 'hoverable' class on to the user selection images.
// Removes the 'selected' class, if present, from any user selection images.
function playAgain() {
  resultDiv.lastChild.remove();
  let spanCollection = resultDiv.querySelectorAll('span.message');
  spanCollection.forEach(span => span.style.display = 'none');
  startBtn.removeAttribute('disabled');

  userChoice = '';
  userSelectDiv.addEventListener('click', userSelection);
  
  let imgCollection = userSelectDiv.querySelectorAll('img');
  imgCollection.forEach(img => {
    img.classList.add('hoverable');
    if(img.classList.contains('selected')) {
      img.classList.remove('selected');
    }
  })
  playAgainBtn.setAttribute('disabled', true);
}

// Reload a fresh version of the game
function resetGame() {
  location.reload();
}

// Takes in a reference to area and applies 
// the reveal class.
function revealArea(area) {
  area.style.display = 'flex';
  setTimeout(()=>{
    area.classList.add('reveal');
  }, 200);
  
}