import { useState, useEffect } from 'react';
import ShareShell from "./ShareShell";

export default function GameEndShell({
    inputStatus,
    wordFound,
    currentGuess
    }) {
        const [correctWord, setCorrectWord] = useState('');
        const [definition, setDefinition] = useState({});

        useEffect(() => {
            async function getWord() {
                try {
                    const response = await fetch('/api/word');
                    const data = await response.json();
                    console.log('Fetched word:', data.dailyWord);
                    setCorrectWord(data.dailyWord);
                } catch (err) {
                    console.error('Error fetching word:', err);
                }
            }
            getWord();
        }, []);

        useEffect(() => {
            async function getDefinition() {
                try {
                    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${correctWord}`);
                    const data = await response.json();
                    setDefinition(data[0]);
                } catch (err) {
                    console.error('Error fetching definition:', err);
                }
            }
            getDefinition();
        }, [correctWord]);

        // useEffect(() => {
        //     console.log('Correct word:', correctWord);
        //     console.log('Definition:', definition);
        // }, [correctWord, definition]);

        return (
            <>
                <div className='gameEndContainer'>
                    {wordFound && <h1>Well done, you found the word!</h1>}
                    {!wordFound && 
                        <div>
                            <h1>Game over.</h1>
                            <h2>The correct word was:</h2>
                        </div>}
                    {definition.word &&
                        <div className='wordDefinition'>
                            <h2>{definition.word[0].toUpperCase()+definition.word.slice(1)}</h2>
                            <h3>{definition.phonetic}</h3>
                            { definition.meanings[0] &&
                                <>
                                    <h4>1.</h4>
                                    <p>{definition.meanings[0].partOfSpeech}</p>
                                    <p>{definition.meanings[0].definitions[0].definition}</p>
                                </>}
                            { definition.meanings[1] &&
                                <>
                                    <h4>2.</h4>
                                    <p>{definition.meanings[1].partOfSpeech}</p>
                                    <p>{definition.meanings[1].definitions[0].definition}</p>
                                </>}
                        </div>}
                </div>
                <ShareShell
                    inputStatus={inputStatus}
                    currentGuess={currentGuess}
                />
            </>
        )
    }