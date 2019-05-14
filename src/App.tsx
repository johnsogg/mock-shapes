import React, { useState, useCallback } from 'react';
import { Draw } from './drawing/Draw';
import { Shape } from './drawing/geometry';
import { generateRectangle } from './generate/rectangle';
import {
  cumulativeDistribution,
  pickFromCdf,
  randomInRange,
} from './generate/rnd';
import { generateRegularPolygon } from './generate/regularPolygon';
import { generateTetrisShape } from './generate/tetris';
import { generateIrregularPolygon } from './generate/irregularPolyon';

const pdf = [
  {
    name: 'polygon',
    weight: 0,
  },
  {
    name: 'irregular polygon',
    weight: 1,
  },
  {
    name: 'rectangle',
    weight: 0,
  },
  {
    name: 'tetris',
    weight: 0,
  },
];

const App: React.FC = () => {
  const [shapes, setShapes] = useState([] as Shape[]);

  const { cdf, bound } = cumulativeDistribution(pdf);

  const chooseShape = useCallback(() => {
    const generator = pickFromCdf(cdf, bound);
    switch (generator) {
      case 'polygon':
        return generateRegularPolygon({
          numSides: randomInRange(3, 8),
          radius: randomInRange(5, 25),
        });
      case 'irregular polygon':
        return generateIrregularPolygon({
          numSides: [3, 12],
          radius: [5, 50],
        });
      case 'rectangle':
        return generateRectangle({
          widthRange: [5, 50],
          heightRange: [5, 50],
        });
      case 'tetris':
        return generateTetrisShape({
          unit: 20,
          rotate: 'random',
          form: 'random',
        });
      default:
        console.warn('invalid generator name:', generator); // eslint-disable-line
        return null;
    }
  }, [bound, cdf]);

  const addShape = useCallback(() => {
    const newShape = chooseShape();
    if (newShape == null) {
      return;
    }
    const newVal = [...shapes].concat([[newShape]]);
    setShapes(newVal);
  }, [chooseShape, shapes]);

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
