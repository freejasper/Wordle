export default function LetterInput({ 
            inputGroup, 
            inputs, 
            inputStatus, 
            handleChange, 
            handleKeyDown,
            handleSubmit,
            inputDisabled }) {
    
    return (
        <>
            <form id={`inputGroup${inputGroup}`} onSubmit={handleSubmit} >
                <input
                    type="text"
                    maxLength="1"
                    value={inputs[0]}
                    className={inputStatus[0]}
                    data-index='0'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={inputDisabled}
                />
                <input
                    type="text"
                    maxLength="1"
                    value={inputs[1]}
                    className={inputStatus[1]}
                    data-index='1'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={inputDisabled}
                />
                <input
                    type="text"
                    maxLength="1"
                    value={inputs[2]}
                    className={inputStatus[2]}
                    data-index='2'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={inputDisabled}
                />
                <input
                    type="text"
                    maxLength="1"
                    value={inputs[3]}
                    className={inputStatus[3]}
                    data-index='3'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={inputDisabled}
                />
                <input
                    type="text"
                    maxLength="1"
                    value={inputs[4]}
                    className={inputStatus[4]}
                    data-index='4'
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={inputDisabled}
                />
                <input type="submit" value='Submit' hidden />
            </form>
        </>
    )
}