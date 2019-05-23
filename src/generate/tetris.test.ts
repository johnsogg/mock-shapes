import { tetrisGrid, generateTetrisSquare } from './tetris';
import { Path, Point } from './geometry';

const tolerantEquals = (a: number, b: number, precision: number) => {
  const expectedDiff = Math.pow(10, -precision) / 2;
  const receivedDiff = Math.abs(a - b);
  return receivedDiff < expectedDiff;
};

const pathIncludesPoint = (path: Path, pt: Point) => {
  return (
    path.filter(
      pathItem =>
        tolerantEquals(pathItem[0], pt[0], 5) &&
        tolerantEquals(pathItem[1], pt[1], 5),
    ).length > 0
  );
};

const pathIncludesPoints = (actual: Path, expected: Path) => {
  if (actual.length !== expected.length) return false;
  return actual.reduce(
    (acc, val) => acc && pathIncludesPoint(expected, val),
    true,
  );
};

it('compares floats tolerantly', () => {
  expect(tolerantEquals(0.3, 0.1 + 0.2, 5)).toBeTruthy();
});

it('detects presence of point in a path', () => {
  expect(
    pathIncludesPoint(
      [[0.3, 0.99991], [0.333333333, 0.09090909090909091], [10, 10]],
      [0.1 + 0.2, 0.99991001],
    ),
  ).toBeTruthy();
  expect(
    pathIncludesPoint(
      [[0.3, 0.99991], [0.333333333, 0.09090909090909091], [10, 10]],
      [0.1 + 0.2, 0.999],
    ),
  ).toBeFalsy();
});

it('detects presense of all points in one path in another path', () => {
  expect(
    pathIncludesPoints(
      [[0.3, 0.99991], [0.333333333, 0.09090909090909091], [10, 10]],
      [[0.3, 0.99991], [0.333333333, 0.09090909090909091], [10, 10]],
    ),
  ).toBeTruthy();

  expect(
    pathIncludesPoints(
      [[0.3, 0.999999], [0.333333333, 0.09090909090909091], [10, 10]],
      [[0.1 + 0.2, 1.0], [0.333333333, 1 / 11], [10.00000001, 10]],
    ),
  ).toBeTruthy();

  expect(
    pathIncludesPoints(
      [[0.3, 0.999999], [0.333333333, 0.09090909090909091], [10, 10]],
      [[0.3, 0.99991], [0.333333333, 0.09090909090909091], [10, 11]],
    ),
  ).toBeFalsy();
});

it('generates tetris grid correctly', () => {
  expect(tetrisGrid(10)).toEqual({ a: 10, b: 20, c: 30, d: 40 });
  expect(tetrisGrid(19)).toEqual({ a: 19, b: 38, c: 57, d: 76 });
});

it('generates tetris square correctly', () => {
  expect(
    generateTetrisSquare({ unit: 10, rotate: 'none', form: 'square' }),
  ).toEqual([[0, 0], [0, 20], [20, 20], [20, 0]]);

  // form should not matter
  expect(generateTetrisSquare({ unit: 19, rotate: 'none', form: 'T' })).toEqual(
    [[0, 0], [0, 38], [38, 38], [38, 0]],
  );

  // rotate 90 degrees and use floating point tolerance when checking equality
  expect(
    pathIncludesPoints(
      generateTetrisSquare({ unit: 10, rotate: Math.PI / 2, form: 'square' }),
      [[0, 0], [0, 20], [20, 20], [20, 0]],
    ),
  ).toBeTruthy();
});
