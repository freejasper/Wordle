import { useMemo } from 'react';
import Key from '../ui/Key';

const initialLineOne = {'Q': '', 'W': '', 'E': '', 'R': '', 'T': '', 'Y': '', 'U': '', 'I': '', 'O': '', 'P': ''};
const initialLineTwo = {'A': '', 'S': '', 'D': '', 'F': '', 'G': '', 'H': '', 'J': '', 'K': '', 'L': ''};
const initialLineThree = {'ENTER': '', 'Z': '', 'X': '', 'C': '', 'V': '', 'B': '', 'N': '', 'M': '', 'DEL': ''};

export default function KeyboardShell({
  handlePress, 
  handleDel, 
  handleSubmit,
  inputs, 
  inputStatus 
}) {
  const keyboardStatus = useMemo(() => {
    const newStatus = {
      lineOne: { ...initialLineOne },
      lineTwo: { ...initialLineTwo },
      lineThree: { ...initialLineThree },
    };

    inputStatus.forEach((statusGroup, statusIdx) => {
      statusGroup.forEach((letterStatus, index) => {
        const letterMatch = inputs[statusIdx][index];
        if (letterStatus === 'green') {
          if (newStatus.lineOne[letterMatch] !== undefined) newStatus.lineOne[letterMatch] = letterStatus;
          if (newStatus.lineTwo[letterMatch] !== undefined) newStatus.lineTwo[letterMatch] = letterStatus;
          if (newStatus.lineThree[letterMatch] !== undefined) newStatus.lineThree[letterMatch] = letterStatus;
        }
        if (letterStatus === 'yellow') {
          if (newStatus.lineOne[letterMatch] !== undefined && newStatus.lineOne[letterMatch] !== 'green') newStatus.lineOne[letterMatch] = letterStatus;
          if (newStatus.lineTwo[letterMatch] !== undefined && newStatus.lineTwo[letterMatch] !== 'green') newStatus.lineTwo[letterMatch] = letterStatus;
          if (newStatus.lineThree[letterMatch] !== undefined && newStatus.lineThree[letterMatch] !== 'green') newStatus.lineThree[letterMatch] = letterStatus;
        }
        if (letterStatus === 'wrong') {
          if (newStatus.lineOne[letterMatch] !== undefined && newStatus.lineOne[letterMatch] !== 'green' && newStatus.lineOne[letterMatch] !== 'yellow') newStatus.lineOne[letterMatch] = letterStatus;
          if (newStatus.lineTwo[letterMatch] !== undefined && newStatus.lineTwo[letterMatch] !== 'green' && newStatus.lineTwo[letterMatch] !== 'yellow') newStatus.lineTwo[letterMatch] = letterStatus;
          if (newStatus.lineThree[letterMatch] !== undefined && newStatus.lineThree[letterMatch] !== 'green' && newStatus.lineThree[letterMatch] !== 'yellow') newStatus.lineThree[letterMatch] = letterStatus;
        }
      });
    });

    return newStatus;
  }, [inputs, inputStatus]);

  return (
    <>
      <div>
        {Object.keys(keyboardStatus.lineOne).map((key) => (
          <Key 
            key={key}
            handlePress={handlePress}
            status={keyboardStatus.lineOne[key]} />
        ))}
      </div>
      <div>
        {Object.keys(keyboardStatus.lineTwo).map((key) => (
          <Key 
            key={key}
            handlePress={handlePress}
            status={keyboardStatus.lineTwo[key]} />
        ))}
      </div>
      <div>
        {Object.keys(keyboardStatus.lineThree).map((key) => (
          <Key 
            key={key}
            handlePress={handlePress}
            handleDel={handleDel}
            handleSubmit={handleSubmit}
            status={keyboardStatus.lineThree[key]} />
        ))}
      </div>
    </>
  );
}