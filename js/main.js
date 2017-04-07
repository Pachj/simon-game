/**
 * Created by Henry on 03.04.17.
 */

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
let roundCounter = 0;
// the sequence of fields who the player has to repeat
let sequence = [];
// whether the game is running
let isRunning = false;
// whether the game is in strict mode
let isStrict = false;
// whether the game is enabled
let isEnabled = false;
// the number of fields the user has entered
let enteredFieldsCounter = 0;

$(document).ready(function() {
  // starts a new game
  $('#start').click(function() {
    if (!isRunning && isEnabled) {
      isRunning = true;
      $('#strict').prop('disabled', true);
      $('#start').fadeOut('slow');
      $('#round-counter').fadeIn('slow');
      pickNewField();
    }
  });

  // handles when the user clicks on a field
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
    // plays the sound of the field
    enteredField.sound.play();
    highlightInput(enteredField);
    gameController(enteredField);
  });

  // toggles the strict mode
  $('#strict').click(function() {
    if (!isRunning) {
      if (!isStrict) {
        isStrict = true;
        $('#strict').prop('checked', true);
      } else {
        isStrict = false;
        $('#strict').prop('checked', false);
      }
    }
  });

  // toggles whether the game is enabled or not
  $('#on-off').click(function() {
    if (!isRunning) {
      if (!isEnabled) {
        isEnabled = true;
        $('#on-off').prop('checked', true);
      } else {
        isEnabled = false;
        $('#on-off').prop('checked', false);
        $('#strict').prop('disabled', false);
      }
    } else {
      endGame();
      $('#strict').prop('disabled', false);
    }
  });
});

// picks a new field
function pickNewField() {
  const newFieldNumber = Math.floor(Math.random() * 4);
  sequence.push(fields[newFieldNumber]);
  roundCounter++;
  displayRoundCounter();
  showSequence();
}

// displays the length of the sequence
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
      $('.game-field').prop('disabled', true);
      enteredFieldsCounter = 0;
      window.setTimeout(pickNewField, 1000);
    }
  } else {
    if (isStrict) {
      resetGame();
    } else {
      enteredFieldsCounter = 0;
      window.setTimeout(showSequence, 1500);
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

      // kills this function if the game has been disabled
      if (!isRunning) {
        return;
      }
      window.setTimeout(showField, 500);
    } else {
      $('.game-field').prop('disabled', false);
    }
  }

  showField();
}

// resets the game and starts a new sequence
function resetGame() {
  roundCounter = 0;
  displayRoundCounter();
  sequence = [];
  enteredFieldsCounter = 0;

  window.setTimeout(pickNewField, 2000);
}

// ends the game
function endGame() {
  roundCounter = 0;
  sequence = [];
  enteredFieldsCounter = 0;
  isRunning = false;
  displayRoundCounter();

  $('#start').fadeIn('slow');
  $('#round-counter').fadeOut('slow');
}

/** highlights the entered field
 * @param {Object} enteredField - the field who the player has selected
 */
function highlightInput(enteredField) {
  // shows the entered field
  function showField() {
    const highlightColors = [
      'rgba(41, 191, 18, 0.6)', 'rgba(9, 178, 203, 0.6)',
      'rgba(196, 0, 140, 0.6)', 'rgba(242, 27, 63, 0.6)'];

    $(enteredField.id).
        css('background-color', highlightColors[enteredField.value]);
    window.setTimeout(resetField, 1000);
  }

  // resets the entered field to its normal color
  function resetField() {
    const originalColors = ['#29BF12', '#09B2CB', '#C4008C', '#F21B3F'];
    $(enteredField.id).
        css('background-color', originalColors[enteredField.value]);
  }

  showField();
}
