import { cumulativeDistribution, randomInRange } from './rnd';

it('gives random numbers in the desired range', () => {
  const results: { [i: number]: number } = {};
  for (let i = 0; i < 100; i++) {
    const r = randomInRange(1, 4);
    expect(r <= 4).toBe(true) && expect(r >= 1).toBe(true);
    results[r] == null ? (results[r] = results[r] + 1) : (results[r] = 1);
  }
  expect(results[1] > 0).toBe(true);
  expect(results[2] > 0).toBe(true);
  expect(results[3] > 0).toBe(true);
  expect(results[4] > 0).toBe(true);
  expect(Object.keys(results).length).toBe(4);
});

it('correctly computes a bucketed cumulative distribution', () => {
  const params = [
    { name: 'polygon', weight: 4 },
    { name: 'rectangle', weight: 0 },
    { name: 'circle', weight: 3 },
    { name: 'tetris', weight: 6 },
  ];
  expect(cumulativeDistribution(params)).toEqual({
    bound: 13,
    cdf: [
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
    ],
  });
});
