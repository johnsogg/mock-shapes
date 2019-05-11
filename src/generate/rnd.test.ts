import { cumulativeDistribution } from './rnd';

it('correctly computes a bucketed cumulative distribution', () => {
  const params = [
    { name: 'polygon', weight: 4 },
    { name: 'rectangle', weight: 0 },
    { name: 'circle', weight: 3 },
    { name: 'tetris', weight: 6 },
  ];
  expect(cumulativeDistribution(params)).toEqual([
    {
      name: 'polygon',
      max: 3,
    },
    {
      name: 'circle',
      max: 6,
    },
    {
      name: 'tetris',
      max: 12,
    },
  ]);
});
