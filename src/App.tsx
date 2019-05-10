import React, { useState, useCallback } from 'react';
import { Draw } from './drawing/draw';
import { Shape } from './drawing/geometry';

const App: React.FC = () => {
    const [shapes, setShapes] = useState([] as Shape[]);

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
            <Draw />
        </>
    );
};

export default App;
