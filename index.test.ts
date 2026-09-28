import {assertEquals} from "@std/assert";
import * as xasyncfn from "./index.ts"
import {
  ARGUMENTS,
  NOOP,
  IDENTITY,
  COMPARE,
  negate,
  memoize,
  compose,
  composeRight,
} from "./index.ts";




// CONFIG
jest.retryTimes(3);
jest.setTimeout(15000);
// - https://stackoverflow.com/a/71599782/1413259
// - https://stackoverflow.com/a/49864436/1413259




// 1. Basic tests.
Deno.test("example1", async () => {
  let a;
  a = xasyncfn.composeRight(async (x: number) => await x*x, async (x: number) => await x+2);
  assertEquals(await a(10), 102);
  // → 102

  a = xasyncfn.curry(async (x: number, y: number) => await x+y);
  assertEquals(await a(2)(3), 5);
  // → 7

  a = xasyncfn.unspread(async (...xs: number[]) => Math.max(...xs));
  assertEquals(await a([2, 3, 1]), 3);
  // → 1.25
});




// CONSTANTS
// =========

Deno.test("ARGUMENTS", async () => {
  var a = await ARGUMENTS(1, 2);
  expect(a).toStrictEqual([1, 2]);
  var a = await ARGUMENTS("a", Promise.resolve("b"));
  expect(a).toStrictEqual(["a", "b"]);
});


Deno.test("NOOP", async () => {
  var a = await NOOP(1, 2);
  expect(a).toBeUndefined();
  var a = await NOOP("a", Promise.resolve("b"));
  expect(a).toBeUndefined();
});


Deno.test("IDENTITY", async () => {
  var a = await IDENTITY(1);
  expect(a).toBe(1);
  var b = await IDENTITY(Promise.resolve("a"));
  expect(b).toBe("a");
});


Deno.test("COMPARE", async () => {
  var a = await COMPARE(1, 2);
  expect(a).toBe(-1);
  var a = await COMPARE(2, 2);
  expect(a).toBe(0);
  var a = await COMPARE(3, 2);
  expect(a).toBe(1);
  var a = await COMPARE("a", Promise.resolve("b"));
  expect(a).toBe(-1);
});




// METHODS (CUSTOM)
// ================

// RESULT MANIPULATION
// -------------------

Deno.test("negate", async () => {
  var fn = negate(isFinite);
  expect(await fn(Infinity)).toBe(true);
  expect(await fn(1)).toBe(false);
  var fn = negate(isNaN);
  expect(await fn(1)).toBe(true);
  expect(await fn(Promise.resolve(NaN))).toBe(false);
});




// RESULT CACHING
// --------------

Deno.test("memoize.1", async () => {
  var calls = 0;
  function factorialRec(n: number) {
    if (n<=1) return 1;
    return n * factorialRec(n-1);
  }
  async function factorial(n: number) {
    ++calls;
    return factorialRec(n);
  }
  var fn = memoize(factorial);
  expect(await fn(3)).toBe(6);
  expect(await fn(4)).toBe(24);
  expect(await fn(5)).toBe(120);
  expect(await fn(3)).toBe(6);
  expect(await fn(4)).toBe(24);
  expect(await fn(5)).toBe(120);
  expect(calls).toBe(3);
});


Deno.test("memoize.2", async () => {
  var calls = 0;
  async function hypot(x: number, y: number) {
    ++calls;
    return Math.hypot(x, y);
  }
  async function resolver(x: number, y: number) {
    return 4093*y + x;  // a hash
  }
  var fn = memoize(hypot, resolver);
  expect(await fn(3,  4)).toBe(5);
  expect(await fn(6,  8)).toBe(10);
  expect(await fn(5, 12)).toBe(13);
  expect(await fn(3,  4)).toBe(5);
  expect(await fn(6,  8)).toBe(10);
  expect(await fn(5, 12)).toBe(13);
  expect(calls).toBe(3);
});
// - https://en.wikipedia.org/wiki/Integer_triangle




// FUNCTIONAL BEHAVIOUR
// --------------------

Deno.test("compose", async () => {
  var fn = compose();
  expect(await fn()).toBeUndefined();
  var fn = compose(Math.sqrt, async x => Math.abs(x));
  expect(await fn(-64)).toBe(8);    // Math.sqrt(Math.abs(-64))
  var fn = compose(Math.sqrt, Math.min);
  expect(await fn(22, 9)).toBe(3);  // Math.sqrt(Math.min(22, 9))
});


Deno.test("composeRight", async () => {
  let fn;
  fn = composeRight();
  assertEquals(await fn(), undefined);
  fn = composeRight(async (x: number) => await Math.abs(x), Math.sqrt);
  assertEquals(await fn(-64), 8);    // Math.sqrt(Math.abs(-64))
  fn = composeRight(Math.min, Math.sqrt);
  assertEquals(await fn(22, 9), 3);  // Math.sqrt(Math.min(22, 9))
});
