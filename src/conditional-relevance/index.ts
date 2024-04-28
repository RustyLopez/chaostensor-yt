/**
 *
 * A "Merged" contract is not a simpler contract.
 *
 * There is inherent complexity in many problems. Hiding that is not simplifying it.
 *
 * Taking an inherently complex problem, and making it less declarative, more opaque and harder to understand, makes the problem more complex.
 *
 * Use Declarative Polymorphism, and Encapsulation to eliminate Conditional Relevance
 */

///////////// This applies to methods

/**
 * What is a behavior modifier, if not a just a way to hide your methods from the compiler and other engineers.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function opaqueMethodsAAndAWithSecret(
  favoriteColor: string,
  hiddenSecretyActualMethodSelector: boolean,
  x: number
) {
  /**
   * Note how these branches, at compile time, appear to now apply to all callers, even though the caller will always select exactly one pathway at runtime.
   * This increases the "perceived" or "felt" or "parse" complexity", which has just as much impact to the next engineer, as increasing actual complexity.
   */
  if (hiddenSecretyActualMethodSelector) {
    console.log(favoriteColor + '.secret');
  } else {
    console.log(favoriteColor);
  }
}

// Rather, declare the distinct behaviors, with distinct methods.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function declarativeMethodA(favoriteColor: string) {
  console.log(favoriteColor);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function declarativeMethodAWithSecret(favoriteColor: string) {
  console.log(favoriteColor + '.secret');
}

///////////// Models

enum ShapeOrColor {
  shape,
  color,
}
/**
 * Conditional relevance or conditional requirement is a red flag. If you have this in your object, than any code that processes your object will have to have
 * conditional code to evaluate it, anywhere the object exists. Or the code will have to 'trust' that the object it has been passed, was cleared upstream as
 * being a specific type.
 *
 *
 * Whereas, if you use declarative polymorphism, then you can do your type inference once, at the process boundary, and pass the inferred type to downstream
 * code, which can declare that it only supports a given concrete subtype. There is no "trust" and there is no duplication of type inference.
 */

interface FavoriteColorOrFavoriteShapeAsOpaquePolymorphism {
  shapeOrColor: ShapeOrColor;
  /**
   * NOTE how this field is only relevant if #shapeOrColor === 'color'
   * NOTE how this field is  required if #shapeOrColor === 'color', but we had to declare it as optional, because it can be null IF shapeOrColor is 'shape'
   */
  color?: string;
  /**
   * NOTE how this field is only relevant if #shapeOrColor === 'shape'
   * NOTE how this field is  required if #shapeOrColor === 'shape', but we had to declare it as optional, because it can be null IF shapeOrColor is 'color'
   */
  shapeName?: string;
  /**
   * NOTE how this field is only relevant if #shapeOrColor === 'shape'
   * NOTE how this field is  required if #shapeOrColor === 'shape', but we had to declare it as optional, because it can be null IF shapeOrColor is 'color'
   *
   */
  shapeDefinition?: {
    coolnessOfTheShape: number;
  };
}

function methodProcessingOpaquePolymorphic(
  favoriteColorOrShape: FavoriteColorOrFavoriteShapeAsOpaquePolymorphism
) {
  switch (favoriteColorOrShape.shapeOrColor) {
    case ShapeOrColor.shape:
      /**
       * We attempt to mitigate the error with assertions, but now the developer has to actually read our implementation to understand our contract.
       *
       * And the compiler can't protect us.
       *
       */
      if (!favoriteColorOrShape.shapeDefinition) {
        throw new Error('shapeDefinition required for favorite shape');
      }
      console.log(favoriteColorOrShape.shapeDefinition.coolnessOfTheShape);
      break;
    case ShapeOrColor.color:
      if (!favoriteColorOrShape.color) {
        throw new Error('color required for favorite color');
      }
      console.log(favoriteColorOrShape.color);
      break;
  }
}

/**
 *
 * Compiles fine, but throws an  error at runtime, but the compiler CAN and should have been able to notify us that shapeDefinition was required, before we deployed this to int, fired up our automation test sweet and ran our test.
 *
 * And importantly it should have communicated the requirement to the developer before they even hit the compile button. Saving them time, and cognitive load.
 */
methodProcessingOpaquePolymorphic({
  shapeOrColor: ShapeOrColor.shape,
  shapeName: 'square',
  /**
   * Note that we left off shapeDefinition, which our implementation requires, but this will still pass through the compiler without even a warning.
   * Compilers can't handle 'runtime determined relevance' unless it is declared. The compiler cannot protect us here, unless we declared the polymorphic field relevance.
   */
});

// Rather, declare the polymorphism

/**
 * NOTE that it's now clear, at a glance, and even to the compiler, what fields are compatible with the 'color' type designator.
 */
interface FavoriteColor {
  shapeOrColor: ShapeOrColor.color;
  /**
   * Now we can be very clear, that for colors this is required. This helps not only developers read your code, but can protect against bugs.
   */
  color: string;
}

/**
 * NOTE that it's now clear, at a glance, and even to the compiler, what fields are compatible with the 'shape' type designator.
 */
interface FavoriteShape {
  shapeOrColor: ShapeOrColor.shape;
  shapeName: string;
  shapeDefinition: {
    coolnessOfTheShape: number;
  };
}

type FavoriteColorOrFavoriteShapeAsDeclarativePolymorphism =
  | FavoriteColor
  | FavoriteShape;

function methodProcessingDeclarativePolymorphic(
  favoriteColorOrShape: FavoriteColorOrFavoriteShapeAsDeclarativePolymorphism
) {
  switch (favoriteColorOrShape.shapeOrColor) {
    case ShapeOrColor.shape:
      // The compiler now knows that shape definition is required here
      console.log(favoriteColorOrShape.shapeDefinition.coolnessOfTheShape);
      break;
    case ShapeOrColor.color:
      // can throw an undefined reference exception at runtime, but the error SHOULD be identifiable at compile time.
      console.log(favoriteColorOrShape.color);
      break;
  }
}

/**
 *
 * Compiles fine, but throws an  error at runtime, but the compiler CAN and should have been able to notify us that shapeDefinition was required, before we deployed this to int, fired up our automation test sweet and ran our test.
 *
 * And importantly it should have communicated the requirement to the developer before they even hit the compile button. Saving them time, and cognitive load.
 */
methodProcessingDeclarativePolymorphic({
  shapeOrColor: ShapeOrColor.shape,
  shapeName: 'square',
  /**
   * NOTE that we now get a proper compile error! It's clear that for a shape, we need to provide the extra detail
   */
});

/////////////// NOTE this applies to ANY CONTRACT and ANY INTERFACE
// Pr
// Database Schema 
// Swagger API Definitions
// Command Line Interfaces
// USER INTERFACES

// EVEN THE PHYSICAL INTERFACES OF THE REAL WORLD!!!!
// For example the air controls in your car! If a control is not compatible with the value of some other control, it should ideally not even be accessible or
// mutable until that value of the other control is set!!
