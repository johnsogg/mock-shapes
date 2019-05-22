import React, { useCallback } from 'react';
import { GenerateRectangleConfig } from './generate/rectangle';
import { KnobCfg } from './App';

export const RectangleKnob: React.FC<{
  knob: GenerateRectangleConfig;
  change: (newVal: KnobCfg) => void;
}> = ({ knob, change }) => {
  const handleWidthMin = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = { ...knob };
      newVal.widthRange[0] = parseInt(event.currentTarget.value);
      change(newVal);
    },
    [change, knob],
  );
  return (
    <div>
      <div>
        Width:{' '}
        <input
          type="text"
          value={knob.widthRange[0]}
          onChange={handleWidthMin}
        />{' '}
        to <input type="text" value={knob.widthRange[1]} />
      </div>
      <div>
        Height: <input type="text" value={knob.heightRange[0]} /> to{' '}
        <input type="text" value={knob.heightRange[1]} />
      </div>
    </div>
  );
};
