import React from 'react';
import { Stage, Layer, Path } from 'react-konva';
import { PathConfig } from 'konva/types/shapes/Path';
import { pointsToPath } from './pointsToPath';
import { Point } from './geometry';

const utahPoints: Point[] = [
    [0, 0],
    [0, 300],
    [300, 300],
    [300, 150],
    [150, 150],
    [150, 0],
];

export const Draw: React.FC = () => (
    <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
            <RewindIcon x={200} y={350} fill="red" />
            <UtahShape
                x={20}
                y={20}
                fill="blue"
                stroke="black"
                strokeWidth={14}
            />
            <SegmentShape points={utahPoints} />
            <SegmentShape points={utahPoints} x={400} y={50} />
        </Layer>
    </Stage>
);

// RewindIcon shows that you can use svg path data strings to define output geometry.
const RewindIcon: React.FC<Partial<PathConfig>> = cfg => (
    <Path
        {...cfg}
        data="M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z"
    />
);

// This is another canned shape, using passed in params to define its origin and styling.
const UtahShape: React.FC<Partial<PathConfig>> = cfg => (
    <Path {...cfg} data={pointsToPath(utahPoints, true)} />
);

// Generic shape with canned styling. User can only pass in the point list and optional origin data.
const SegmentShape: React.FC<{ points: Point[]; x?: number; y?: number }> = ({
    points,
    x = 0,
    y = 0,
}) => <Path stroke="black" x={x} y={y} data={pointsToPath(points, true)} />;
