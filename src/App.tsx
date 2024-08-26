import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Grid from './components/Grid'
import { useState } from 'react';
import { Guesses } from './components/Guesses';
import { Anime } from './queries/animeSearch';
import generateClues from './clues/generateClues';
import Results from './components/Results';

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
const cluesPerSide = 3;
const numberOfClues = cluesPerSide * 2;

const clues = generateClues(numberOfClues, true);

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

  const isAlreadyGuessed = (animeId: number) => guesses.some(guess => guess.anime.id === animeId);
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

  // want the guesses to wrap to the bottom when screen gets narrower
  return (
    <div className="h-screen w-full box-border m-0 p-0">
      <QueryClientProvider client={client}>
        <div className="h-full min-w-50% flex justify-center items-center p-10">
          <Grid
            correctGuesses={correctGuesses}
            clues={clues}
            isAlreadyGuessed={isAlreadyGuessed}
            addGuess={addGuess}
            isGameOver={isGameOver}
          />
          <Guesses
            guessesLeft={guessesLeft}
            onGiveUp={giveUp}
            onReset={reset}
          />
          {isGameOver &&
            <button onClick={() => setShowResults(true)}>See results</button>}
          {showResults &&
            <Results
              numberOfClues={numberOfClues}
              guesses={guesses}
              onClose={() => setShowResults(false)}
            />}
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
