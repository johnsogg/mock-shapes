import React, { useState, useCallback } from 'react';
import { Draw } from './drawing/Draw';
import { Shape } from './drawing/geometry';
import { generateRectangle } from './generate/rectangle';
import {
  cumulativeDistribution,
  pickFromCdf,
  randomIntegerInRange,
} from './generate/rnd';
import { generateRegularPolygon } from './generate/regularPolygon';
import { generateTetrisShape } from './generate/tetris';
import { generateIrregularPolygon } from './generate/irregularPolyon';

const MAX_NUM_SHAPES = 200;

// ordered but otherwise independent weights for the different shape generators.
const pdf = [
  {
    name: 'polygon',
    weight: 1,
  },
  {
    name: 'irregular polygon',
    weight: 1,
  },
  {
    name: 'rectangle',
    weight: 1,
  },
  {
    name: 'tetris',
    weight: 1,
  },
];

// the above probability distribution function turned into a CDF.
const { cdf, bound } = cumulativeDistribution(pdf);

const chooseShape = () => {
  const generator = pickFromCdf(cdf, bound);
  switch (generator) {
    case 'polygon':
      return generateRegularPolygon({
        numSides: randomIntegerInRange(3, 8),
        radius: randomIntegerInRange(5, 25),
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
};

const App: React.FC = () => {
  const [shapes, setShapes] = useState([] as Shape[]);
  const [numShapes, setNumShapes] = useState(3);

  const validateNumShapes = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value === '') {
        setNumShapes(0);
      }
      const parsed = Number.parseInt(ev.target.value, 10);
      if (!Number.isNaN(parsed)) {
        setNumShapes(Math.min(parsed, MAX_NUM_SHAPES));
      }
    },
    [],
  );
  const addShape = useCallback(() => {
    const newVal = [...shapes];
    for (let i = 0; i < numShapes; i++) {
      const newShape = chooseShape();
      if (newShape == null) {
        return;
      }
      newVal.push([newShape]);
    }
    setShapes(newVal);
  }, [numShapes, shapes]);

  const clearShapes = useCallback(() => {
    setShapes([]);
  }, []);

  const incrementNumShapes = useCallback(() => {
    setNumShapes(Math.min(numShapes + 1, MAX_NUM_SHAPES));
  }, [numShapes]);

  const decrementNumShapes = useCallback(() => {
    setNumShapes(Math.max(0, numShapes - 1));
  }, [numShapes]);

  return (
    <>
      <h1>Mock Shapes Demo</h1>
      <input type="text" value={numShapes} onChange={validateNumShapes} />
      <input
        className="safe"
        type="button"
        onClick={decrementNumShapes}
        value="-"
        disabled={numShapes === 0}
      />
      <input
        className="safe"
        type="button"
        onClick={incrementNumShapes}
        value="+"
        disabled={numShapes === MAX_NUM_SHAPES}
      />
      <input
        className="cta"
        type="button"
        onClick={addShape}
        disabled={numShapes === 0}
        value={`Add ${numShapes} Shapes`}
      />
      <input
        className="safe"
        type="button"
        onClick={clearShapes}
        value="Clear"
      />
      <Draw shapes={shapes} />
    </>
  );
};

export default App;
