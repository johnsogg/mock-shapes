import { Point } from './geometry';
import { toOrigin } from './geomToPath';
import { randomIntegerInRange } from './rnd';
import { Omit } from './helpers';

export interface GenerateRegularPolygonConfig {
  type: 'polygon';
  numSides: number;
  radius: number;
}

export interface GenerateRegularPolygonKnobs {
  type: 'polygon';
  numSides: [number, number];
  radius: [number, number];
}

export const buildRegularPolygonConfigFromKnobs = (
  knobs: GenerateRegularPolygonKnobs,
) => {
  return {
    numSides: randomIntegerInRange(knobs.numSides[0], knobs.numSides[1]),
    radius: randomIntegerInRange(knobs.radius[0], knobs.radius[1]),
  };
};

// Make a regular N-gon whose sides are all the same given length.
export const generateRegularPolygon = ({
  numSides,
  radius,
}: Omit<GenerateRegularPolygonConfig, 'type'>) => {
  const points: Point[] = [];
  const step = (2 * Math.PI) / numSides;
  for (let i = 0; i < numSides; i++) {
    const angle = i * step;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    points.push([x, y]);
  }
  return toOrigin(points);
};
