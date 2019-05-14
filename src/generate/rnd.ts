// Give a random integer in the range [low, high].
export const randomIntegerInRange = (low: number, high: number) => {
  const ret = Math.floor(Math.random() * (high - low + 1)) + low;
  return ret;
};

// Give a random float in the range [low, high).
export const randomFloatInRange = (low: number, high: number) => {
  const ret = Math.random() * (high - low) + low;
  return ret;
};

// A named, weighted thing.
interface CumulativeDistributionParam {
  name: string;
  weight: number;
}
// A named thing with a maximum value.
interface CumulativeDistributionReturn {
  name: string;
  max: number;
}

// Given a bunch of independently weighted things, produce a CDF where each named thing has an
// upper bound. The results are in the same order as the input.
export const cumulativeDistribution = (
  params: CumulativeDistributionParam[],
) => {
  const initialAcc = {
    ret: [] as CumulativeDistributionReturn[],
    cursor: -1,
  };
  const total = params.reduce(
    (acc, val) =>
      val.weight > 0
        ? {
            ret: [...acc.ret, { name: val.name, max: acc.cursor + val.weight }],
            cursor: acc.cursor + val.weight,
          }
        : acc,
    initialAcc,
  );
  return { cdf: total.ret, bound: total.cursor + 1 };
};

// Pick an item from the CDF at random using the assigned weights.
export const pickFromCdf = (
  cdf: CumulativeDistributionReturn[],
  bound: number,
) => {
  const chance = randomIntegerInRange(0, bound - 1);
  for (let i = 0; i < cdf.length; i++) {
    if (cdf[i].max >= chance) {
      return cdf[i].name;
    }
  }

  console.warn("pickFromCdf couldn't find anything to return"); // eslint-disable-line
  return '';
};

// Pick one of the elements from the list at random (uniform distribution).
export const pickRandom = <T>(list: T[]) => {
  return list[randomIntegerInRange(0, list.length - 1)];
};
