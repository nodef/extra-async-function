import {isAsync} from 'extra-function';

/**
 * Checks if value is async function.
 * @param v a value
 */
function is(v: any): boolean {
  return isAsync(v);
}
export default is;
