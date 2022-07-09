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
function can be manipulated with [reverse], [spread], [unspread], [wrap],
[unwrap]. [reverse] flips the order of parameters, [spread] spreads the first
array parameter of a function, [unspread] combines all parameters into the first
parameter (array), [wrap] adds ignored parameters to the left/right of a
function's parameters, and [unwrap] removes common prefix and suffix parameters
to a function (by passing known constant values as prefix/suffix). If you want
some **functional behavior**, [compose], [composeRight], [curry], and
[curryRight] can be used. [composeRight] is also known as [pipe-forward
operator] or [function chaining]. If you are unfamiliar, [Haskell] is a great
purely functional language, and there is great [haskell beginner guide] to learn
from.

To control invocation **time** of a function, use [delay]. A function can be
**rate controlled** with [limitUse], [debounce], [debounceEarly], [throttle],
[throttleEarly]. [limitUse] controls the number of times a function can be
called, and is useful when you want to enforce a function to be called only
*once*, the first n times (*before*), or *after* n times. [debounce] and
[debounceEarly] prevent the invocation of a function during **hot** periods
(when there are too many calls), and can be used for example to issue AJAX
request after user input has stopped (for certain delay time). [throttle] and
[throttleEarly] can be used to limit the rate of invocation of a function, and
can be used for example to minimize system usage when a user is [constantly
refreshing a webpage]. Except [limitUse], all *rate/time control* methods can be
*flushed* (`flush()`) to invoke the target function immediately, or *cleared*
(`clear()`) to disable invocation of the target function.

In addition, [is], [signature], [name], [parameters], and [arity] obtain
metadata (about) information on an async function. To attach a `this` to a
function, use [bind]. A few generic async functions are also included: [SLEEP].

This package is available in both *Node.js* and *Web* formats. The web format is
exposed as `extra_async_function` standalone variable and can be loaded from
[jsDelivr CDN].

[async function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[result asynchronously]: https://exploringjs.com/impatient-js/ch_async-functions.html#async-constructs
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

  asyncFunction.parameters(async (x, y) => x+y);
  // → [ 'x', 'y' ]
}
example1();
```

<br>
<br>


## Index

| Property | Description |
|  ----  |  ----  |
| [SLEEP] | Sleep for specified duration. |
|  |  |
| [is] | Check if value is an async function. |
| [signature] | Get the signature of a function. |
| [name] | Get the name of a function. |
| [parameters] | Get the parameter names of a function. |
| [arity] | Get the number of parameters of a function. |
|  |  |
| [bind] | Generate a function with bound this-object, and optional prefix arguments. |
|  |  |
| [negate] | Generate a result-negated version of an async function. |
|  |  |
| [memoize] | Generate result-cached version of a function. |
|  |  |
| [reverse] | Generate a parameter-reversed version of a function. |
| [spread] | Generate a (first) parameter-spreaded version of a function. |
| [unspread] | Generate a (first) parameter-collapsed version of a function. |
| [wrap] | Generate a parameter-wrapped version of a function. |
| [unwrap] | Generate a parameter-unwrapped version of a function. |
|  |  |
| [compose] | Compose async functions together, in applicative order. |
| [composeRight] | Compose async functions together, such that result is piped forward. |
| [curry] | Generate curried version of a function. |
| [curryRight] | Generate right-curried version of a function. |
|  |  |
| [delay] | Generate delayed version of a function. |
|  |  |
| [limitUse] | Generate limited-use version of a function. |
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


[![](https://img.youtube.com/vi/vzfy4EKwG_Y/maxresdefault.jpg)](https://www.youtube.com/watch?v=vzfy4EKwG_Y)<br>


[SLEEP]: https://nodef.github.io/extra-async-function/modules.html#SLEEP
[is]: https://nodef.github.io/extra-async-function/modules.html#is
[signature]: https://nodef.github.io/extra-async-function/modules.html#signature
[name]: https://nodef.github.io/extra-async-function/modules.html#name
[parameters]: https://nodef.github.io/extra-async-function/modules.html#parameters
[arity]: https://nodef.github.io/extra-async-function/modules.html#arity
[bind]: https://nodef.github.io/extra-async-function/modules.html#bind
[negate]: https://nodef.github.io/extra-async-function/modules.html#negate
[memoize]: https://nodef.github.io/extra-async-function/modules.html#memoize
[reverse]: https://nodef.github.io/extra-async-function/modules.html#reverse
[spread]: https://nodef.github.io/extra-async-function/modules.html#spread
[unspread]: https://nodef.github.io/extra-async-function/modules.html#unspread
[wrap]: https://nodef.github.io/extra-async-function/modules.html#wrap
[unwrap]: https://nodef.github.io/extra-async-function/modules.html#unwrap
[compose]: https://nodef.github.io/extra-async-function/modules.html#compose
[composeRight]: https://nodef.github.io/extra-async-function/modules.html#composeRight
[curry]: https://nodef.github.io/extra-async-function/modules.html#curry
[curryRight]: https://nodef.github.io/extra-async-function/modules.html#curryRight
[delay]: https://nodef.github.io/extra-async-function/modules.html#delay
[limitUse]: https://nodef.github.io/extra-async-function/modules.html#limitUse
[debounce]: https://nodef.github.io/extra-async-function/modules.html#debounce
[debounceEarly]: https://nodef.github.io/extra-async-function/modules.html#debounceEarly
[throttle]: https://nodef.github.io/extra-async-function/modules.html#throttle
[throttleEarly]: https://nodef.github.io/extra-async-function/modules.html#throttleEarly
