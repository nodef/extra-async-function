import {parameters as funcParameters} from 'extra-function';

/**
 * Gives parameter names of function.
 * @param x an async function
 */
function parameters(x: Function): string[] {
  return funcParameters(x);
}
export default parameters;
