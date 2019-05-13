import { Point, Shape, Aabb, Path, Size } from './geometry';

// Provides an SVG path string for the given path.
export const pointsToPath = (points: Point[], closed = false) => {
  const pathStr = points
    .map((pt, i) => (i === 0 ? `M${pt[0]} ${pt[1]}` : `L${pt[0]} ${pt[1]}`))
    .join(' ');
  return `${pathStr}${closed ? ' z' : ''}`;
};

// Provides an SVG path string for the given shape.
export const shapeToPath = (shape: Shape) => {
  const pathStr = shape.map(points => pointsToPath(points, true)).join(' ');
  return pathStr;
};

// Gives the axis aligned bounding box of the given path.
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

// Gives the width and height of the given axis aligned bounding box.
export const aabbSize = (aabb: Aabb): Size => {
  return {
    width: aabb.ptMax[0] - aabb.ptMin[0],
    height: aabb.ptMax[1] - aabb.ptMin[1],
  };
};

// Translates the given path by adding the supplied dx, dy to
// each point.
export const translatePath = ({
  path,
  dx,
  dy,
}: {
  path: Path;
  dx: number;
  dy: number;
}): Path => {
  return path.map(pt => [pt[0] + dx, pt[1] + dy]);
};

// Translates all points in the path such that the resulting axis-aligned
// bounding box has its minimal point at the origin.
export const toOrigin = (path: Path): Path => {
  const aabb = aabbPath(path);
  return translatePath({ path, dx: -aabb.ptMin[0], dy: -aabb.ptMin[1] });
};

// Rotates all points in the path by the given amount about the origin.
export const rotatePath = ({
  path,
  radians,
}: {
  path: Path;
  radians: number;
}) => {
  return path.map(
    pt => [pt[0] * Math.cos(radians), pt[1] * Math.sin(radians)] as Point,
  );
};
