import React, { useState } from 'react';
import { AddShapes } from './AddShapes';
import { Draw } from './drawing/Draw';
import { Shape } from './drawing/geometry';
import { generateIrregularPolygon } from './generate/irregularPolyon';
import { generateRectangle } from './generate/rectangle';
import { generateRegularPolygon } from './generate/regularPolygon';
import {
  cumulativeDistribution,
  pickFromCdf,
  randomIntegerInRange,
  CumulativeDistributionReturn,
} from './generate/rnd';
import { generateTetrisShape } from './generate/tetris';
import { GeneratorKnobs } from './GeneratorKnobs';
import { ShowConditionally } from './ShowConditionally';

export const MAX_NUM_SHAPES = 200;

// ordered but otherwise independent weights for the different shape generators.
const initialPdf = [
  {
    name: 'polygon',
    weight: 1,
  },
  {
    name: 'irregular polygon',
    weight: 2,
  },
  {
    name: 'rectangle',
    weight: 3,
  },
  {
    name: 'tetris',
    weight: 4,
  },
];

const chooseShape = (cdf: CumulativeDistributionReturn[], bound: number) => {
  const generator = pickFromCdf(cdf, bound);
  switch (generator) {
    case 'polygon':
      return generateRegularPolygon({
        numSides: randomIntegerInRange(3, 8),
        radius: randomIntegerInRange(5, 25),
      });
    case 'irregular polygon':
      return generateIrregularPolygon({
        numSides: [3, 12],
        radius: [5, 50],
      });
    case 'rectangle':
      return generateRectangle({
        widthRange: [5, 50],
        heightRange: [5, 50],
      });
    case 'tetris':
      return generateTetrisShape({
        unit: 20,
        rotate: 'random',
        form: 'random',
      });
    default:
      console.warn('invalid generator name:', generator); // eslint-disable-line
      return null;
  }
};

const App: React.FC = () => {
  const [shapes, setShapes] = useState([] as Shape[]);
  const [weights, setWeights] = useState(initialPdf);
  const { cdf, bound } = cumulativeDistribution(weights);
  const pickShape = () => chooseShape(cdf, bound);
  const setWeight = (params: { name: string; weight: number }) => {
    const newWeights = [...weights];
    const idx = newWeights.findIndex(elm => elm.name === params.name);
    if (idx >= 0) {
      newWeights[idx] = params;
      setWeights(newWeights);
    }
  };
  const [showKnobs, setShowKnobs] = useState(false);

  return (
    <>
      <h1>Mock Shapes Demo</h1>
      <AddShapes {...{ shapes, setShapes, chooseShape: pickShape }} />
      <ShowConditionally
        show={showKnobs}
        change={setShowKnobs}
        what="Probabilities"
      >
        <GeneratorKnobs weights={weights} setWeight={setWeight} />
      </ShowConditionally>
      <Draw shapes={shapes} />
    </>
  );
};

export default App;
