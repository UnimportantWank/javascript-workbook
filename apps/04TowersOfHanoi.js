'use strict';

var assert = require('assert');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

var moves = 0;

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  // Your code here

  // popping an item from the startStack into the endStack
  var block = stacks[startStack].pop();
  console.log('popped block', block);
  stacks[endStack].push(block);

  moves++;
  if (moves < 2) {
    console.log('you made ' + moves + " move")
  } else {
    console.log('you made ' + moves + " moves");
  }
}

function isLegal(startStack, endStack) {
  // Your code here
  //checking to see if you can move
  if (stacks[startStack].length === 0) {
    return false;
  }
  //moving the piece if the move is legal
  if (stacks[endStack].length === 0) {
    return true;
  }

  var startBlock = stacks[startStack][stacks[startStack].length - 1]
  var endBlock = stacks[endStack][stacks[endStack].length - 1]
  if (startBlock < endBlock) {
    return true;
  } else {
    return false;
    console.log('illegal move!');
  }
}

//a,b, or c
//numbers
//capital letters
//strings vs variables
function isInputValid(startStack, endStack) {
  //convert to lowercase and check for right input
  let start = startStack.toLowerCase();
  let end = endStack.toLowerCase();
  if (start === 'a' || start === 'b' || start === 'c')
    if (end === 'a' || end === 'b' || end === 'c') {
      return true;
    }
  return false;
}



function towersOfHanoi(startStack, endStack) {
  // Your code here
  if (isInputValid(startStack, endStack)) {
    getPrompt();
  } else {
    console.log('not a valid selection, try again');
    return false;
  }

  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
  }
  if (checkForWin()) {
    console.log('You won!');
    process.exit();
  }

}

function isDefined() {
  return (towersOfHanoi[startStack][endStack] === ' ');
}


function checkForWin(startStack, endStack) {
  // Your code here
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    return true;
    console.log('You won!');
  } else {
    return false;
  }
}


function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}
// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', function () {
    it('should be able to move a block', function () {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, {
        a: [4, 3, 2],
        b: [1],
        c: []
      });
    });
  });

  describe('#isLegal()', function () {
    it('should not allow an illegal move', function () {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', function () {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', function () {
    it('should detect a win', function () {
      stacks = {
        a: [],
        b: [4, 3, 2, 1],
        c: []
      };
      assert.equal(checkForWin(), true);
      stacks = {
        a: [1],
        b: [4, 3, 2],
        c: []
      };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();

}
