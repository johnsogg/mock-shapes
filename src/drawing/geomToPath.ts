import { Point, Shape, Aabb, Path, Size } from './geometry';

export const pointsToPath = (points: Point[], closed = false) => {
  const pathStr = points
    .map((pt, i) => (i === 0 ? `M${pt[0]} ${pt[1]}` : `L${pt[0]} ${pt[1]}`))
    .join(' ');
  return `${pathStr}${closed ? ' z' : ''}`;
};

export const shapeToPath = (shape: Shape) => {
  const pathStr = shape.map(points => pointsToPath(points, true)).join(' ');
  return pathStr;
};

export const aabbPath = (path: Path) => {
  const initialAabb: Aabb = {
    ptMin: [Infinity, Infinity],
    ptMax: [-Infinity, -Infinity],
  };

  const ret = path.reduce((acc, val) => {
    return {
      ptMax: [
        Math.max(acc.ptMax[0], val[0]),
        Math.max(acc.ptMax[1], val[1]),
      ] as [number, number],
      ptMin: [
        Math.min(acc.ptMin[0], val[0]),
        Math.min(acc.ptMin[1], val[1]),
      ] as [number, number],
    };
  }, initialAabb);
  return ret;
};

export const aabbSize = (aabb: Aabb): Size => {
  return {
    width: aabb.ptMax[0] - aabb.ptMin[0],
    height: aabb.ptMax[1] - aabb.ptMin[1],
  };
};
