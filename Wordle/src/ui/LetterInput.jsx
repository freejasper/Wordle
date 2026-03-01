export default function LetterInput({ 
            inputGroup, 
            input, 
            inputClassName, 
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
                    value={input[0]}
                    className={inputClassName[0]}
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
        </>
    )
}