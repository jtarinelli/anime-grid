import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Grid from './components/Grid'
import { useState } from 'react';
import { ClueType } from './clues/types';
import { Guesses } from './components/Guesses';
import { Anime } from './queries/animeSearch';

const client = new QueryClient();

const clues = [
  {
      type: ClueType.STUDIO,
      data: "MAPPA",
  },
  {
      type: ClueType.YEAR,
      data: {
          max: 2020,
      }
  },
  {
      type: ClueType.VOICE_ACTOR,
      data: "Yuuki Kaji",
  },
  {
      type: ClueType.VOICE_ACTOR,
      data: "Kana Hanazawa",
  },
];

function App() {
  // maybe make it so guesses controls whole board state
  // ie can load whole game from partway through from it alone
  // or reset just by clearing the array
  // need info on which clues/cell each guess goes with
  const [guesses, setGuesses] = useState<Anime[]>([]); 
  
  const addGuess = (newGuess: Anime): boolean => {
    const alreadyGuessed = guesses.some(guess => guess.id === newGuess.id);
    if (alreadyGuessed) {
      return false;
    }
    setGuesses([...guesses, newGuess])
    return true;
  };

  const guessesLeft = clues.length - guesses.length;
  const isGameOver = guessesLeft === 0;
  const resetGuesses = () => setGuesses([]);
  
  return (
    <div className="h-screen flex items-center justify-center">
      <QueryClientProvider client={client}>
        <Grid clues={clues} addGuess={addGuess} isGameOver={isGameOver}/>
        <Guesses guessesLeft={guessesLeft} resetGuesses={resetGuesses}/>
      </QueryClientProvider>
    </div>
  )
}

export default App
