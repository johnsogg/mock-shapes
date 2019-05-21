import React, { useCallback } from 'react';
import { MAX_NUM_SHAPES, ShapeName, KnobCfg } from './App';

const buildKnobs = (name: string) => {
  switch (name) {
    case 'rectangle':
      return (
        <p>
          Controls for a <b>rectangle</b>
        </p>
      );
    case 'polygon':
      return (
        <p>
          Controls for a <b>polygon</b>
        </p>
      );
    case 'irregular polygon':
      return (
        <p>
          Controls for an <b>irregular polygon</b>
        </p>
      );
    case 'tetris':
      return (
        <p>
          Controls for <b>tetris</b> pieces
        </p>
      );
    default:
      return null;
  }
};

export const GeneratorKnob: React.FC<{
  weight: { name: ShapeName; weight: number };
  setWeight: (params: { name: ShapeName; weight: number }) => void;
  knob: KnobCfg;
}> = ({ weight, setWeight, knob }) => {
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
      {buildKnobs(weight.name)}
      make knob for {knob.type}
    </div>
  );
};
