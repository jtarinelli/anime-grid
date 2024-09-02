import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Grid from './components/Grid'
import { useState } from 'react';
import { Guesses } from './components/Guesses';
import { Anime } from './queries/animeSearch';
import generateClues, { Mode } from './clues/generateClues';
import Results from './components/Results';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

const cluesPerSide = 3;
const numberOfClues = cluesPerSide * 2;

const clues = generateClues(cluesPerSide, Mode.ALL_VOICE_ACTORS);

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
  const [showResults, setShowResults] = useState<boolean>(false);

  const isAlreadyGuessed = (animeId: number) => guesses.some(guess => guess.isCorrect && guess.anime.id === animeId);
  const addGuess = (newGuess: Guess) => setGuesses([...guesses, newGuess])

  const guessesLeft = ((clues.length / 2) ** 2) - guesses.length;

  if (!isGameOver && guessesLeft === 0) {
    setIsGameOver(true);
    setShowResults(true);
  }

  const reset = () => {
    setGuesses([]);
    setIsGameOver(false);
  };

  const giveUp = () => {
    setIsGameOver(true);
    setShowResults(true)
  }

  const correctGuesses = guesses.filter(guess => guess.isCorrect);

  return (
    <div className="h-screen w-full box-border m-0 p-0">
      <QueryClientProvider client={client}>
        <div className="h-full min-w-50% md:flex justify-center items-center p-10">
          <Grid
            correctGuesses={correctGuesses}
            clues={clues}
            isAlreadyGuessed={isAlreadyGuessed}
            addGuess={addGuess}
            isGameOver={isGameOver}
          />
          <Guesses
            guessesLeft={guessesLeft}
            isGameOver={isGameOver}
            onGiveUp={giveUp}
            onReset={reset}
            onShowResults={() => setShowResults(true)}
          />
          {showResults &&
            <Results
              numberOfClues={numberOfClues}
              correctGuesses={correctGuesses}
              onClose={() => setShowResults(false)}
            />}
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
