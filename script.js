'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // this line works the same as 1) line below
const score1El = document.getElementById('score--1'); // this solution is a bit faster
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0; // to change score 0 from default (html) to zero
score1El.textContent = 0; // to change score 1 from default (html) to zero
diceEl.classList.add('hidden'); // to hide the dice in the middleground at the start of the game- cus it has the score

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Call this function to reboot to the NEW GAME via the button
const init = function () {
  const scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;
  let playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // TANGIBLE EXAMPLE of above: scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});

// Reset the game to NEW GAME with button
btnNew.addEventListener('click', function () {
  currentScore = scores; // Reset the score
  playing = true;
  const dice = Math.trunc(Math.random() * 6) + 1;
  // Reset UI elements to default:
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner'); // This is to remove dark shadow spotlight from the winner side
  document;
  diceEl.classList.add('hidden'); // This is to hide the dice on deafault start
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active'); // This is to put spotlight on current player
  score0El.textContent = 0; // to change score 0 from default (html) to zero
  score1El.textContent = 0;
  switchPlayer();
});
