export enum EPolymorphicShape {
  Rectangle,
  Circle,
}

/**
 * Note It's often necessary to iterate over the enum constants. Again, in typescript that means we have to explicitly declare them in something iterable.
 *
 *    Again I wish the transpiler would generate one of these for us.
 */
export const CPolymorphicShape: Array<
  /**
   * Important that we are iterating over the keys. The values of an enum are typically numbers.
   */
  keyof typeof EPolymorphicShape
> = ['Rectangle', 'Circle'];

export interface IPolymorphicShape {
  shapeDesignator: keyof typeof EPolymorphicShape;
  getWidth(): number;
  accept: <T>(visitor: VPolymorphicShape<T>) => T;
}

export interface VPolymorphicShape<T> {
  visitSquare: (shape: SPolymorphicShapeRectangle) => T;
  visitCircle: (shape: SPolymorphicShapeCircle) => T;
}

export interface SPolymorphicShapeRectangle extends IPolymorphicShape {
  shapeDesignator: 'Rectangle';
  halfWidth: number;
  halfHeight: number;
}
export interface SPolymorphicShapeCircle extends IPolymorphicShape {
  shapeDesignator: 'Circle';
  radius: number;
}

/**
 * Typescript likes type unions for type inference rather than just the interface. This is a bit redundant. But It's an artifact of the typescript interface information not being available at runtime.
 *
 * It seems like the transpiler could do this for us.
 *
 * I like to re-declare the interface here so I can use the type union exclusively, and ensure that any inherited obligation declared on the interface is available to any consumers of the type union. Declaring the "&" here, means that I don't have to do it everywhere else. I can just pass around "UPolymorphicShape"
 */
export type UPolymorphicShape = IPolymorphicShape &
  (SPolymorphicShapeRectangle | SPolymorphicShapeCircle);

export function getWidthX2(shape: UPolymorphicShape): number {
  return shape.getWidth() * 2;
}

export function printInfo(shape: UPolymorphicShape): void {
  switch (shape.shapeDesignator) {
    case 'Rectangle':
      // No casting needed thanks to type inference.
      console.log(
        `width: ${shape.halfWidth * 2}; height: ${shape.halfHeight * 2}`
      );
      break;
    case 'Circle':
      console.log(`radius: ${shape.radius};`);
      break;
  }
}

export function printInfoUsingPrintingVisitor(shape: UPolymorphicShape): void {
  shape.accept({
    visitSquare: (shape: SPolymorphicShapeRectangle): void => {
      console.log(
        `width: ${shape.halfWidth * 2}; height: ${shape.halfHeight * 2}`
      );
    },
    visitCircle: (shape: SPolymorphicShapeCircle): void => {
      console.log(`radius: ${shape.radius};`);
    },
  });
}
