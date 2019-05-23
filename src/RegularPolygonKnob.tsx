import React, { useCallback } from 'react';
import { KnobCfg } from './App';
import { GenerateRegularPolygonKnobs } from './generate/regularPolygon';
import { RangePicker } from './RangePicker';

export const RegularPolygonKnob: React.FC<{
  knob: GenerateRegularPolygonKnobs;
  change: (newVal: KnobCfg) => void;
}> = ({ knob, change }) => {
  const handleRadiusChange = useCallback(
    (newVal: [number, number]) => {
      const newKnob = { ...knob };
      newKnob.radius = newVal;
      change(newKnob);
    },
    [change, knob],
  );

  const handleNumSidesChange = useCallback(
    (newVal: [number, number]) => {
      const newKnob = { ...knob };
      newKnob.numSides = newVal;
      change(newKnob);
    },
    [change, knob],
  );
  return (
    <div>
      <div>
        Radius: <RangePicker range={knob.radius} change={handleRadiusChange} />
      </div>
      <div>
        Num Sides:{' '}
        <RangePicker range={knob.numSides} change={handleNumSidesChange} />
      </div>
    </div>
  );
};
