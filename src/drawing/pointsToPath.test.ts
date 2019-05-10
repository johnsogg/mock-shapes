import { pointsToPath } from './pointsToPath';

it('converts a line segment', () => {
  expect(pointsToPath([[0, 0], [1, 2]])).toBe('M0 0 L1 2');
});

it('converts a sequence of points', () => {
  expect(pointsToPath([[10, 10], [1, 2], [2, 4], [3, 6], [4, 8]])).toBe(
    'M10 10 L1 2 L2 4 L3 6 L4 8',
  );
});

it('converts a sequence of points to a closed path', () => {
  expect(pointsToPath([[10, 10], [1, 2], [2, 4], [3, 6], [4, 8]], true)).toBe(
    'M10 10 L1 2 L2 4 L3 6 L4 8 z',
  );
});
