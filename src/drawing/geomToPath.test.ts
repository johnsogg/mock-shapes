import {
  aabbPath,
  aabbSize,
  pointsToPath,
  shapeToPath,
  translatePath,
  toOrigin,
} from './geomToPath';

it('converts a line segment to path string', () => {
  expect(pointsToPath([[0, 0], [1, 2]])).toBe('M0 0 L1 2');
});

it('converts a sequence of points to path string', () => {
  expect(pointsToPath([[10, 10], [1, 2], [2, 4], [3, 6], [4, 8]])).toBe(
    'M10 10 L1 2 L2 4 L3 6 L4 8',
  );
});

it('converts a sequence of points to a closed path string', () => {
  expect(pointsToPath([[10, 10], [1, 2], [2, 4], [3, 6], [4, 8]], true)).toBe(
    'M10 10 L1 2 L2 4 L3 6 L4 8 z',
  );
});

it('converts a shape (outline only) to a path string', () => {
  expect(shapeToPath([[[10, 10], [1, 2], [2, 4], [3, 6], [4, 8]]])).toBe(
    'M10 10 L1 2 L2 4 L3 6 L4 8 z',
  );
});

it('converts a shape with a hole into a path string', () => {
  expect(
    shapeToPath([
      [[0, 0], [10, 0], [10, 10], [0, 10]],
      [[2, 2], [8, 2], [8, 8], [2, 8]],
    ]),
  ).toBe('M0 0 L10 0 L10 10 L0 10 z M2 2 L8 2 L8 8 L2 8 z');
});

it('calculates correct aabb for a Path', () => {
  expect(aabbPath([[10, 10], [1, 2], [2, 4], [3, 6], [4, 8]])).toEqual({
    ptMin: [1, 2],
    ptMax: [10, 10],
  });
});

it('calculates correct aabb size', () => {
  expect(aabbSize({ ptMin: [7, 10], ptMax: [20, 15] })).toEqual({
    width: 13,
    height: 5,
  });
});

it('translates a path correctly', () => {
  expect(
    translatePath({
      path: [[10, 10], [1, 2], [2, 4], [3, 6], [4, 8]],
      dx: -10,
      dy: 4,
    }),
  ).toEqual([[0, 14], [-9, 6], [-8, 8], [-7, 10], [-6, 12]]);
});

it('translates a path to the origin correctly', () => {
  expect(toOrigin([[10, 10], [1, 2], [2, 4], [3, 6], [4, 8]])).toEqual([
    [9, 8],
    [0, 0],
    [1, 2],
    [2, 4],
    [3, 6],
  ]);
});
