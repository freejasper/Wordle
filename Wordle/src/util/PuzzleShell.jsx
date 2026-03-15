import { useRef, useState } from 'react';
import Puzzle from '../ui/Puzzle.jsx';
import { initialiseKeyboard } from './initialiseKeyboard.js';

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
    // function splitAlphabet (start, end) {
    //     const alphaKeys = Object.keys(alphabet);
    //     const newLetters = {};
    //     alphaKeys.forEach((letter, index) => {
    //         if ( alphaKeys.indexOf(start) <= index && alphaKeys.indexOf(end) >= index) {
    //             newLetters[letter] = (<div key={letter} className={`key ${letter.toLowerCase()} ${alphabet[letter]}`}>{letter}</div>);
    //         }
    //     });
    //     return newLetters;
    // }

    // const keyboardRows = [splitAlphabet('Q', 'P'), splitAlphabet('A', 'L'), splitAlphabet('Z', 'M')];

    // const submitTrigger = useRef(null);

    // const childSubmitTrigger = () => {
    //     submitTrigger.current?.handleSubmit();
    //     console.log('submit triggered in PuzzleShell');
    // }

    // const submitButton = (<button key='button' onClick={childSubmitTrigger} className="submit-button">Enter</button>);
    // keyboardRows[2]['Enter'] = submitButton;



    const handlePress = (e) => {
        const letter = e.target.id.toUpperCase();
        const currentRow = inputs[currentGuess - 1];
        if (!currentRow) return console.error('No currentRow object');
        const emptyIndex = currentRow.findIndex((cell) => cell === '');
        if (emptyIndex !== -1 && emptyIndex < 5) {
            const newInputs = [...inputs];
            newInputs[currentGuess - 1][emptyIndex] = letter;
            setInputs(newInputs);
        }
    }

    const handleDel = (e) => {
        const letter = e.target.id.toUpperCase();
        const currentRow = inputs[currentGuess - 1];
        if (!currentRow) return console.error('No currentRow object');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const guess = inputs[currentGuess - 1].join();

        try {
            const response = await fetch(`/api/checkWord/${encodeURIComponent(guess)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            // console.log('fetch response:', data);

            if (data.exists) {
                // Update input classes
                let newClasses = [...inputStatus[currentGuess - 1]];
                data.letterResults.forEach((letter, index) => {
                    const currentLetter = inputs[currentGuess - 1][index];
                    if (letter[currentLetter] === 'correct') {
                        newClasses[index] = 'green';
                    } else if (letter[currentLetter] === 'present') {
                        newClasses[index] = 'yellow';
                    } else {
                        newClasses[index] = 'wrong';
                    }
                });
                setInputStatus((prev) => {
                    const newStatus = [...prev];
                    newStatus[currentGuess - 1] = newClasses;
                    return newStatus;
                });

                // Check if word is found
                if (data.correct) {
                    setWordFound(true);
                    console.log('Congratulations! You guessed the word!');
                    return;
                }

                return setCurrentGuess((prev) => prev + 1);
            } else {
                // animate invalid guess
                setInputs((prev) => {
                    const resetInputs = [...prev];
                    resetInputs[currentGuess - 1] = ['', '', '', '', ''];
                    return resetInputs;
                });
                const currentInput = document.querySelector(`#inputGroup${currentGuess} input[data-index="0"]`);
                if (currentInput) currentInput.focus();
            }

        } catch (err) {
            console.error('Error validating guess:', err);
        };
    }

    return (
        <>
            <div className='guessInputContainer'>
                {inputs.map((inputGroup, index) => (
                <div key={index} className={'guessInput'}>
                    
                    <LetterInputShell
                    inputGroup={index + 1}
                    inputs={inputs}
                    setInputs={setInputs}
                    inputStatus={inputStatus}
                    setInputStatus={setInputStatus}
                    wordFound={wordFound}
                    setWordFound={setWordFound}
                    currentGuess={currentGuess}
                    setCurrentGuess={setCurrentGuess}
                    setAlphabet={setAlphabet} 
                    />
                </div>
                ))}
            </div>
            {keyboardRows.map((row, index) => (
                <div key={index} className='keyboard'>
                {Object.keys(row).map((letter) => (
                    row[letter]
                ))}
                </div>
            ))}
        </>
    )
}