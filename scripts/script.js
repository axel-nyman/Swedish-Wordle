/*----------------------------------------------------------------------
-----------------------------CONST & VARIABLES--------------------------
-----------------------------------------------------------------------*/

//ARRAY OF ALL SWEDISH WORDS
const bank = [];

var r = document.querySelector(':root');

// THE FIVE INPUT BOXES
const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");

//THE "SUBMIT" BUTTON
const enter = document.getElementById("enter-div");

const newButton = document.getElementById("new-div");

const reveal = document.getElementById("reveal");

//THE CORRECT ANSWER
var randomWord;


/*----------------------------------------------------------------------
-----------------------------FUNCTIONS----------------------------------
-----------------------------------------------------------------------*/

//SELECTS A CORRECT ANSWER AT REFRESH
correctAnswer();

//MAKES SURE SUBMIT BUTTON IS INVISIBLE WHEN REFRESHED
enter.style.visibility = "hidden";

//MAKES SURE "NEW WORD" BUTTON IS INVISIBLE WHEN REFRESHED
newButton.style.visibility = "hidden";

//SAFETY MEASURE: IN CASE SOMEONE SUCCEEDS TO INPUT SOMETHING IN A BOX WHICH
// ALREADY CONTAINS A LETTER, THE OLD VALUE IS REMOVED FIRST
function clearField() {
    document.activeElement.value = "";
}

//IF ALL BOXES ARE FILLED OUT, THE SUBMIT BUTTON IS HIDDEN
function refreshEnter() {
    if ((one.value == "" || one.value == null) || (two.value == "" || two.value == null) || (three.value == "" || three.value == null) || (four.value == "" || four.value == null) || (five.value == "" || five.value == null)) {
        enter.style.visibility = "hidden";
        enter.style.animationName = "";
        newButton.style.visibility = "hidden";
        newButton.style.animationName = "";
        reveal.innerText = "";
    } else {
        enter.style.visibility = "visible";
        enter.style.animationName = "opacity";
    }
}

//GETS A LIST OF RANDOM WORDS, AND RUNS A FUNCTION TO RANDOMLY SELECT ONE
function correctAnswer() {
    //GETS THE LIST OF WORDS
    let requestURL = '/scripts/svenska-ord.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        //FOCUSES ON THE FIRST INPUT BOX AND RUNS FUNCTION TO RANDOMLY SELECT A CORRECT ANSWER
        const words = request.response;
        one.focus();
        randomWord = random(words);
        //console.log(randomWord);
    }
}

//SELECTS A RANDOM WORD FROM THE LIST OF WORDS
function random(obj) {
    var keys = Object(obj);
    //LOOPS THROUGH ALL THE WORDS, AND STORES ALL WORDS WITH "length == 5"
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].length == 5 && !keys[i].includes('-')) {
            bank.push(keys[i]);
        }
    }
    //SELECTS A RANDOM WORD FROM THE LIST OF FIVE-LETTER WORDS
    return bank[bank.length * Math.random() << 0].toLowerCase();
};

//PERFORMED ON EVERY INPUT
function input() {
    //LOOP THROUGH ALL INPUT BOXES
    for (let i = 1; i < 6; i++) {
        //IF ACTIVE INPUT BOX IS EMPTY, DO NOTHING
        if ((document.getElementById(i) == document.activeElement) && (document.getElementById(i).value == "" || document.getElementById(i).value == null)) {            
            break;
        } else if (document.getElementById(i) == document.activeElement) {
            if (document.getElementById(i + 1) == null) {
                //IF ACTIVE INPUT BOX IS THE LAST BOX (5), DESELECT "FIVE"
                five.blur();
                break;
            } //IF NOT, MOVE ON TO THE NEXT INPUT BOX
            document.getElementById(i + 1).focus();
            break;
        }
    }
    refreshEnter();
}

//MAKES IT SO THAT THE USER CAN'T "UNFOCUS" SELECTED ELEMENT
//FOCUS WILL ALWAYS BE ON THE FIRST EMPTY BOX, OR NONE OF THE BOXES
function refocus() {
    for (let i = 1; i < 6; i++) {
        if (document.getElementById(i).value == "" || document.getElementById(i).value == null) {
            document.getElementById(i).focus();
            break;
        }
    }
}

//CHECKS IF THE SUBMITTED GUESS IS CORRECT OR FALSE
function guess() {
    enter.style.visibility = "hidden";
    enter.style.animationName = "";
    const userGuess = (one.value + two.value + three.value + four.value + five.value).toLowerCase();

    //GETS A LIST OF ALL THE SWEDISH WORDS
    let requestURL = '/scripts/svenska-ord.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const words = request.response;
        //CHECKS IF USER GUESS IS IN THE LIST OF WORDS, ELSE IT'S NOT A VALID GUESS
        if (Object(words).includes(userGuess)) {
            const yellows = [];
            var word = randomWord;
            for (let i = 1; i < 6; i++) {
                const guessedLetter = document.getElementById(i);
                //IF ACTIVE LETTER IS INCLUDED IN THE CORRECT ANSWER, AND IN THE RIGHT PLACE, COLOR = GREEN
                if (guessedLetter.value.toLowerCase() == randomWord[i-1]) {
                    guessedLetter.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-grn');
                    guessedLetter.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-drk-grn');
                    word = word.replace(guessedLetter.value.toLowerCase(), '');

                //IF ACTIVE LETTER IS INCLUDED IN THE CORRECT ANSWER BUT IN THE WRONG PLACE, COLOR = YELLOW
                } else if (word.includes(guessedLetter.value.toLowerCase())) {
                    guessedLetter.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-ylw');
                    guessedLetter.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-drk-ylw');
                    yellows.push(i);

                //IF ACTIVE LETTER IS NOT INCLUDED IN THE CORRECT ANSWER, COLOR = RED
                } else {
                    guessedLetter.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-red');
                    guessedLetter.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-drk-red');
                }
            }

            //CHECK FOR DUPLICATE CHARACTERS
            for (let y = 0; y < yellows.length; y++) {
                let i = yellows[y];
                const guessedLetter = document.getElementById(i);
                if (word.includes(guessedLetter.value.toLowerCase())) {
                    word = word.replace(guessedLetter.value.toLowerCase(), '');
                    continue;
                }
                guessedLetter.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-red');
                guessedLetter.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-drk-red');
            }
            
            //CHECKS IF THE ANSWER IS CORRECT OR FALSE
            if ((userGuess) == randomWord) {
                reveal.innerText = "RÄTT SVAR";
                newButton.style.visibility = "visible";
                newButton.style.animationName = "opacity";
            } else {
                reveal.innerText = "FEL SVAR";
            }
        
        //SUBMITTED GUESS IS NOT VALID (NOT INCLUDED IN THE LIST OF SWEDISH WORD)
        } else {
            alert(userGuess.charAt(0).toUpperCase() + userGuess.slice(1) + " är inte ett riktigt ord.")
        }
    }
}

function reset() {
    for (var i = 1; i < 6; i++) {
        document.getElementById(i).style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-grey');
        document.getElementById(i).style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--clr-blk');
        document.getElementById(i).value = "";
    }
    one.focus();
    refreshEnter();
}

function nextWord() {
    reset();
    correctAnswer();
}


/*----------------------------------------------------------------------
-----------------------------EVENT LISTENERS----------------------------
-----------------------------------------------------------------------*/

document.addEventListener('keydown', clearField);
document.addEventListener('input', input);
document.activeElement.addEventListener('focusout', refocus);

//MAKES IT SO THAT THE USER CAN'T MANUALLY SELECT AN INPUT BOX
one.onmousedown = function(event) {
    event.preventDefault();
};
two.onmousedown = function(event) {
    event.preventDefault();
};
three.onmousedown = function(event) {
    event.preventDefault();
};
four.onmousedown = function(event) {
    event.preventDefault();
};
five.onmousedown = function(event) {
    event.preventDefault();
};

document.onkeydown = function() {
    var key = event.keyCode || event.charCode;

    if (key <= 57 || (key >= 96 && key <= 111)) {
        if (key != 13 && key != 8 && key != 46 && key != 32) {
            event.preventDefault();
            return;

        }
    }

    
    if (reveal.innerText == "FEL SVAR") {
        reset();
    }

    
    //IF DELETE OR BACKSPACE IS PRESSED
    if( key == 8 || key == 46 ) {
        for (i = 2; i < 6; i++) {
            //IF SELECTED BOX IS EMPTY WHEN DELETE IS PRESSED, PREVIOUS BOX IS CLEARED AND FOCUSED
            if (document.getElementById(i).value == "" || document.getElementById(i).value == null) {
                document.getElementById(i - 1).value = "";
                document.getElementById(i - 1).focus();
                break;
            // ELSE IF SELECTED BOX IS "FIVE", IT'S NOT EMPTY, AND THE USER HASN'T GUESSED YET:
            //  CLEAR FIVE AND THEN FOCUS ON IT
            } else if (i == 5 && five.style.backgroundColor != "green") {
                five.value = "";
                five.focus();
                refreshEnter();
            }
        }
    }
    
    //IF ENTER IS PRESSED, AND "ENTER BUTTON" IS VISIBLE, SUBMIT GUESS
    if(key == 13 && enter.style.visibility == "visible") {
        guess();
    }

    if (key == 32) {
        event.preventDefault();
        if (newButton.style.visibility == "visible") {
            nextWord();
        }
    }
}
