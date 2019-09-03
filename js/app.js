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
    let puzzleBoardUl = puzzleBoard.firstElementChild;
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
    // arr.forEach( (letter) => {
    //     let newListItem = document.createElement('li');
    //     newListItem.innerText = letter;
    //     if (letter !== ' ') {
    //         newListItem.classList.add('letter');
    //     }
    //     puzzleBoardUl.appendChild(newListItem);
    // });   
}

//Create a checkLetter function.
    // The checkLetter function will be used inside of the event listener you’ll write in the next step.
    // This function should have one parameter: the button the player has clicked when guessing a letter.
    // The checkLetter function should get all of the elements with a class of “letter” (remember that we added the letter class to all of the letters and none of the spaces when we made the game display). The function should loop over the letters and check if they match the letter in the button the player has chosen.
    // If there’s a match, the function should add the “show” class to the list item containing that letter, store the matching letter inside of a variable, and return that letter.
    // If a match wasn’t found, the function should return null.
function checkLetter(ch) {
    let letterArr = document.querySelectorAll('.letter');
    var checkedLetter;
    for (let i = 0; i < letterArr.length; i++) {
        var checkedLetter;
        if (ch === letterArr[i].innerText) {
            letterArr[i].classList.add('show');
            checkedLetter = ch;
            break;
    } else {
        checkedLetter = null;
    }
} return checkedLetter;
}
// var checkedLetter;
//     letterArr.forEach( (letter) => {
        
//         if (ch === letter.innerText) {
//             letter.classList.add('show');
//             checkedLetter = letter.innerText;
//             break;
//         } else {
//             checkedLetter = null
//         }   
        
//     }); 
//     return checkedLetter;
// }
// Add an event listener to the keyboard.
    // Use event delegation to listen only to button events from the keyboard. When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice. Note that button elements have an attribute you can set called “disabled” that when set to true will not respond to user clicks.
    // Pass the button to the checkLetter function, and store the letter returned inside of a variable called letterFound. At this point, you can open the index.html file, click any of the letters on the keyboard, and start to see the letters appear in the phrase.
    
const letterFound =[];
keyboard.addEventListener('click', (e) => {
    letterFound.push(checkLetter(e.target.innerText)); 
});
