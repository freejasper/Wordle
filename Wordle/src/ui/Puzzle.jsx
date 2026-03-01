import LetterInputShell from '../util/LetterInputShell.jsx';

export default function Puzzle({
    submitRef,
    setAlphabet, 
    inputs, 
    setInputs,
    inputStatus,
    setInputStatus,
    currentGuess,
    setCurrentGuess,
    wordFound,
    setWordFound,
    keyboardRows
}) {

    return (
        <>
        <div className='guessInputContainer'>
            {inputs.map((inputGroup, index) => (
            <div key={index} className={'guessInput'}>
                <LetterInputShell
                submitRef={submitRef}
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