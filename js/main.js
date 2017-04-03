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
let selectedFields = [];
let isRunning = false;
let isStrict = false;

let enteredFieldsCounter = 0;

function startNewGame() {
  pickNewField();
  roundCounter++;
  displayRoundCounter();
}

function pickNewField() {
  const newFieldNumber = Math.floor((Math.random() * 4) + 1);
  selectedFields.push(newFieldNumber);
}

function displayRoundCounter() {
  $('#round-counter').html(roundCounter);
}

function gameController(enteredField) {
  enteredFieldsCounter++;

}
