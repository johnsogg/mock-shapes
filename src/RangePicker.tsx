import React, { useCallback } from 'react';

export const RangePicker: React.FC<{
  range: [number, number];
  change: (idx: number, newVal: [number, number]) => void;
}> = ({ range, change }) => {
  const handleChange = useCallback(
    (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = parseInt(event.currentTarget.value);
      if (Number.isNaN(newVal)) return;
      const newRange = [...range] as [number, number];
      newRange[idx] = newVal;
      change(idx, newRange);
    },
    [change, range],
  );
  return (
    <>
      <input type="text" value={range[0]} onChange={handleChange(0)} /> to{' '}
      <input type="text" value={range[1]} onChange={handleChange(1)} />
    </>
  );
};
