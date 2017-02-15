'use strict';

var assert = require('assert');
var colors = require('colors/safe');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var board = [];
var solution = '';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (var i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (var i = 0; i < 4; i++) {
    var randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
  // your code here
  var solutionArray = solution.split('');
  var guessArray = guess.split('');
  var correctLetterLocations = 0;
  var correctLetters = 0;
  // checking for the solution and logging a win if the solution is equal to the array
  // ++ adds one to the variable
  for (var i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }
  // comparing to see if there any correct spaces in the solution array and logging it
  for (var i = 0; i < solutionArray.length; i++) {
    // the guess arrary is checked against the solution at the index of the guessArray at i.
    var targetIndex = solutionArray.indexOf(guessArray[i]);
    // check to see if that index is in the array and then retun it to null to prevent duplicate returns
    if (targetIndex > -1) {
      correctLetters++;
      solutionArray[targetIndex] = null;
    }
  }
  return (correctLetterLocations + '-' + correctLetters);
}

function checkForWin() {
  winMesage();
}

function mastermind(guess) {
  // your code here
  solution = 'abcd';
  if (guess === solution) {
    checkForWin();
    // console.log('penis');
    return (' ')
    //check to see if the board is at a legnth of 10 or more and then log it as a loss and display the solution
  } else if (board.length === 10) {
    return ('You ran out of Turns! The solution was' + ' ' + solution)
  } else {
    //generate a hint based on the positions of the pieces
    var hint = generateHint(solution, guess)
    console.log(generateHint(solution, guess));
    board.push(guess + ' ' + hint)
    return ('Guess again.')
  }
}

function winMesage() {
  rl.question('You Won! Play Again?', function (answer3) {
    if (answer3 === 'yes' || answer3 === 'y') {
      console.log('have fun!')
      getPrompt();
    } else {
      console.log('Later');
      process.exit()
    }
  });
}

function getPrompt() {
  rl.question('guess: ', (guess) => {
    console.log(mastermind(guess));
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#mastermind()', function () {
    it('should register a guess and generate hints', function () {
      solution = 'abcd';
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', function () {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', function () {
    it('should generate hints', function () {
      assert.equal(generateHint('abcd', 'abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', function () {
      assert.equal(generateHint('abcd', 'aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
