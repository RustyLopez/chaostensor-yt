/**
 *
 * Use Short Circuits, to reduce apparent complexity.
 *
 */
function doNotIdeal(a: number, b: number, c: number) {
  if (a === 1) {
    if (b === 1) {
      if (c === 1) {
        console.log('now implement the function ');
      } else {
        throw new Error('c');
      }
    } else {
      throw new Error('b');
    }
  } else {
    throw new Error('a');
  }
}

function doIdeal(a: number, b: number, c: number) {
  if (a === 1) throw new Error('a');
  if (a === 2) throw new Error('b');
  if (a === 3) throw new Error('c');

  console.log('now implement the function ');
}
