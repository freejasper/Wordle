import { useRef, useState } from 'react';
import Puzzle from '../ui/Puzzle.jsx';
import LetterInputShell from './LetterInputShell.jsx';
import KeyboardShell from './KeyboardShell.jsx';

export default function PuzzleShell ({  
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

    const currentGuessIndex = currentGuess - 1;


    const handlePress = (e) => {
        const letter = e.target.id.toUpperCase();
        const currentRow = inputs[currentGuessIndex];
        if (!currentRow) return console.error('No currentRow object');
        const emptyIndex = currentRow.findIndex((cell) => cell === '');
        if (emptyIndex !== -1 && emptyIndex < 5) {
            setInputs((prev) => {
                const newInputs = [...prev];
                newInputs[currentGuessIndex][emptyIndex] = letter;
                return newInputs;
            });
            // set focus to next input
        }
    }

    const handleDel = () => {
        const currentRow = inputs[currentGuessIndex];
        if (!currentRow) return console.error('No currentRow object');
        const emptyIndex = currentRow.findIndex((cell) => cell === '');
        if (emptyIndex !== -1 && emptyIndex < 5) {
            setInputs((prev) => {
                const newInputs = [...prev];
                newInputs[currentGuessIndex][emptyIndex - 1] = '';
                return newInputs;
            });
            // set focus to previous input
        }
        if (emptyIndex === -1 || emptyIndex < 5) {
            setInputs((prev) => {
                const newInputs = [...prev];
                newInputs[currentGuessIndex][4] = '';
                return newInputs;
            });
            // set focus to previous input
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const guess = inputs[currentGuessIndex].join('').trim().toLowerCase();
        console.log('guess format:', guess);
        if (!guess) return console.error('Guess variable resolved to false');
        if (typeof(guess) !== 'string') return console.error('Guess variable not string format');
        try {
            const response = await fetch(`/api/checkWord/${encodeURIComponent(guess)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('fetch response:', data);

            if (data.exists) {
                // Update input classes
                let newClasses = [...inputStatus[currentGuessIndex]];
                data.letterResults.forEach((letter, index) => {
                    const currentLetter = inputs[currentGuessIndex][index];
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
                    newStatus[currentGuessIndex] = newClasses;
                    return newStatus;
                });

                // Check if word is found
                if (data.correct) {
                    setWordFound(true);
                    console.log('Congratulations! You guessed the word!');
                    return;
                }

                return setCurrentGuess((prev) => prev + 1);
                // set focus to next input group

            } else {
                // animate invalid guess
                setInputs((prev) => {
                    const resetInputs = [...prev];
                    resetInputs[currentGuessIndex] = ['', '', '', '', ''];
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
                    inputs={inputs[index]}
                    setInputs={setInputs}
                    inputStatus={inputStatus[index]}
                    setInputStatus={setInputStatus}
                    wordFound={wordFound}
                    setWordFound={setWordFound}
                    currentGuess={currentGuess}
                    handleSubmit={handleSubmit}
                    />
                </div>
                ))}
            </div>
            <KeyboardShell 
            handlePress={handlePress} 
            handleDel={handleDel} 
            handleSubmit={handleSubmit}
            inputs={inputs} 
            inputStatus={inputStatus} />
        </>
    )
}