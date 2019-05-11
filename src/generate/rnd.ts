export const randomBetween = (low: number, high: number) => {
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

interface CumulativeDistributionParam {
  name: string;
  weight: number;
}
interface CumulativeDistributionReturn {
  name: string;
  max: number;
}
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
  return { cdf: total.ret, max: total.cursor + 1 };
};
