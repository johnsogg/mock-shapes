import React, { useState, useCallback } from 'react';
import { Draw } from './drawing/Draw';
import { Shape } from './drawing/geometry';
import { utahPoints } from './data/utah';
import { generateRectangle } from './generate/rectangle';
import {
  cumulativeDistribution,
  pickFromCdf,
  randomInRange,
} from './generate/rnd';
import { generateRegularPolygon } from './generate/regularPolygon';

const App: React.FC = () => {
  const [shapes, setShapes] = useState([[utahPoints], [utahPoints]] as Shape[]);

  const pdf = [
    {
      name: 'polygon',
      weight: 3,
    },
    {
      name: 'rectangle',
      weight: 2,
    },
  ];

  const { cdf, bound } = cumulativeDistribution(pdf);

  const chooseShape = () => {
    const generator = pickFromCdf(cdf, bound);
    switch (generator) {
      case 'polygon':
        return generateRegularPolygon({
          numSides: randomInRange(3, 8),
          radius: randomInRange(30, 170),
        });
      case 'rectangle':
        return generateRectangle({
          widthRange: [10, 400],
          heightRange: [50, 150],
        });
      default:
        console.warn('invalid generator name:', generator); // eslint-disable-line
        return null;
    }
  };

  const addShape = () => {
    const newShape = chooseShape();
    if (newShape == null) {
      return;
    }
    const newVal = [...shapes].concat([[newShape]]);
    setShapes(newVal);
  };

  const clearShapes = useCallback(() => {
    setShapes([]);
  }, []);

  return (
    <>
      <h1>Mock Shapes Demo</h1>
      <button onClick={addShape}>Add Shape</button>
      <button onClick={clearShapes}>Clear</button>
      <Draw shapes={shapes} />
    </>
  );
};

export default App;
