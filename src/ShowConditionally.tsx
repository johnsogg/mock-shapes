import React from 'react';

export const ShowConditionally: React.FC<{
  show: boolean;
  change: (v: boolean) => void;
  what: string;
}> = ({ show, change, what, children }) => {
  const handleChange = () => change(!show);
  const btnText = (show ? 'Hide' : 'Show') + ' ' + what;
  return (
    <div>
      <input type="button" value={btnText} onClick={handleChange} />
      {show && children}
    </div>
  );
};
