/**
 * Created by Henry on 03.04.17.
 */

// ToDo: disable the buttons
// ToDo: add sounds
// ToDo: start button should change to restart

$(document).ready(function() {
  $('#start').click(function() {
    if (!isRunning) {
      pickNewField();
    }
  });

  $('.game-field').click(function() {
    let enteredField;
    switch (this.id) {
      case 'green-button':
        enteredField = fields[0];
        break;
      case 'blue-button':
        enteredField = fields[1];
        break;
      case 'violet-button':
        enteredField = fields[2];
        break;
      case 'red-button':
        enteredField = fields[3];
        break;
    }
    enteredField.sound.play();
    gameController(enteredField);
  });
});

let fields = [
  {
    id: '#green-button',
    value: 0,
    sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  },
  {
    id: '#blue-button',
    value: 1,
    sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  },
  {
    id: '#violet-button',
    value: 2,
    sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  },
  {
    id: '#red-button',
    value: 3,
    sound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  },
];

// counter of how many fields are in the sequence
let roundCounter = 0; // ToDo: could be removed? sequence.length
// the sequence of fields who the player has to repeat
let sequence = [];
// whether the game is running
let isRunning = false;
// whether the game is in strict mode
let isStrict = false;

let enteredFieldsCounter = 0;

// picks a new field
function pickNewField() {
  const newFieldNumber = Math.floor(Math.random() * 4);
  sequence.push(fields[newFieldNumber]);
  roundCounter++;
  displayRoundCounter();
  showSequence();
}

function displayRoundCounter() {
  $('#round-counter').html(roundCounter);
}

/** handles the user input and decides what the next step should be
 * @param {Object} enteredField - the object who represents the selected field
 */
function gameController(enteredField) {
  if (enteredField === sequence[enteredFieldsCounter]) {
    enteredFieldsCounter++;
    if (enteredFieldsCounter >= sequence.length) {
      enteredFieldsCounter = 0;
      window.setTimeout(pickNewField, 1000);
    }
  } else {
    if (isStrict) {
      resetGame();
    } else {
      enteredFieldsCounter = 0;
      showSequence(); // ToDo: add delay
    }
  }
}

// displays the sequence
function showSequence() {
  let actualField = sequence[0];
  let fieldCounter = 0;

  // shows the actual field
  function showField() {
    const highlightColors = [
      'rgba(41, 191, 18, 0.6)', 'rgba(9, 178, 203, 0.6)',
      'rgba(196, 0, 140, 0.6)', 'rgba(242, 27, 63, 0.6)'];

    $(actualField.id).
        css('background-color', highlightColors[actualField.value]);
    actualField.sound.play();
    window.setTimeout(resetField, 1000);
  }

  // resets the actual field to its normal color
  function resetField() {
    const originalColors = ['#29BF12', '#09B2CB', '#C4008C', '#F21B3F'];
    $(actualField.id).
        css('background-color', originalColors[actualField.value]);

    fieldCounter++;

    if (fieldCounter < sequence.length) {
      actualField = sequence[fieldCounter];
      window.setTimeout(showField, 500);
    }
  }

  /** returns the id of the actual field
   * @return {String} the id of the actual field
   */
  /*
   function changeActualId() {
   switch (actualField) {
   case 1:
   return '#green-button';
   case 2:
   return '#blue-button';
   case 3:
   return '#violet-button';
   case 4:
   return '#red-button';
   }
   }*/

  showField();
}

// resets the game and starts a new sequence
function resetGame() { // ToDo: add delay
  roundCounter = 0;
  sequence = [];
  enteredFieldsCounter = 0;

  pickNewField();
}
