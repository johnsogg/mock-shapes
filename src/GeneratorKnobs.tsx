import React from 'react';
import { GeneratorKnob } from './GeneratorKnob';
import { ShapeName, KnobCfg } from './App';

export const GeneratorKnobs: React.FC<{
  weights: { name: ShapeName; weight: number }[];
  setWeight: (params: { name: ShapeName; weight: number }) => void;
  knobs: Record<ShapeName, KnobCfg>;
  setKnobs: (knobs: Record<ShapeName, KnobCfg>) => void;
}> = ({ weights, setWeight, knobs }) => {
  return (
    <>
      {weights.map(weight => (
        <GeneratorKnob
          knob={knobs[weight.name]}
          key={weight.name}
          weight={weight}
          setWeight={setWeight}
        />
      ))}
    </>
  );
};
