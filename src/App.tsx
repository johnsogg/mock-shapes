import React, { useState, useCallback } from 'react';
import { Draw } from './drawing/Draw';
import { Shape } from './drawing/geometry';
import { utahPoints } from './data/utah';

const App: React.FC = () => {
  const [shapes, setShapes] = useState([[utahPoints]] as Shape[]);

  const addShape = () => {
    console.log('add shape pls');
  };

  const clearShapes = useCallback(() => {
    console.log('clear shapes pls', shapes);
    setShapes([]);
  }, [shapes]);

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
