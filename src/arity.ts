import {arity as funcArity} from 'extra-function';

/**
 * Gives number of parameters.
 * @param x an async function
 */
function arity(x: Function): number {
  return funcArity(x);
}
export default arity;
