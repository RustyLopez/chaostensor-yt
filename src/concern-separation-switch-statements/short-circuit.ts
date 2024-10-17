/**
 * Avoid returning from a switch statement, unless all branches issue returns, ensuring the switch statement is the sole concern of the function.
 *
 * When returns are mixed with breaks, you are mixing concerns. The switch statement's concern is polymorphic state visitor or strategy selection. That's it. It
 * should not be aware of whether or not the function that encapsulates it, is done processing when the switch statement is done.  And developers may often
 * overlook the return statements buried in the many branches of switch statements.
 */

import {UPolymorphicShape} from '../polymorphics/example';

/**
 *
 */
export function doWorkNonIdeal(e: UPolymorphicShape): boolean {
  switch (e.shapeDesignator) {
    case 'Rectangle':
      if (e.halfWidth < 1) {
        /**
         * we are mixing concern of functional flow with polymorphic evaluation here.
         *  Better to yield a result, and let the method return when it will.
         */
        return false;
      }
      break;
    case 'Circle':
      break;
  }
  console.log('doing extra stuff here');
  return true;
}

/**
 * This method has the unintended side effect of having the result be mutable longer than it needs to be.
 */
export function doWorkStillNotIdeal(e: UPolymorphicShape) {
  let result: boolean;
  switch (e.shapeDesignator) {
    case 'Rectangle':
      if (e.halfWidth < 1) {
        result = false;
      } else {
        result = true;
      }
      break;
    case 'Circle':
      result = true;
      break;
  }

  result = false; // undoing of work above is possible
  console.log('doing extra stuff here');
  return result;
}

/**
 * This approach has the advantage of not having a variable with mutability scoped beyond that which is necessary.
 *
 * We allow return in the switch statement here because there is no other return.
 *
 * The compiler will therefore enforce that each branch returns and the pattern
 * is clear to future developers.
 *
 *
 */
export function doWorkIdeal(e: UPolymorphicShape) {
  const result: boolean = (() => {
    switch (e.shapeDesignator) {
      case 'Rectangle':
        if (e.halfWidth < 1) {
          return false;
        }
        return true;
      case 'Circle':
        return true;
    }
  })();
  console.log('doing extra stuff here');
  return result;
}
