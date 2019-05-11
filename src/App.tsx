import React, { useState, useCallback } from 'react';
import { Draw } from './drawing/Draw';
import { Shape } from './drawing/geometry';
import { utahPoints } from './data/utah';
import { generateRectangle } from './generate/rectangle';

const App: React.FC = () => {
  const [shapes, setShapes] = useState([[utahPoints], [utahPoints]] as Shape[]);

  const addShape = () => {
    // const newShape = generateRegularPolygon({
    //   numSides: randomBetween(3, 8),
    //   radius: randomBetween(30, 170),
    // });
    const newShape = generateRectangle({
      widthRange: [10, 400],
      heightRange: [50, 150],
    });
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
