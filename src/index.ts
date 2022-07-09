import {IDENTITY} from "extra-function";
import {Resolver} from "extra-function";




// CONSTANTS
// =========

/**
 * Sleep for specified duration.
 * @param t sleep time (ms)
 */
export function SLEEP(t: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, t));
}




// METHODS
// =======

// ABOUT
// -----

export {isAsync as is} from "extra-function";
export {signature}  from "extra-function";
export {name}       from "extra-function";
export {parameters} from "extra-function";
export {arity}      from "extra-function";




// BINDING THIS
// ------------

export {bind} from "extra-function";




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

export {Resolver}  from "extra-function";


/**
 * Generate result-cached version of a function.
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




// PARAMETER MANIPULATION
// ----------------------

export {reverse}  from "extra-function";
export {spread}   from "extra-function";
export {unspread} from "extra-function";
export {wrap}     from "extra-function";
export {unwrap}   from "extra-function";




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


export {curry}      from "extra-function";
export {curryRight} from "extra-function";




// TIME CONTROL
// ------------

export {InvocationControl} from "extra-function";
export {delay} from "extra-function";




// RATE CONTROL
// ------------

export {limitUse}      from "extra-function";
export {debounce}      from "extra-function";
export {debounceEarly} from "extra-function";
export {throttle}      from "extra-function";
export {throttleEarly} from "extra-function";


// TODO: Is a generator function better for this?
function backoffRetryRec(x: Function, args: any[], err: any, n: number, N: number, t: number, T: number, tf: number): void {
  if (N>=0 && n>=N) throw err;
  if (T>=0 && t>=T) throw err;
  try { return x(...args, err); }
  catch(e) { setTimeout(() => backoffRetryRec(x, args, e, n+1, N, t*tf, T, tf), t); }
}

/**
 * TODO: Generate exponential-backoff-retried version of a function.
 * @param x a function
 * @param N maximum retries (-1 ⇒ unlimited)
 * @param t initial retry time (1 ms)
 * @param T maximum retry time [-1 ⇒ none]
 * @param tf retry time factor [2]
 */
function backoffRetry(x: Function, N: number, t: number, T: number=-1, tf: number=2): Function {
  return (...args: any[]) => backoffRetryRec(x, args, null, 0, N, t, T, tf);
}
// - TODO
