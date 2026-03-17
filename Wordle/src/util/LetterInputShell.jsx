import { useState, useEffect, useImperativeHandle } from 'react';
import LetterInput from '../ui/LetterInput.jsx';
import '../css/LetterInput.css';

export default function LetterInputShell({ 
    inputGroup,
    inputs, 
    setInputs,
    inputStatus,
    setInputStatus, 
    wordFound, 
    setWordFound, 
    currentGuess, 
    handleSubmit 
    }) {

    const inputDisabled = !(currentGuess === inputGroup && !wordFound);

    const currentGuessIndex = currentGuess - 1;
    

    const handleChange = (e) => {
        if (wordFound) return;
        const value = e.target.value.toUpperCase();
        const index = parseInt(e.target.dataset.index)
        if (/^[A-Z]$/.test(value) || value === '') {
            setInputs((prev) => {
                const newInputs = [...prev];
                newInputs[currentGuessIndex][index] = value;
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
            if (nextInput && inputs[index] !== '') {
                nextInput.focus();
            }
        }
        else if (e.key === 'Enter' && inputs.forEach((letter) => letter != '')) {
            e.preventDefault();
            const form = document.getElementById(`inputGroup${inputGroup}`);
            form.requestSubmit();
        }
    };

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
            inputs={inputs} 
            inputStatus={inputStatus} 
            handleChange={handleChange} 
            handleKeyDown={handleKeyDown}
            handleSubmit={handleSubmit}
            inputDisabled={inputDisabled} />
    )
}