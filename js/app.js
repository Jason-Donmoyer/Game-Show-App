//////////////////// VARIABLES //////////////////////

// select starting screen
const startScreen = document.querySelector('.start'); 
// select overlay screen
const overlayScreen = document.querySelector('#overlay');
// start game button
const startButton = document.querySelector('.btn__reset');
// Get the element with the ID of qwerty and save it to a variable
const keyboard = document.querySelector('#qwerty');
// Get the element with the ID of phrase and save it to a variable
const puzzleBoard = document.querySelector('#phrase');
// Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed (remember, if the player guesses wrong 5 times, they lose the game)
let missed = 0;
// Create a phrases array that contains at least 5 different phrases as strings.
    // No special punctuation
const phrases = [
    'two whole chickens and a coke',
    'littering and',
    'get me the freakin laser',
    'you sold petey',
    'why you buying',
    'you can read minds',
    'mess with the bull you get the horns',
    'do you see the light',
];
// ul in the #phrase div
const puzzleBoardUl = puzzleBoard.firstElementChild;
// buttons in the keyboard section
const keyButtons = document.querySelectorAll('.keyrow button');
// heart images
const tries = document.querySelectorAll('.tries img');


//////////////////// EVENT LISTENERS /////////////////////

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', startGame); 

// Add an event listener to the keyboard.
    // Use event delegation to listen only to button events from the keyboard. When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice. Note that button elements have an attribute you can set called “disabled” that when set to true will not respond to user clicks.
    // Pass the button to the checkLetter function
keyboard.addEventListener('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
        const letterFound = checkLetter(e.target.innerText);
        e.target.setAttribute('disabled', true);
        if (!e.target.hasAttribute('class', 'keyrow')) {
            e.target.classList.add('chosen');
        }
        
        console.log(letterFound);
        
        // Count the missed guesses in the game.
        // Remove heart from game board.
        if (letterFound === null) {
            missed++;
            // removes one heart
            for (let i = 0; i < missed; i++) {
                tries[i].setAttribute('src', 'images/lostHeart.png');
            }    
        }
    }
    // Check for win or loss
    checkWin();
});

//////////////////// FUNCTIONS /////////////////////

// Creates new game board
function startGame() {
    startScreen.style.display = 'none';
    let newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
    startButton.removeEventListener('click', startGame);
}

// Create a getRandomPhraseAsArray function.
    // This function should randomly choose a phrase from the phrases array and split that phrase into a new array of characters. The function should then return the new character array.

function getRandomPhraseAsArray(arr) {
    let num = Math.floor((Math.random() * arr.length));
    let splitPhrase = arr[num].split('');
    return splitPhrase;
}

// Set the game display.
    // Create an addPhraseToDisplay function that loops through an array of characters. Inside the loop, for each character in the array, you’ll create a list item, put the character inside of the list item, and append that list item to the #phrase ul in your HTML. If the character in the array is a letter and not a space, the function should add the class “letter” to the list item.
       // To use the function, you’ll get the value returned by the getRandomPhraseAsArray, save it to a variable, and pass it to addPhraseToDisplay as an argument:

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let newListItem = document.createElement('li');
        if (arr[i] === ' ') {
            newListItem.classList.add('empty');
        }
        newListItem.innerText = arr[i];
        if (arr[i] !== ' ') {
            newListItem.classList.add('letter');
        }
        puzzleBoardUl.appendChild(newListItem);
    }
}

//Create a checkLetter function.
    // The checkLetter function will be used inside of the event listener you’ll write in the next step.
    // This function should have one parameter: the button the player has clicked when guessing a letter.
    // The checkLetter function should get all of the elements with a class of “letter” (remember that we added the letter class to all of the letters and none of the spaces when we made the game display). The function should loop over the letters and check if they match the letter in the button the player has chosen.
    // If there’s a match, the function should add the “show” class to the list item containing that letter, store the matching letter inside of a variable, and return that letter.
    // If a match wasn’t found, the function should return null.
function checkLetter(ch) {
    let letterArr = document.querySelectorAll('.letter');
    for (let i = 0; i < letterArr.length; i++) {
        var checkedLetter;
        if (ch === letterArr[i].innerText) {
            letterArr[i].classList.add('show');
        }
    } 
    for (let i = 0; i < letterArr.length; i++) {
        if (ch === letterArr[i].innerText) {
            checkedLetter = ch;
            break;
        } else {
            checkedLetter = null
        }
    }
    return checkedLetter;
}

// Create a checkWin function.
    // Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.
   
function checkWin() {
    // variables to check for winning conditional statements
    let showClass = document.querySelectorAll('.show');
    let letterClass = document.querySelectorAll('.letter');
    let showClassLetters = [];
    let letterClassLetters = [];
    // add item to array when correct letter is clicked
    showClass.forEach( (l) => {
        showClassLetters.push(l);
    });
    // total array of letters in puzzle
    letterClass.forEach( (l) => {
        letterClassLetters.push(l);
    });
    // clear class of the #overlay div
    if (overlayScreen.hasAttribute('class', 'start')) {
        overlayScreen.classList.remove('start');
    } else if (overlayScreen.hasAttribute('class', 'win')) {
        overlayScreen.classList.remove('win');
    } else if (overlayScreen.hasAttribute('class', 'lose')) {
        overlayScreen.classList.remove('lose');
    } 
    // check for winner
    if (showClassLetters.length > 0 || missed > 0) {
        if (showClassLetters.length === letterClassLetters.length) {
            overlayScreen.setAttribute('class', 'win');
            restartGame();
        }
        if (missed === 5) {
            overlayScreen.setAttribute('class', 'lose');
            restartGame();
        }
    }  
}


// clears previous game board and restarts game onclick
function restartGame() {
    overlayScreen.style.display = '';
        startButton.innerText = 'Play Again';
        missed = 0;
        for (let i = 0; i < keyButtons.length; i++) {
            keyButtons[i].removeAttribute('disabled');
            keyButtons[i].removeAttribute('class');
        }
        for (let i = 0; i < tries.length; i++) {
            tries[i].setAttribute('src', 'images/liveHeart.png');
        }  
        while (puzzleBoardUl.hasChildNodes()) {
            puzzleBoardUl.removeChild(puzzleBoardUl.lastChild);
        }
        startButton.addEventListener('click', startGame);
}





