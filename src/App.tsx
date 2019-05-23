import React, { useCallback, useMemo, useState } from 'react';
import { AddShapes } from './AddShapes';
import { Draw } from './drawing/Draw';
import { Shape } from './drawing/geometry';
import {
  generateIrregularPolygon,
  GenerateIrregularPolygonConfig,
} from './generate/irregularPolyon';
import {
  generateRectangle,
  GenerateRectangleConfig,
} from './generate/rectangle';
import {
  generateRegularPolygon,
  GenerateRegularPolygonKnobs,
  buildRegularPolygonConfigFromKnobs,
} from './generate/regularPolygon';
import {
  cumulativeDistribution,
  CumulativeDistributionReturn,
  pickFromCdf,
} from './generate/rnd';
import {
  GenerateTetrisConfig,
  generateTetrisShape,
  TetrisForm,
} from './generate/tetris';
import { GeneratorKnobs } from './GeneratorKnobs';
import { ShowConditionally } from './ShowConditionally';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ShapeName =
  | 'rectangle'
  | 'polygon'
  | 'irregular polygon'
  | 'tetris';
export const MAX_NUM_SHAPES = 200;

// ordered but otherwise independent weights for the different shape generators.
const initialPdf: { name: ShapeName; weight: number }[] = [
  {
    name: 'polygon',
    weight: 1,
  },
  {
    name: 'irregular polygon',
    weight: 0,
  },
  {
    name: 'rectangle',
    weight: 0,
  },
  {
    name: 'tetris',
    weight: 0,
  },
];

const chooseShape = (
  cdf: CumulativeDistributionReturn[],
  bound: number,
  knobCfg: Record<ShapeName, KnobCfg>,
) => {
  const generator = pickFromCdf(cdf, bound);
  switch (generator) {
    case 'polygon':
      return generateRegularPolygon(
        buildRegularPolygonConfigFromKnobs(knobCfg[
          'polygon'
        ] as GenerateRegularPolygonKnobs),
      );
    case 'irregular polygon':
      return generateIrregularPolygon({
        numSides: [3, 12],
        radius: [5, 50],
      });
    case 'rectangle':
      return generateRectangle(knobCfg['rectangle'] as GenerateRectangleConfig);
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

export type KnobCfg =
  | GenerateRegularPolygonKnobs
  | GenerateIrregularPolygonConfig
  | GenerateRectangleConfig
  | GenerateTetrisConfig;

const initialKnobCfg: Record<ShapeName, KnobCfg> = {
  polygon: {
    type: 'polygon',
    numSides: [3, 8] as [number, number],
    radius: [5, 25] as [number, number],
  },
  'irregular polygon': {
    type: 'irregular polygon',
    numSides: [3, 12] as [number, number],
    radius: [5, 50] as [number, number],
  },
  rectangle: {
    type: 'rectangle',
    widthRange: [5, 50] as [number, number],
    heightRange: [5, 50] as [number, number],
  },
  tetris: {
    type: 'tetris',
    unit: 20,
    rotate: 'random' as number | 'random' | 'none',
    form: 'random' as TetrisForm,
  },
};

const App: React.FC = () => {
  const [shapes, setShapes] = useState([] as Shape[]);
  const [weights, setWeights] = useState(initialPdf);
  const [knobCfg, setKnobCfg] = useState(initialKnobCfg);
  const { cdf, bound } = useMemo(() => cumulativeDistribution(weights), [
    weights,
  ]);
  const pickShape = useCallback(() => chooseShape(cdf, bound, knobCfg), [
    bound,
    cdf,
    knobCfg,
  ]);
  const setWeight = useCallback(
    (params: { name: ShapeName; weight: number }) => {
      const newWeights = [...weights];
      const idx = newWeights.findIndex(elm => elm.name === params.name);
      if (idx >= 0) {
        newWeights[idx] = params;
        setWeights(newWeights);
      }
    },
    [weights],
  );
  const [showKnobs, setShowKnobs] = useState(true); // TODO: false

  return (
    <>
      <h1>Mock Shapes Demo</h1>
      <AddShapes {...{ shapes, setShapes, chooseShape: pickShape }} />
      <ShowConditionally show={showKnobs} change={setShowKnobs} what="Knobs">
        <GeneratorKnobs
          weights={weights}
          setWeight={setWeight}
          knobs={knobCfg}
          setKnobs={setKnobCfg}
        />
      </ShowConditionally>
      <Draw shapes={shapes} />
    </>
  );
};

export default App;
