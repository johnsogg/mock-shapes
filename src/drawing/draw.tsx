import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Star, Text } from 'react-konva';
import { KonvaEventObject } from 'konva/types/types';


const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
  if (e == null || e.target == null ) return;
  e.target.setAttrs({
    shadowOffset: {
      x: 15,
      y: 15
    },
    scaleX: 1.1,
    scaleY: 1.1
  });
};

const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
  e.target.to({
    duration: 0.5,
    easing: Konva.Easings.ElasticEaseOut,
    scaleX: 1,
    scaleY: 1,
    shadowOffsetX: 5,
    shadowOffsetY: 5
  });
};

export const Draw: React.FC = () => {
  return (      
  <Stage width={window.innerWidth} height={window.innerHeight}>
    <Layer>
      <Text text="Try to drag a star" />
      {[...Array(10).keys()].map(i => (
        <Star
          key={i}
          x={Math.random() * window.innerWidth}
          y={Math.random() * window.innerHeight}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          fill="#89b717"
          opacity={0.8}
          draggable
          rotation={Math.random() * 180}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </Layer>
  </Stage>);
}