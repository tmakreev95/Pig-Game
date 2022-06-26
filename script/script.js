'use strict';

//Variables
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0Element.textContent = 0, score1Element.textContent = 0;
diceElement.classList.add('hidden');

let scores, currentScore, activePlayer, gameStatus;
//Variables

//Functions
const initialization = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gameStatus = true;

    score0Element.textContent = 0;
    score1Element.textContent = 0;

    current0Element.textContent = 0;
    current1Element.textContent = 0;

    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');

    btnRoll.removeAttribute('disabled');
    btnHold.removeAttribute('disabled');
}

const switchPlayer = function() {
    //Switching to next player
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0; 
    
    player0Element.classList.toggle('player--active'); //Adds the class if class exists
    player1Element.classList.toggle('player--active'); //Adds the class if class exists
}

initialization();
//Functions

//Events
btnRoll.addEventListener('click', function() {
    if (gameStatus) {
        //1. Generating random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1; 
    
        //2. Display dice
        diceElement.classList.remove('hidden');
        diceElement.src = `images/dice-${dice}.png`;
    
        //3. Check for rolled 1 -> then switch to Player 2    
        if(dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if(gameStatus) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
    
        // 2. Check if players's score is >= 100
        // Finish the game
        if (scores[activePlayer] >= 100) {
            gameStatus = false;

            btnRoll.setAttribute('disabled', 'disabled');
            btnHold.setAttribute('disabled', 'disabled');
    
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            
            diceElement.classList.add('hidden');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', initialization);
//Events