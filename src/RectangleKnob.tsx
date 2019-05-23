import React, { useCallback } from 'react';
import { GenerateRectangleConfig } from './generate/rectangle';
import { KnobCfg } from './App';
import { RangePicker } from './RangePicker';

export const RectangleKnob: React.FC<{
  knob: GenerateRectangleConfig;
  change: (newVal: KnobCfg) => void;
}> = ({ knob, change }) => {
  const handleWidthChange = useCallback(
    (idx: number, newVal: [number, number]) => {
      const newKnob = { ...knob };
      newKnob.widthRange = newVal;
      change(newKnob);
    },
    [change, knob],
  );
  const handleHeightChange = useCallback(
    (idx: number, newVal: [number, number]) => {
      const newKnob = { ...knob };
      newKnob.heightRange = newVal;
      change(newKnob);
    },
    [change, knob],
  );
  return (
    <div>
      <div>
        Width:{' '}
        <RangePicker range={knob.widthRange} change={handleWidthChange} />
      </div>
      <div>
        Height:{' '}
        <RangePicker range={knob.heightRange} change={handleHeightChange} />
      </div>
    </div>
  );
};
