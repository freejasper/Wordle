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
                <form id={`inputGroup${index + 1}`} onSubmit={handleSubmit} >
                    <input
                        type="text"
                        maxLength="1"
                        value={inputGroup[0]}
                        className={inputGroup[0]}
                        data-index='0'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        disabled={inputDisabled}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={input[1]}
                        className={inputClassName[1]}
                        data-index='1'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        disabled={inputDisabled}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={input[2]}
                        className={inputClassName[2]}
                        data-index='2'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        disabled={inputDisabled}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={input[3]}
                        className={inputClassName[3]}
                        data-index='3'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        disabled={inputDisabled}
                    />
                    <input
                        type="text"
                        maxLength="1"
                        value={input[4]}
                        className={inputClassName[4]}
                        data-index='4'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        disabled={inputDisabled}
                    />
                    <input type="submit" value='Submit' hidden />
                </form>
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