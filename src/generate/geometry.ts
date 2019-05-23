export type Point = [number, number];

export type Path = Point[];

// Shape[0] must be defined, and it should be interpreted as the outer path. Remaining entries
// are interpreted as holes.
export type Shape = Path[];

export interface Aabb {
  ptMin: Point;
  ptMax: Point;
}

export interface Size {
  width: number;
  height: number;
}
