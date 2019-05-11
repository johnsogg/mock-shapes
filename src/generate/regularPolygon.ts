import { Point } from '../drawing/geometry';
import { toOrigin } from '../drawing/geomToPath';

export interface GenerateRegularPolygonConfig {
  numSides: number;
  radius: number;
}
export const generateRegularPolygon = ({
  numSides,
  radius,
}: GenerateRegularPolygonConfig) => {
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
