import { Path } from '../drawing/geometry';
import { rotatePath, toOrigin } from '../drawing/geomToPath';
import { pickRandom, randomIntegerInRange } from './rnd';
import { Omit } from '../App';

export type TetrisForm = 'square' | 'T' | 'Z1' | 'Z2' | 'L1' | 'L2' | 'I';

export interface GenerateTetrisConfig {
  type: 'tetris';
  unit: number;
  rotate: number | 'random' | 'none';
  form: TetrisForm | 'random';
}

type TetrisCfgNoType = Omit<GenerateTetrisConfig, 'type'>;

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
        radians: cardinalAngles[randomIntegerInRange(0, 3)],
      }),
    );
  }
  return points;
};

export const generateTetrisSquare = ({ unit, rotate }: TetrisCfgNoType) => {
  const { b } = tetrisGrid(unit);
  const points = [[0, 0], [0, b], [b, b], [b, 0]] as Path;
  return maybeRotate(points, rotate);
};

export const generateTetrisT = ({ unit, rotate }: TetrisCfgNoType) => {
  const { a, b, c } = tetrisGrid(unit);
  const points = [
    [a, 0],
    [b, 0],
    [b, a],
    [c, a],
    [c, b],
    [0, b],
    [0, a],
    [a, a],
  ] as Path;
  return maybeRotate(points, rotate);
};

export const generateTetrisZ1 = ({ unit, rotate }: TetrisCfgNoType) => {
  const { a, b, c } = tetrisGrid(unit);
  const points = [
    [a, 0],
    [c, 0],
    [c, a],
    [b, a],
    [b, b],
    [0, b],
    [0, a],
    [a, a],
  ] as Path;
  return maybeRotate(points, rotate);
};

export const generateTetrisZ2 = ({ unit, rotate }: TetrisCfgNoType) => {
  const { a, b, c } = tetrisGrid(unit);
  const points = [
    [0, 0],
    [b, 0],
    [b, a],
    [c, a],
    [c, b],
    [a, b],
    [a, a],
    [0, a],
  ] as Path;
  return maybeRotate(points, rotate);
};

export const generateTetrisL1 = ({ unit, rotate }: TetrisCfgNoType) => {
  const { a, b, c } = tetrisGrid(unit);
  const points = [[a, 0], [b, 0], [b, c], [0, c], [0, b], [a, b]] as Path;
  return maybeRotate(points, rotate);
};

export const generateTetrisL2 = ({ unit, rotate }: TetrisCfgNoType) => {
  const { a, b, c } = tetrisGrid(unit);
  const points = [[0, 0], [a, 0], [a, b], [b, b], [b, c], [0, c]] as Path;
  return maybeRotate(points, rotate);
};

export const generateTetrisI = ({ unit, rotate }: TetrisCfgNoType) => {
  const { a, d } = tetrisGrid(unit);
  const points = [[0, 0], [a, 0], [a, d], [0, d]] as Path;
  return maybeRotate(points, rotate);
};

export const generateTetrisShape = ({
  unit,
  rotate,
  form,
}: TetrisCfgNoType): Path => {
  switch (form) {
    case 'random': {
      const randomForm = pickRandom<TetrisForm>([
        'square',
        'T',
        'Z1',
        'Z2',
        'L1',
        'L2',
        'I',
      ]);
      return generateTetrisShape({ unit, rotate, form: randomForm });
    }
    case 'square':
      return generateTetrisSquare({ unit, rotate, form: 'square' });
    case 'T':
      return generateTetrisT({ unit, rotate, form: 'T' });
    case 'Z1':
      return generateTetrisZ1({ unit, rotate, form: 'Z1' });
    case 'Z2':
      return generateTetrisZ2({ unit, rotate, form: 'Z2' });
    case 'L1':
      return generateTetrisL1({ unit, rotate, form: 'L1' });
    case 'L2':
      return generateTetrisL2({ unit, rotate, form: 'L2' });
    case 'I':
      return generateTetrisI({ unit, rotate, form: 'I' });
    default: {
      return generateTetrisShape({ unit, rotate, form: 'random' });
    }
  }
};
