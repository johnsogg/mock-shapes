import React, { useCallback } from 'react';
import { KnobCfg } from './App';
import { GenerateTetrisConfig } from './generate/tetris';

export const TetrisKnob: React.FC<{
  knob: GenerateTetrisConfig;
  change: (newVal: KnobCfg) => void;
}> = ({ knob, change }) => {
  const handleUnitChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = parseInt(event.currentTarget.value);
      if (Number.isNaN(newVal)) return;
      const newKnob = { ...knob };
      newKnob.unit = newVal;
      change(newKnob);
    },
    [change, knob],
  );

  return (
    <div>
      <div>
        Unit:{' '}
        <input type="text" onChange={handleUnitChange} value={knob.unit} />
      </div>
      <span>more...</span>
    </div>
  );
};
