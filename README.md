An [async function] is a function that delivers its [result asynchronously] (through [Promise]).<br>

▌
📦 [JSR](https://jsr.io/@nodef/extra-async-function),
📦 [NPM](https://www.npmjs.com/package/extra-async-function),
📰 [Docs](https://jsr.io/@nodef/extra-async-function/doc).

This package is an *variant* of [extra-function], and includes methods for
transforming *async functions*. The **result** of an async function can be
manipulated with [negate]. If a *pure* async function is expensive, its results
can **cached** with [memoize]. **Parameters** of a function can be manipulated
with [reverse], [spread], [unspread]. [reverse] flips the order of parameters,
[spread] spreads the first array parameter of a function, and [unspread]
combines all parameters into the first parameter (array). If you want some
**functional behavior**, [compose], [composeRight], [curry], and [curryRight]
can be used. [composeRight] is also known as [pipe-forward operator] or
[function chaining]. If you are unfamiliar, [Haskell] is a great purely
functional language, and there is great [haskell beginner guide] to learn from.

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

[async function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[result asynchronously]: https://exploringjs.com/impatient-js/ch_async-functions.html#async-constructs
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[extra-function]: https://www.npmjs.com/package/extra-function
[pipe-forward operator]: https://stackoverflow.com/questions/1457140/haskell-composition-vs-fs-pipe-forward-operator
[function chaining]: https://www.npmjs.com/package/chain-function
[Haskell]: https://www.haskell.org
[haskell beginner guide]: http://learnyouahaskell.com
[constantly refreshing a webpage]: https://tenor.com/view/social-network-mark-zuckerberg-refresh-movie-jesse-eisenberg-gif-12095762

<br>


```javascript
import * as xasyncfn from "jsr:@nodef/extra-async-function";

// 1. Basic tests.
var a = xasyncfn.composeRight(async x => x*x, async x => x+2);
await a(10);
// → 102

var a = xasyncfn.curry(async (x, y) => x+y);
await a(2)(3);
// → 7

var a = xasyncfn.unspread(async (...xs) => Math.max(...xs));
await a([2, 3, 1]);
// → 1.25
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


[![](https://raw.githubusercontent.com/qb40/designs/gh-pages/0/image/11.png)](https://wolfram77.github.io)<br>
[![ORG](https://img.shields.io/badge/org-nodef-green?logo=Org)](https://nodef.github.io)
![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-async-function)


[ARGUMENTS]: https://jsr.io/@nodef/extra-async-function/doc/~/ARGUMENTS
[NOOP]: https://jsr.io/@nodef/extra-async-function/doc/~/NOOP
[IDENTITY]: https://jsr.io/@nodef/extra-async-function/doc/~/IDENTITY
[COMPARE]: https://jsr.io/@nodef/extra-async-function/doc/~/COMPARE
[is]: https://jsr.io/@nodef/extra-async-function/doc/~/is
[name]: https://jsr.io/@nodef/extra-async-function/doc/~/name
[bind]: https://jsr.io/@nodef/extra-async-function/doc/~/bind
[negate]: https://jsr.io/@nodef/extra-async-function/doc/~/negate
[memoize]: https://jsr.io/@nodef/extra-async-function/doc/~/memoize
[reverse]: https://jsr.io/@nodef/extra-async-function/doc/~/reverse
[spread]: https://jsr.io/@nodef/extra-async-function/doc/~/spread
[unspread]: https://jsr.io/@nodef/extra-async-function/doc/~/unspread
[compose]: https://jsr.io/@nodef/extra-async-function/doc/~/compose
[composeRight]: https://jsr.io/@nodef/extra-async-function/doc/~/composeRight
[curry]: https://jsr.io/@nodef/extra-async-function/doc/~/curry
[curryRight]: https://jsr.io/@nodef/extra-async-function/doc/~/curryRight
[delay]: https://jsr.io/@nodef/extra-async-function/doc/~/delay
[debounce]: https://jsr.io/@nodef/extra-async-function/doc/~/debounce
[debounceEarly]: https://jsr.io/@nodef/extra-async-function/doc/~/debounceEarly
[throttle]: https://jsr.io/@nodef/extra-async-function/doc/~/throttle
[throttleEarly]: https://jsr.io/@nodef/extra-async-function/doc/~/throttleEarly
[length]: https://jsr.io/@nodef/extra-async-function/doc/~/length
[call]: https://jsr.io/@nodef/extra-async-function/doc/~/call
[apply]: https://jsr.io/@nodef/extra-async-function/doc/~/apply
[isGenerator]: https://jsr.io/@nodef/extra-async-function/doc/~/isGenerator
[contextify]: https://jsr.io/@nodef/extra-async-function/doc/~/contextify
[decontextify]: https://jsr.io/@nodef/extra-async-function/doc/~/decontextify
[attach]: https://jsr.io/@nodef/extra-async-function/doc/~/attach
[attachRight]: https://jsr.io/@nodef/extra-async-function/doc/~/attachRight
[defer]: https://jsr.io/@nodef/extra-async-function/doc/~/defer
[restrict]: https://jsr.io/@nodef/extra-async-function/doc/~/restrict
[restrictOnce]: https://jsr.io/@nodef/extra-async-function/doc/~/restrictOnce
[restrictBefore]: https://jsr.io/@nodef/extra-async-function/doc/~/restrictBefore
[restrictAfter]: https://jsr.io/@nodef/extra-async-function/doc/~/restrictAfter
