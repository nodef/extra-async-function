import {name as funcName} from 'extra-function';

/**
 * Gives name of function.
 * @param x an async function
 */
function name(x: Function): string {
  return funcName(x);
}
export default name;
