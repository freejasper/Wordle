import { useState, useEffect, useImperativeHandle } from 'react';
import LetterInput from '../ui/LetterInput.jsx';
import '../css/LetterInput.css';

export default function LetterInputShell({ 
    submitRef,
    inputGroup,
    inputs, 
    setInputs,
    inputStatus,
    setInputStatus, 
    wordFound, 
    setWordFound, 
    currentGuess, 
    setCurrentGuess, 
    setAlphabet 
    }) {
    const [input, setInput] = useState(['', '', '', '', '']);
    const [inputClassName, setInputClassName] = useState(['', '', '', '', '']);

    const inputDisabled = !(currentGuess === inputGroup && !wordFound);
    
    // set input and inputs status from user history
    useEffect(() => {
        setInput(inputs[inputGroup - 1]);
        setInputClassName(inputStatus[inputGroup - 1]);
    }, [inputs, inputStatus, inputGroup]);

    const handleChange = (e) => {
        if (wordFound) return;
        const value = e.target.value.toUpperCase();
        const index = parseInt(e.target.dataset.index)
        if (/^[A-Z]$/.test(value) || value === '') {
            setInput((prev) => {
                const newInputs = [...prev];
                newInputs[index] = value;
                return newInputs;
            });
        }
    };

    const handleKeyDown = (e) => {
        if (wordFound) return;
        const index = parseInt(e.target.dataset.index);
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            const previousInput = document.querySelector(`#inputGroup${inputGroup} input[data-index="${index - 1}"]`);
            if (previousInput) {
                previousInput.focus();
            }
        }
        else if (/^[A-Za-z]$/.test(e.key) && index < 4) {
            const nextInput = document.querySelector(`#inputGroup${inputGroup} input[data-index="${index + 1}"]`);
            if (nextInput && input[index] !== '') {
                nextInput.focus();
            }
        }
        else if (input.forEach((letter) => letter != '')) {
            e.preventDefault();
            const form = document.getElementById(`inputGroup${inputGroup}`);
            form.requestSubmit();
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const guess = input.join('').toLowerCase().trim();
        try {
            const response = await fetch(`/api/checkWord/${encodeURIComponent(guess)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            // console.log('fetch response:', data);

            if (data.exists) {
                setInputs((prev) => {
                    const newInputs = [...prev];
                    newInputs[inputGroup - 1] = input;
                    return newInputs;
                });
                
                // Update input classes
                let newClasses = [...inputClassName];
                data.letterResults.forEach((letter, index) => {
                    const currentLetter = input[index]
                    if (letter[currentLetter] === 'correct') {
                        newClasses[index] = 'green';
                    } else if (letter[currentLetter] === 'present') {
                        newClasses[index] = 'yellow';
                    } else {
                        newClasses[index] = 'wrong';
                    }
                });
                setInputClassName(newClasses);

                setInputStatus((prev) => {
                    const newStatus = [...prev];
                    newStatus[inputGroup - 1] = newClasses;
                    return newStatus;
                });
                
                // Update alphabet classes
                setAlphabet((prev) => {
                    const newAlphabet = {...prev};
                    data.letterResults.forEach((result, index) => {
                        const letter = input[index];
                        if (result[letter] === 'correct') {
                            newAlphabet[letter] = 'green';
                        } else if (result[letter] === 'present' && newAlphabet[letter] !== 'green') {
                            newAlphabet[letter] = 'yellow';
                        } else if (result[letter] === 'absent' && !['green', 'yellow'].includes(newAlphabet[letter])) {
                            newAlphabet[letter] = 'wrong';
                        }
                    });
                    return newAlphabet;
                })

                // Check if word is found
                if (data.correct) {
                    setWordFound(true);
                    console.log('Congratulations! You guessed the word!');
                    return;
                }

                return setCurrentGuess((prev) => prev + 1);
            } else {
                // animate invalid guess
                setInput(['', '', '', '', '']);
                const currentInput = document.querySelector(`#inputGroup${inputGroup} input[data-index="0"]`);
                if (currentInput) currentInput.focus();
            }

        } catch (err) {
            console.error('Error validating guess:', err);
        };
    };

    useImperativeHandle(submitRef, () => ({
        handleSubmit
    }));

    // focus next input after submit
    useEffect(() => {
        const nextWordInput = document.querySelector(`#inputGroup${currentGuess} input[data-index="0"]`);

        if (!wordFound) {
            if (nextWordInput) nextWordInput.focus();
        }

    }, [currentGuess, wordFound]);

    return (
        <LetterInput 
            inputGroup={inputGroup} 
            input={input} 
            inputClassName={inputClassName} 
            handleChange={handleChange} 
            handleKeyDown={handleKeyDown}
            handleSubmit={handleSubmit}
            inputDisabled={inputDisabled} />
    )
}