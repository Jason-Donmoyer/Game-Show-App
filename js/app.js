//////////////////// VARIABLES //////////////////////

// select starting screen
const startScreen = document.querySelector('.start'); 
// start game button
const startButton = document.querySelector('.btn__reset');
// Get the element with the ID of qwerty and save it to a variable
const keyboard = document.querySelector('#qwerty');
// Get the element with the ID of phrase and save it to a variable
const puzzleBoard = document.querySelector('#phrase ul');
// Create a missed variable, initialized to 0, that you’ll use later to keep track of the number of guesses the player has missed (remember, if the player guesses wrong 5 times, they lose the game)
let missed = 0;

//////////////////// START GAME /////////////////////

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    let newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
});

// Create a phrases array that contains at least 5 different phrases as strings.
    // No special punctuation

const phrases = [
    'two whole chickens and a coke',
    'littering and',
    'get me the freakin laser',
    'you sold petey',
    'why you buying',
    'you can read minds',
];

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
    
    arr.forEach( (letter) => {
        let newListItem = document.createElement('li');
        newListItem.innerText = letter;
        if (letter !== ' ') {
            newListItem.classList.add('letter');
        }
        puzzleBoard.appendChild(newListItem);
    });   
}

 
