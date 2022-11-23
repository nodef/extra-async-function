import {
  Resolver,
  COMPARE as COMPARE_SYNC,
} from "extra-function";




// RE-EXPORTS
// ==========

export {
  // METHODS (BUILTIN)
  // About
  name,
  length,
  length as arity,
  // Binding
  bind,
  // Invocation
  call,
  apply,
  // METHODS (CUSTOM)
  // About
  isAsync as is,
  isGenerator,
  // Context
  contextify,
  decontextify,
  // Result caching
  Resolver,
  // Parameter manipulation
  reverse,
  spread,
  unspread,
  attach,
  attachRight,
  reverse     as flip,
  attach      as partial,
  attachRight as partialRight,
  // Functional behavior
  curry,
  curryRight,
  // Time control
  InvocationControl,
  defer,
  delay,
  // Rate control (count)
  restrict,
  restrictOnce,
  restrictBefore,
  restrictAfter,
  restrictOnce   as once,
  restrictBefore as before,
  restrictAfter  as after,
  // Rate control (time)
  debounce,
  debounceEarly,
  throttle,
  throttleEarly,
} from "extra-function";




// CONSTANTS
// =========

/**
 * Resolve all the arguments passed, as an array.
 * @param args arguments
 * @returns [...args]
 */
export function ARGUMENTS(...args: any[]): Promise<any[]> {
  return Promise.all(args);
}


/**
 * Do nothing.
 * @param args arguments (ignored)
 */
export async function NOOP(...args: any[]): Promise<void> {}


/**
 * Return the same (first) value.
 * @param v a value
 * @returns v
 */
export async function IDENTITY<T>(v: T): Promise<T> {
  return v;
}


/**
 * Compare two async values.
 * @param a an async value
 * @param b another async value
 * @returns a<b: -1, a=b: 0, a>b: 1
 */
export async function COMPARE<T>(a: T | Promise<T>, b: T | Promise<T>): Promise<number> {
  return COMPARE_SYNC(await a, await b);
}




// METHODS (CUSTOM)
// ================

// RESULT MANIPULATION
// -------------------

/**
 * Generate a result-negated version of an async function.
 * @param x an async function
 * @returns (...args) => !x(...args)
 */
export function negate(x: Function): Function {
  return async (...args: any[]) => !(await x(...args));
}




// RESULT CACHING
// --------------

/**
 * Generate result-cached version of an async function.
 * @param x an async function
 * @param fr async resolver ((...args) => unique key) [IDENTITY]
 * @param cache result cache [Map()]
 */
export function memoize(x: Function, fr: Resolver=null, cache: Map<any, any>=null): Function {
  var fr    = fr || IDENTITY;
  var cache = cache || new Map();
  return async (...args: any[]) => {
    var k = await fr(...args);
    if (cache.has(k)) return cache.get(k);
    var v = await x(...args);
    cache.set(k, v);
    return v;
  };
}
// - https://www.npmjs.com/package/memoizee
// - https://www.npmjs.com/package/memoizerific




// FUNCTIONAL BEHAVIOUR
// --------------------

/**
 * Compose async functions together, in applicative order.
 * @param xs async functions (f, g)
 * @returns (f o g), or f(g(x))
 */
export function compose(...xs: Function[]): Function {
  return composeRight(...xs.reverse());
}
// - https://en.wikipedia.org/wiki/Function_composition
// - http://learnyouahaskell.com/higher-order-functions
// - https://www.npmjs.com/package/compose-function


/**
 * Compose async functions together, such that result is piped forward.
 * @param xs async functions (f, g)
 * @returns (f ▷ g), or g(f(x))
 */
export function composeRight(...xs: Function[]): Function {
  return async (...args: any[]) => {
    if (xs.length===0) return;
    var a = await xs[0](...args);
    for (var i=1, I=xs.length; i<I; i++)
      a = await xs[i](a);
    return a;
  };
}
// - https://stackoverflow.com/questions/1457140/haskell-composition-vs-fs-pipe-forward-operator
// - https://www.npmjs.com/package/chain-function




// RATE CONTROL (TIME)
// -------------------

// TODO: Is a generator function better for this?
// function backoffRetryRec(x: Function, args: any[], err: any, n: number, N: number, t: number, T: number, tf: number): void {
//   if (N>=0 && n>=N) throw err;
//   if (T>=0 && t>=T) throw err;
//   try { return x(...args, err); }
//   catch(e) { setTimeout(() => backoffRetryRec(x, args, e, n+1, N, t*tf, T, tf), t); }
// }

/**
 * TODO: Generate exponential-backoff-retried version of a function.
 * @param x a function
 * @param N maximum retries (-1 ⇒ unlimited)
 * @param t initial retry time (1 ms)
 * @param T maximum retry time [-1 ⇒ none]
 * @param tf retry time factor [2]
 */
// function backoffRetry(x: Function, N: number, t: number, T: number=-1, tf: number=2): Function {
//   return (...args: any[]) => backoffRetryRec(x, args, null, 0, N, t, T, tf);
// }
// - TODO
