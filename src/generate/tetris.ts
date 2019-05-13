import { rotatePath, toOrigin } from '../drawing/geomToPath';
import { Point, Path } from '../drawing/geometry';
import { randomInRange } from './rnd';

type TetrisForm = 'square' | 'T' | 'Z1' | 'Z2' | 'L1' | 'L2' | 'I';

export interface GenerateTetrisConfig {
  unit: number;
  rotate: number | 'random' | 'none';
  form: TetrisForm | 'random';
}

export const cardinalAngles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];

export const tetrisGrid = (unit: number) => {
  return { a: 1 * unit, b: 2 * unit, c: 3 * unit, d: 4 * unit };
};

const maybeRotate = (points: Path, rotate: number | 'random' | 'none') => {
  if (typeof rotate === 'number') {
    return toOrigin(rotatePath({ path: points, radians: rotate }));
  }
  if (rotate === 'random') {
    return toOrigin(
      rotatePath({
        path: points,
        radians: cardinalAngles[randomInRange(0, 3)],
      }),
    );
  }
  return points;
};

export const generateTetrisSquare = ({
  unit,
  rotate,
}: GenerateTetrisConfig) => {
  const { b } = tetrisGrid(unit);
  const points = [[0, 0], [0, b], [b, b], [b, 0]] as Point[];
  return maybeRotate(points, rotate);
};
