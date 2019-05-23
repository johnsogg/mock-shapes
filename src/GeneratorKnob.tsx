import React, { useCallback } from 'react';
import { MAX_NUM_SHAPES, ShapeName, KnobCfg } from './App';
import { RectangleKnob } from './RectangleKnob';
import { RegularPolygonKnob } from './RegularPolygonKnob';
import { IrregularPolygonKnob } from './IrregularPolygonKnob';
import { TetrisKnob } from './TetrisKnob';

const buildKnobs = (knob: KnobCfg, updateKnob: (newVal: KnobCfg) => void) => {
  switch (knob.type) {
    case 'rectangle':
      return <RectangleKnob knob={knob} change={updateKnob} />;
    case 'polygon':
      return <RegularPolygonKnob knob={knob} change={updateKnob} />;
    case 'irregular polygon':
      return <IrregularPolygonKnob knob={knob} change={updateKnob} />;
    case 'tetris':
      return <TetrisKnob knob={knob} change={updateKnob} />;
    default:
      return null;
  }
};

export const GeneratorKnob: React.FC<{
  weight: { name: ShapeName; weight: number };
  setWeight: (params: { name: ShapeName; weight: number }) => void;
  knob: KnobCfg;
  updateKnob: (newVal: KnobCfg) => void;
}> = ({ weight, setWeight, knob, updateKnob }) => {
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
      {buildKnobs(knob, updateKnob)}
    </div>
  );
};
