import { Point } from '../drawing/geometry';
import { randomIntegerInRange } from './rnd';

export interface GenerateRectangleConfig {
  widthRange: [number, number];
  heightRange: [number, number];
}

// Make a rectangle with random width/height whose sides are parallel to the coordinate plane.
export const generateRectangle = ({
  widthRange,
  heightRange,
}: GenerateRectangleConfig) => {
  const width = randomIntegerInRange(widthRange[0], widthRange[1]);
  const height = randomIntegerInRange(heightRange[0], heightRange[1]);
  const points: Point[] = [[0, 0], [width, 0], [width, height], [0, height]];
  return points;
};
