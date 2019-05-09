export type Point = [number, number];

export const pointsToPath = (points: Point[], closed = false) => {
  const pathStr = points
    .map((pt, i) => (i === 0 ? `M${pt[0]} ${pt[1]}` : `L${pt[0]} ${pt[1]}`))
    .join(" ");
  return `${pathStr}${closed ? " z" : ""}`;
};
