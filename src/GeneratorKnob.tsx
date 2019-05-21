import React, { useCallback } from 'react';
import { MAX_NUM_SHAPES } from './App';

export const GeneratorKnob: React.FC<{
  weight: { name: string; weight: number };
  setWeight: (params: { name: string; weight: number }) => void;
}> = ({ weight, setWeight }) => {
  const decrementEvent = useCallback(() => {
    setWeight({ name: weight.name, weight: Math.max(0, weight.weight - 1) });
  }, [setWeight, weight]);
  const incrementEvent = useCallback(() => {
    setWeight({
      name: weight.name,
      weight: Math.min(MAX_NUM_SHAPES, weight.weight + 1),
    });
  }, [setWeight, weight]);

  return (
    <div>
      {weight.name}: {weight.weight}
      <input
        type="button"
        className="safe"
        value="-"
        onClick={decrementEvent}
      />
      <input
        type="button"
        className="safe"
        value="+"
        onClick={incrementEvent}
      />
    </div>
  );
};
