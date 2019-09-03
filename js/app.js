//////////////////// VARIABLES //////////////////////

// select starting screen
const startScreen = document.querySelector('.start'); 
// start game button
const startButton = document.querySelector('.btn__reset');
// Get the element with the ID of qwerty and save it to a variable
const keyboard = document.querySelector('#qwerty');
// Get the element with the ID of phrase and save it to a variable
const puzzleBoard = document.querySelector('#phrase');
// Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed (remember, if the player guesses wrong 5 times, they lose the game)
let missed = 0;

//////////////////// START GAME /////////////////////

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
document.addEventListener('click', () => {
    startScreen.style.display = 'none';
});

//Create a phrases array that contains at least 5 different phrases as strings.
    // No special punctuation

const phrases = [
    'two whole chickens and a coke',
    'littering and',
    'get me the freakin laser',
    'you sold petey',
    'why you buying',
    'you can read minds',
];