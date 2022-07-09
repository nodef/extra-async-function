const asyncFunction = require('./');
const assert = require('assert');


// 1. Basic tests.
async function example1() {
  var a = asyncFunction.composeRight(async x => x*x, async x => x+2);
  assert.equal(await a(10), 102);
  // → 102

  var a = asyncFunction.curry(async (x, y) => x+y);
  assert.equal(await a(2)(3), 5);
  // → 7

  var a = asyncFunction.unspread(async (...xs) => Math.max(...xs));
  assert.equal(await a([2, 3, 1]), 3);
  // → 1.25

  var a = asyncFunction.parameters(async (x, y) => x+y);
  assert.deepEqual(a, ['x', 'y']);
  // → [ 'x', 'y' ]
}
example1();
