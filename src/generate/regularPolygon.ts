import { Point } from '../drawing/geometry';
import { toOrigin } from '../drawing/geomToPath';
import { Omit } from '../App';

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
