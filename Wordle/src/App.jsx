import { useState, useEffect } from 'react'
import './App.css'
import PuzzleShell from './util/PuzzleShell.jsx';
import GameStartShell from './util/GameStartShell.jsx';
import GameEndShell from './util/GameEndShell.jsx';

function App() {
  const [gameStart, setGameStart] = useState(false); 

  const [inputs, setInputs] = useState([['', '', '', '', ''],['', '', '', '', ''],['', '', '', '', ''],['', '', '', '', ''],['', '', '', '', ''],['', '', '', '', '']]);
  const [inputStatus, setInputStatus] = useState([['', '', '', '', ''],['', '', '', '', ''],['', '', '', '', ''],['', '', '', '', ''],['', '', '', '', ''],['', '', '', '', '']]);

  const [alphabet, setAlphabet] = useState({
    'Q': '',
    'W': '',
    'E': '',
    'R': '',
    'T': '',
    'Y': '',
    'U': '',
    'I': '',
    'O': '',
    'P': '',
    'A': '',
    'S': '',
    'D': '',
    'F': '',
    'G': '',
    'H': '',
    'J': '',
    'K': '',
    'L': '',
    'Z': '',
    'X': '',
    'C': '',
    'V': '',
    'B': '',
    'N': '',
    'M': ''
  });

  const [wordFound, setWordFound] = useState(false);

  const [currentGuess, setCurrentGuess] = useState(1);

  // useEffect(() => {
  //   try {
  //     async function syncWithServer() {
  //       const response = await fetch('/api/sync');
  //       const data = await response.json();
  //       console.log('Server sync response:', data);
  //     }
  //     syncWithServer();
  //   } catch (err) {
  //     console.error('Server sync error:', err);
  //   }
  // }, []);

  // Fetch new id or game history as needed on load
  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id === null || id === undefined) {
      const fetchId = async () => {
        try {
          const response = await fetch('/api/getId');
          const data = await response.json();
          localStorage.setItem('id', data.id);
        } catch (err) {
          console.error('Error fetching id:', err);
        }
      }
      fetchId();
    } else {
      const fetchTodayHistory = async () => {
        const today = new Date().toISOString().split('T')[0];
        try {
          const response = await fetch(`/api/history/${id}/${today}`);
          const data = await response.json();
          console.log('history fetch respoonse:', data);
          // set inputs and input status
          // DATA STRUCTURE FOR USERS
          // { id: userId, 
          //   history: {
          //          date: { 
          //          wordFound: Boolean,
          //          currentGuess: Number,
          //          inputs: Array,
          //          inputStatus: Array,
          //          alphabet: Object
          //         }
          //    }
          // }
          if (data.error) {
            const createUser = await fetch('/api/addUser', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ history: {}})
            });
            const newUser = await createUser.json();
            console.log('new user created:', newUser);
            return;
          } else {
            setWordFound(data.wordFound);
            setCurrentGuess(data.currentGuess);
            setInputs(data.inputs);
            setInputStatus(data.inputStatus);
            setAlphabet(data.alphabet);
          }
        } catch (err) {
          console.error('Error fetching history:', err);
        }
      }
      fetchTodayHistory();
    }
  }, []);

  useEffect(() => {
    if (!gameStart) return console.log('game not started, skipping history update');
    const id = localStorage.getItem('id');
    const today = new Date().toISOString().split('T')[0];
    const data = {
                  history: {
                    [today]: { 
                      wordFound, currentGuess, inputs, inputStatus, alphabet 
                    }
                  }
                };
    const updateHistory = async () => {
      try {
        await fetch(`/api/updateUser/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (err) {
        console.error('Error updating history:', err);
      }
    }
    updateHistory();
  }, [wordFound, currentGuess, inputs, inputStatus, alphabet, gameStart]);

  const gameResume = inputs.map(row => row.filter(Boolean).length > 0).filter(Boolean).length > 0;

  const gameEnd = wordFound || currentGuess > 6;

  return (
    <>
      {(!gameStart && !gameEnd) && <GameStartShell 
        setGameStart={setGameStart}
        gameResume={gameResume} 
      />}
      {(gameStart && !gameEnd) && <PuzzleShell
        alphabet={alphabet} 
        setAlphabet={setAlphabet} 
        inputs={inputs} 
        setInputs={setInputs} 
        inputStatus={inputStatus} 
        setInputStatus={setInputStatus}
        currentGuess={currentGuess}
        setCurrentGuess={setCurrentGuess}
        wordFound={wordFound}
        setWordFound={setWordFound}
      />}
      {gameEnd && <GameEndShell
        inputStatus={inputStatus}
        wordFound={wordFound}
        currentGuess={currentGuess}
      />}
    </>
  )
}

export default App
