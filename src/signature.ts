import {signature as funcSignature} from 'extra-function';

/**
 * Gives signature of function.
 * @param x an async function
 * @returns name(parameters)
 */
function signature(x: Function): string {
  return funcSignature(x);
}
export default signature;
