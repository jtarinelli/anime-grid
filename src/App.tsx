import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Grid from './components/Grid'
import { useState } from 'react';
import { Clue, ClueType } from './clues/types';
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

export type CellCoordinates = {
  row: number;
  col: number;
}

export type Guess = {
  anime: Anime;
  clues: Clue[];
  isCorrect: boolean;
  cellCoordinates: CellCoordinates;
}

function App() {
  // maybe make it so guesses controls whole board state
  // ie can load whole game from partway through from it alone
  // or reset just by clearing the array
  // need info on which clues/cell each guess goes with
  const [guesses, setGuesses] = useState<Guess[]>([]); 

  const isAlreadyGuessed = (animeId: number) => guesses.some(guess => guess.anime.id === animeId);
  const addGuess = (newGuess: Guess) => setGuesses([...guesses, newGuess])

  const guessesLeft = clues.length - guesses.length;
  const isGameOver = guessesLeft === 0;
  const resetGuesses = () => setGuesses([]);

  const correctGuesses = guesses.filter(guess => guess.isCorrect);
  
  return (
    <div className="h-screen flex items-center justify-center">
      <QueryClientProvider client={client}>
        <Grid correctGuesses={correctGuesses} clues={clues} isAlreadyGuessed={isAlreadyGuessed} addGuess={addGuess} isGameOver={isGameOver}/>
        <Guesses guessesLeft={guessesLeft} resetGuesses={resetGuesses}/>
      </QueryClientProvider>
    </div>
  )
}

export default App
