/**
 * Waits for given duration.
 * @param t wait time [0 ms]
 */
async function WAIT(t: number=0) {
  return new Promise(fres => setTimeout(fres, t));
}
export default WAIT;
