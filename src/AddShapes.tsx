import React, { useState, useCallback } from 'react';
import { Shape, Path } from './drawing/geometry';
import { MAX_NUM_SHAPES } from './App';

export const AddShapes: React.FC<{
  shapes: Shape[];
  setShapes: (shapes: Shape[]) => void;
  chooseShape: () => Path | null;
}> = ({ shapes, setShapes, chooseShape }) => {
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
  }, [chooseShape, numShapes, setShapes, shapes]);

  const clearShapes = useCallback(() => {
    setShapes([]);
  }, [setShapes]);

  const incrementNumShapes = useCallback(() => {
    setNumShapes(Math.min(numShapes + 1, MAX_NUM_SHAPES));
  }, [numShapes]);

  const decrementNumShapes = useCallback(() => {
    setNumShapes(Math.max(0, numShapes - 1));
  }, [numShapes]);
  return (
    <>
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
    </>
  );
};
