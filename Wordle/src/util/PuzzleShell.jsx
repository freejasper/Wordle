import { useRef } from 'react';
import Puzzle from '../ui/Puzzle.jsx';

export default function PuzzleShell ({ 
    alphabet, 
    setAlphabet, 
    inputs, 
    setInputs,
    inputStatus, 
    setInputStatus,
    currentGuess,
    setCurrentGuess,
    wordFound,
    setWordFound
    }) {
    // Helper function to seperate into standard keyboard rows
    function splitAlphabet (start, end) {
        const alphaKeys = Object.keys(alphabet);
        const newLetters = {};
        alphaKeys.forEach((letter, index) => {
            if ( alphaKeys.indexOf(start) <= index && alphaKeys.indexOf(end) >= index) {
                newLetters[letter] = (<div key={letter} className={`key ${letter.toLowerCase()} ${alphabet[letter]}`}>{letter}</div>);
            }
        });
        return newLetters;
    }

    const keyboardRows = [splitAlphabet('Q', 'P'), splitAlphabet('A', 'L'), splitAlphabet('Z', 'M')];

    const submitTrigger = useRef(null);

    const childSubmitTrigger = () => {
        submitTrigger.current?.handleSubmit();
        console.log('submit triggered in PuzzleShell');
    }

    const submitButton = (<button key='button' onClick={childSubmitTrigger} className="submit-button">Enter</button>);
    keyboardRows[2]['Enter'] = submitButton;

    return (
        <>
            <Puzzle 
                submitRef={submitTrigger}
                setAlphabet={setAlphabet} 
                inputs={inputs} 
                setInputs={setInputs}
                inputStatus={inputStatus}
                setInputStatus={setInputStatus}
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
                wordFound={wordFound}
                setWordFound={setWordFound}
                keyboardRows={keyboardRows}
            />
        </>
    )
}