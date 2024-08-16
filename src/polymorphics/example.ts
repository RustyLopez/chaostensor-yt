export enum EPolymorphicShape {
  Square,
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
> = ['Square', 'Circle'];

export interface IPolymorphicShape {
  shapeDesignator: keyof typeof EPolymorphicShape;
  getWidth(): number;
  accept: <T>(visitor: VPolymorphicShape<T>) => T;
}

export interface VPolymorphicShape<T> {
  visitSquare: (shape: SPolymorphicShapeSquare) => T;
  visitCircle: (shape: SPolymorphicShapeCircle) => T;
}

export interface SPolymorphicShapeSquare extends IPolymorphicShape {
  shapeDesignator: 'Square';
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
  (SPolymorphicShapeSquare | SPolymorphicShapeCircle);

export function getWidthX2(shape: UPolymorphicShape): number {
  return shape.getWidth() * 2;
}

export function printInfo(shape: UPolymorphicShape): void {
  switch (shape.shapeDesignator) {
    case 'Square':
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
    visitSquare: (shape: SPolymorphicShapeSquare): void => {
      console.log(
        `width: ${shape.halfWidth * 2}; height: ${shape.halfHeight * 2}`
      );
    },
    visitCircle: (shape: SPolymorphicShapeCircle): void => {
      console.log(`radius: ${shape.radius};`);
    },
  });
}
