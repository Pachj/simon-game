/**
 * Created by Henry on 03.04.17.
 */
$(document).ready(function() {
  $('#start').click(function() {
    if (!isRunning) {
      pickNewField();
    }
  });

  $('.game-field').click(function() {
    gameController(parseInt($(this).attr('value')));
  });
});

let roundCounter = 0;
let sequence = [];
let isRunning = false;
let isStrict = false;

let enteredFieldsCounter = 0;

function pickNewField() {
  const newFieldNumber = Math.floor((Math.random() * 4) + 1);
  sequence.push(newFieldNumber);
  roundCounter++;
  displayRoundCounter();
  showSequence();
}

function displayRoundCounter() {
  $('#round-counter').html(roundCounter);
}

function gameController(enteredField) { // ToDo: needs to be tested
  if (enteredField === sequence[enteredFieldsCounter]) {
    enteredFieldsCounter++;
    if (enteredFieldsCounter >= sequence.length) {
      enteredFieldsCounter = 0;
      window.setTimeout(pickNewField, 1000);
    }
  } else {
    if (isStrict) {
      // reset the game
    } else {
      enteredFieldsCounter = 0;
      showSequence();
    }
  }
}

// displays the sequence
function showSequence() { // ToDo: change the values of the buttons
  let actualField = sequence[0];
  let actualFieldId = changeActualId();
  let fieldCounter = 0;

  // shows the actual field
  function showField() {
    const highlightColors = [
      'rgba(41, 191, 18, 0.6)', 'rgba(9, 178, 203, 0.6)',
      'rgba(196, 0, 140, 0.6)', 'rgba(242, 27, 63, 0.6)'];

    $(actualFieldId).css('background-color', highlightColors[actualField - 1]);
    window.setTimeout(resetField, 1000);
  }

  // resets the actual field to its normal color
  function resetField() {
    const originalColors = ['#29BF12', '#09B2CB', '#C4008C', '#F21B3F'];
    $(actualFieldId).css('background-color', originalColors[actualField - 1]);

    fieldCounter++;

    if (fieldCounter < sequence.length) {
      actualField = sequence[fieldCounter];
      actualFieldId = changeActualId();
      window.setTimeout(showField, 500);
    }
  }

  /** returns the id of the actual field
   * @return {String} the id of the actual field
   */
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
  }

  showField();
}
