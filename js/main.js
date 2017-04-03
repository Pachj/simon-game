/**
 * Created by Henry on 03.04.17.
 */
$(document).ready(function() {
  $('#start').click(function() {
    if (!isRunning) {
      startNewGame();
    }
  });

  $('.game-field').click(function() {
    gameController(parseInt($(this).attr('value')));
  });
});

let roundCounter = 0;
let sequence = [2];
let isRunning = false;
let isStrict = false;

let enteredFieldsCounter = 0;

function startNewGame() {
  pickNewField();
  roundCounter++;
  displayRoundCounter();
  showSequence();
}

function pickNewField() {
  const newFieldNumber = Math.floor((Math.random() * 4) + 1);
  sequence.push(newFieldNumber);
}

function displayRoundCounter() {
  $('#round-counter').html(roundCounter);
}

function gameController(enteredField) {
  enteredFieldsCounter++;

}

function showSequence() {
  let actualField = sequence[0];
  let actualFieldId = changeActualId();
  let fieldCounter = 0;

  function showField() {
    const highlightColors = ['#36FF18', '#0ADFFF', '#FF00B6', '#FF1C42'];

    $(actualFieldId).css('background-color', highlightColors[actualField - 1]);
    window.setTimeout(resetField, 1000);
  }

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
