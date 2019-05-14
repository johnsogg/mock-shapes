import { randomInRange, randomFloatInRange } from './rnd';
import { Point } from '../drawing/geometry';
import { toOrigin } from '../drawing/geomToPath';

export interface GenerateIrregularPolygonConfig {
  numSides: [number, number];
  radius: [number, number];
}

export const generateIrregularPolygon = ({
  numSides,
  radius,
}: GenerateIrregularPolygonConfig) => {
  // pick number of sides from our range
  const sides = randomInRange(numSides[0], numSides[1]);

  // each side corresponds to a vertex with a random angle
  // we chop up the angle space by the number of sides and let
  // each angle be chosen randomly from its associated range.
  const angles: number[] = [];
  const step = (Math.PI * 2) / sides;
  for (let i = 0; i < sides; i++) {
    angles.push(randomFloatInRange(step * i, step * (i + 1)));
  }

  // for each angle, create a vertex whose distance from the
  // origin is picked randomly from the radius range
  const points = angles.map(angle => {
    const r = randomFloatInRange(radius[0], radius[1]);
    return [r * Math.cos(angle), r * Math.sin(angle)] as Point;
  });

  return toOrigin(points);
};
