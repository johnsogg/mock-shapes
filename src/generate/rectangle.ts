import { Point } from '../drawing/geometry';
import { randomBetween } from './rnd';

export interface GenerateRectangleConfig {
  widthRange: [number, number];
  heightRange: [number, number];
}
export const generateRectangle = ({
  widthRange,
  heightRange,
}: GenerateRectangleConfig) => {
  const width = randomBetween(widthRange[0], widthRange[1]);
  const height = randomBetween(heightRange[0], heightRange[1]);
  const points: Point[] = [[0, 0], [width, 0], [width, height], [0, height]];
  return points;
};
