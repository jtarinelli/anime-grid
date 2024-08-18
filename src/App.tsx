import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Grid from './components/Grid'
import { useState } from 'react';
import { Clue, ClueType } from './clues/types';
import { Guesses } from './components/Guesses';
import { Anime } from './queries/animeSearch';
import generateClues from './clues/generateClues';

const client = new QueryClient();

/* const clues = [
  {
    type: ClueType.GENRE,
    data: "Sports",
  },
  {
    type: ClueType.STUDIO,
    data: "Kyoto Animation",
  },
  {
    type: ClueType.VOICE_ACTOR,
    data: "Yoshimasa Hosoya",
  },
  {
    type: ClueType.MOVIE,
  },
];
 */

const clues = generateClues(6);

export type CellCoordinates = {
  row: number;
  col: number;
}

export type Guess = {
  anime: Anime;
  isCorrect: boolean;
  cellCoordinates: CellCoordinates;
}

function App() {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // is it better to define these here for use by children, 
  // or just pass guesses/setGuesses and have them use directly?
  const isAlreadyGuessed = (animeId: number) => guesses.some(guess => guess.anime.id === animeId);
  const addGuess = (newGuess: Guess) => setGuesses([...guesses, newGuess])

  const guessesLeft = ((clues.length / 2) ** 2) - guesses.length;

  if (!isGameOver && guessesLeft === 0) {
    setIsGameOver(true);
  }
  
  const resetGuesses = () => setGuesses([]);

  const correctGuesses = guesses.filter(guess => guess.isCorrect);

  return (
    <div className="h-screen flex items-center justify-center">
      <QueryClientProvider client={client}>
        <Grid
          correctGuesses={correctGuesses}
          clues={clues}
          isAlreadyGuessed={isAlreadyGuessed}
          addGuess={addGuess}
          isGameOver={isGameOver}
        />
        <Guesses guessesLeft={guessesLeft} resetGuesses={resetGuesses} setIsGameOver={setIsGameOver} />
      </QueryClientProvider>
    </div>
  )
}

export default App
