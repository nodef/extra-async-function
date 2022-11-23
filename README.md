A collection of ways for transforming async functions.<br>
📦 [Node.js](https://www.npmjs.com/package/extra-async-function),
🌐 [Web](https://www.npmjs.com/package/extra-async-function.web),
📜 [Files](https://unpkg.com/extra-async-function/),
📰 [JSDoc](https://nodef.github.io/extra-async-function/),
📘 [Wiki](https://github.com/nodef/extra-async-function/wiki/).

An [async function] is a function that delivers its [result asynchronously]
(through [Promise]). This package is an *variant* of [extra-function], and
includes methods for transforming *async functions*. The **result** of an async
function can be manipulated with [negate]. If a *pure* async function is
expensive, its results can **cached** with [memoize]. **Parameters** of a
function can be manipulated with [reverse], [spread], [unspread]. [reverse]
flips the order of parameters, [spread] spreads the first array parameter of a
function, and [unspread] combines all parameters into the first parameter
(array). If you want some **functional behavior**, [compose], [composeRight],
[curry], and [curryRight] can be used. [composeRight] is also known as
[pipe-forward operator] or [function chaining]. If you are unfamiliar, [Haskell]
is a great purely functional language, and there is great [haskell beginner
guide] to learn from.

To control invocation **time** of a function, use [delay]. A function can be
**rate controlled** with [debounce], [debounceEarly], [throttle],
[throttleEarly]. [debounce] and [debounceEarly] prevent the invocation of a
function during **hot** periods (when there are too many calls), and can be used
for example to issue AJAX request after user input has stopped (for certain
delay time). [throttle] and [throttleEarly] can be used to limit the rate of
invocation of a function, and can be used for example to minimize system usage
when a user is [constantly refreshing a webpage]. Except [restrict], all
*rate/time control* methods can be *flushed* (`flush()`) to invoke the target
function immediately, or *cleared* (`clear()`) to disable invocation of the
target function.

In addition, [is], [name], and [length] obtain metadata (about) information on
an async function. To attach a `this` to a function, use [bind]. A few generic
async functions are also included: [ARGUMENTS], [NOOP], [IDENTITY], [COMPARE].

This package is available in both *Node.js* and *Web* formats. The web format is
exposed as `extra_async_function` standalone variable and can be loaded from
[jsDelivr CDN].

[async function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[result asynchronously]: https://exploringjs.com/impatient-js/ch_async-functions.html#async-constructs
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[extra-function]: https://www.npmjs.com/package/extra-function
[pipe-forward operator]: https://stackoverflow.com/questions/1457140/haskell-composition-vs-fs-pipe-forward-operator
[function chaining]: https://www.npmjs.com/package/chain-function
[Haskell]: https://www.haskell.org
[haskell beginner guide]: http://learnyouahaskell.com
[constantly refreshing a webpage]: https://tenor.com/view/social-network-mark-zuckerberg-refresh-movie-jesse-eisenberg-gif-12095762
[jsDelivr CDN]: https://cdn.jsdelivr.net/npm/extra-async-function.web/index.js

> Stability: [Experimental](https://www.youtube.com/watch?v=L1j93RnIxEo).

<br>


```javascript
const asyncFunction = require('extra-async-function');
// import * as asyncFunction from "extra-async-function";
// import * as asyncFunction from "https://unpkg.com/extra-async-function/index.mjs"; (deno)

// 1. Basic tests.
async function example1() {
  var a = asyncFunction.composeRight(async x => x*x, async x => x+2);
  await a(10);
  // → 102

  var a = asyncFunction.curry(async (x, y) => x+y);
  await a(2)(3);
  // → 7

  var a = asyncFunction.unspread(async (...xs) => Math.max(...xs));
  await a([2, 3, 1]);
  // → 1.25
}
example1();
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [ARGUMENTS] | Resolve all the arguments passed, as an array. |
| [NOOP] | Do nothing. |
| [IDENTITY] | Return the same (first) value. |
| [COMPARE] | Compare two async values. |
|  |  |
| [name] | Get the name of a function. |
| [length] | Get the number of parameters of a function. |
|  |  |
| [bind] | Bind this-object, and optional prefix arguments to a function. |
|  |  |
| [call] | Invoke a function with specified this-object, and arguments provided individually. |
| [apply] | Invoke a function with specified this-object, and arguments provided as an array. |
|  |  |
| [is] | Check if value is an async function. |
| [isGenerator] | Check if value is a generator function. |
|  |  |
| [contextify] | Contextify a function by accepting the first parameter as this-object. |
| [decontextify] | Decontextify a function by accepting this-object as the first argument. |
|  |  |
| [negate] | Generate a result-negated version of an async function. |
|  |  |
| [memoize] | Generate result-cached version of an async function. |
|  |  |
| [reverse] | Generate a parameter-reversed version of a function. |
| [spread] | Generate a (first) parameter-spreaded version of a function. |
| [unspread] | Generate a (first) parameter-collapsed version of a function. |
| [attach] | Attach prefix arguments to leftmost parameters of a function. |
| [attachRight] | Attach suffix arguments to rightmost parameters of a function. |
|  |  |
| [compose] | Compose async functions together, in applicative order. |
| [composeRight] | Compose async functions together, such that result is piped forward. |
| [curry] | Generate curried version of a function. |
| [curryRight] | Generate right-curried version of a function. |
|  |  |
| [defer] | Generate deferred version of a function, that executes after the current stack has cleared. |
| [delay] | Generate delayed version of a function. |
|  |  |
| [restrict] | Generate restricted-use version of a function. |
| [restrictOnce] | Restrict a function to be used only once. |
| [restrictBefore] | Restrict a function to be used only upto a certain number of calls. |
| [restrictAfter] | Restrict a function to be used only after a certain number of calls. |
|  |  |
| [debounce] | Generate debounced version of a function. |
| [debounceEarly] | Generate leading-edge debounced version of a function. |
| [throttle] | Generate throttled version of a function. |
| [throttleEarly] | Generate leading-edge throttled version of a function. |

<br>
<br>


## References

- [MDN Web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [Lodash documentation](https://lodash.com/docs/4.17.15)
- [Underscore.js documentation](https://underscorejs.org/)
- [Function composition](https://en.wikipedia.org/wiki/Function_composition)
- [Debouncing and Throttling Explained Through Examples by David Corbacho](https://css-tricks.com/debouncing-throttling-explained-examples/)
- [Learn You a Haskell for Great Good!: Higher order functions by Miran Lipovaca](http://learnyouahaskell.com/higher-order-functions)
- [Haskell composition (.) vs F#'s pipe forward operator (|>)](https://stackoverflow.com/questions/1457140/haskell-composition-vs-fs-pipe-forward-operator)
- [memoizee package by Mariusz Nowak](https://www.npmjs.com/package/memoizee)
- [memoizerific package by @thinkloop](https://www.npmjs.com/package/memoizerific)
- [compose-function package by Christoph Hermann](https://www.npmjs.com/package/compose-function)
- [chain-function package by Jason Quense](https://www.npmjs.com/package/chain-function)
- [extra-function package by Subhajit Sahu](https://www.npmjs.com/package/extra-function)

<br>
<br>


[![](https://img.youtube.com/vi/pIQwho5EU8w/maxresdefault.jpg)](https://www.youtube.com/watch?v=pIQwho5EU8w)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
[![DOI](https://zenodo.org/badge/277720718.svg)](https://zenodo.org/badge/latestdoi/277720718)
[![Coverage Status](https://coveralls.io/repos/github/nodef/extra-async-function/badge.svg?branch=master)](https://coveralls.io/github/nodef/extra-async-function?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8e1e922c3b1ea166857b/test_coverage)](https://codeclimate.com/github/nodef/extra-async-function/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/8e1e922c3b1ea166857b/maintainability)](https://codeclimate.com/github/nodef/extra-async-function/maintainability)


[ARGUMENTS]: https://github.com/nodef/extra-async-function/wiki/ARGUMENTS
[NOOP]: https://github.com/nodef/extra-async-function/wiki/NOOP
[IDENTITY]: https://github.com/nodef/extra-async-function/wiki/IDENTITY
[COMPARE]: https://github.com/nodef/extra-async-function/wiki/COMPARE
[is]: https://github.com/nodef/extra-async-function/wiki/is
[name]: https://github.com/nodef/extra-async-function/wiki/name
[bind]: https://github.com/nodef/extra-async-function/wiki/bind
[negate]: https://github.com/nodef/extra-async-function/wiki/negate
[memoize]: https://github.com/nodef/extra-async-function/wiki/memoize
[reverse]: https://github.com/nodef/extra-async-function/wiki/reverse
[spread]: https://github.com/nodef/extra-async-function/wiki/spread
[unspread]: https://github.com/nodef/extra-async-function/wiki/unspread
[compose]: https://github.com/nodef/extra-async-function/wiki/compose
[composeRight]: https://github.com/nodef/extra-async-function/wiki/composeRight
[curry]: https://github.com/nodef/extra-async-function/wiki/curry
[curryRight]: https://github.com/nodef/extra-async-function/wiki/curryRight
[delay]: https://github.com/nodef/extra-async-function/wiki/delay
[debounce]: https://github.com/nodef/extra-async-function/wiki/debounce
[debounceEarly]: https://github.com/nodef/extra-async-function/wiki/debounceEarly
[throttle]: https://github.com/nodef/extra-async-function/wiki/throttle
[throttleEarly]: https://github.com/nodef/extra-async-function/wiki/throttleEarly
[length]: https://github.com/nodef/extra-async-function/wiki/length
[call]: https://github.com/nodef/extra-async-function/wiki/call
[apply]: https://github.com/nodef/extra-async-function/wiki/apply
[isGenerator]: https://github.com/nodef/extra-async-function/wiki/isGenerator
[contextify]: https://github.com/nodef/extra-async-function/wiki/contextify
[decontextify]: https://github.com/nodef/extra-async-function/wiki/decontextify
[attach]: https://github.com/nodef/extra-async-function/wiki/attach
[attachRight]: https://github.com/nodef/extra-async-function/wiki/attachRight
[defer]: https://github.com/nodef/extra-async-function/wiki/defer
[restrict]: https://github.com/nodef/extra-async-function/wiki/restrict
[restrictOnce]: https://github.com/nodef/extra-async-function/wiki/restrictOnce
[restrictBefore]: https://github.com/nodef/extra-async-function/wiki/restrictBefore
[restrictAfter]: https://github.com/nodef/extra-async-function/wiki/restrictAfter
