import React, { useCallback } from 'react';
import { KnobCfg, ShapeName } from './App';
import { GeneratorKnob } from './GeneratorKnob';

export const GeneratorKnobs: React.FC<{
  weights: { name: ShapeName; weight: number }[];
  setWeight: (params: { name: ShapeName; weight: number }) => void;
  knobs: Record<ShapeName, KnobCfg>;
  setKnobs: (knobs: Record<ShapeName, KnobCfg>) => void;
}> = ({ weights, setWeight, knobs, setKnobs }) => {
  const updateKnob = useCallback(
    (newVal: KnobCfg) => {
      console.log('update knobs with new value:', newVal);
      const nextKnobs = { ...knobs };
      nextKnobs[newVal.type] = newVal;
      setKnobs(nextKnobs);
    },
    [knobs, setKnobs],
  );
  return (
    <>
      {weights.map(weight => (
        <GeneratorKnob
          knob={knobs[weight.name]}
          updateKnob={updateKnob}
          key={weight.name}
          weight={weight}
          setWeight={setWeight}
        />
      ))}
    </>
  );
};
