import { Point } from '../drawing/geometry';
import { randomInRange } from './rnd';

export interface GenerateRectangleConfig {
  widthRange: [number, number];
  heightRange: [number, number];
}
export const generateRectangle = ({
  widthRange,
  heightRange,
}: GenerateRectangleConfig) => {
  const width = randomInRange(widthRange[0], widthRange[1]);
  const height = randomInRange(heightRange[0], heightRange[1]);
  const points: Point[] = [[0, 0], [width, 0], [width, height], [0, height]];
  return points;
};
