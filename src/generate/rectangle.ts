import { Point } from '../drawing/geometry';
import { toOrigin } from '../drawing/geomToPath';
import { randomBetween } from './rnd';

export interface RectangleConfig {
  widthRange: [number, number];
  heightRange: [number, number];
}
export const generateRectangle = ({
  widthRange,
  heightRange,
}: RectangleConfig) => {
  const points: Point[] = [];
  const width = randomBetween(widthRange[0], widthRange[1]);
  const height = randomBetween(heightRange[0], heightRange[1]);
  points.push([0, 0]);
  points.push([width, 0]);
  points.push([width, height]);
  points.push([0, height]);
  return points;
};
