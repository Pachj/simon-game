/**
 * Created by Henry on 03.04.17.
 */
$(document).ready(function() {
  $('#start').click(function() {
    gameController();
  });
});

let roundCounter = 0;
let selectedFields = [];

function gameController() {
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
