import React from 'react';
import { GeneratorKnob } from './GeneratorKnob';

export const GeneratorKnobs: React.FC<{
  weights: { name: string; weight: number }[];
  setWeight: (params: { name: string; weight: number }) => void;
}> = ({ weights, setWeight }) => {
  return (
    <>
      {weights.map(weight => (
        <GeneratorKnob
          key={weight.name}
          weight={weight}
          setWeight={setWeight}
        />
      ))}
    </>
  );
};
