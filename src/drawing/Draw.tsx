import React from 'react';
import { Stage, Layer, Path } from 'react-konva';
import { Shape } from './geometry';
import { shapeToPath, aabbPath, aabbSize } from './geomToPath';

export const Draw: React.FC<{ shapes: Shape[] }> = ({ shapes }) => {
  let cursorX = 1;
  let cursorY = 1;
  let rowHeight = 0;
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {shapes.map((shape, idx) => {
          const aabb = aabbPath(shape[0]);
          const size = aabbSize(aabb);
          if (size.width + cursorX > window.innerWidth) {
            cursorX = 1;
            cursorY += rowHeight;
            rowHeight = 0;
          } else {
            rowHeight = Math.max(rowHeight, size.height);
          }
          const x = cursorX;
          const y = cursorY;
          cursorX += size.width;
          return <SegmentShape key={idx} x={x} y={y} shape={shape} />;
        })}
      </Layer>
    </Stage>
  );
};

// Generic shape with canned styling. User can only pass in the point list and optional origin data.
const SegmentShape: React.FC<{ shape: Shape; x?: number; y?: number }> = ({
  shape,
  x = 0,
  y = 0,
}) => <Path stroke="black" x={x} y={y} fill="cyan" data={shapeToPath(shape)} />;
