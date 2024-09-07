import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Anime } from './queries/animeSearch';
import generateClues, { Mode } from './clues/generateClues';
import Menu from './components/Menu';
import Game from './components/Game';
import { useState } from 'react';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

const cluesPerSide = 3;

export type CellCoordinates = {
  row: number;
  col: number;
}

export type Guess = {
  anime: Anime;
  isCorrect: boolean;
  cellCoordinates: CellCoordinates;
}


const clues = {
  [Mode.HALF_VOICE_ACTORS]: generateClues(cluesPerSide, Mode.HALF_VOICE_ACTORS),
  [Mode.BABY]: generateClues(cluesPerSide, Mode.BABY),
  [Mode.ALL_VOICE_ACTORS]: generateClues(cluesPerSide, Mode.ALL_VOICE_ACTORS),
  [Mode.ALL_RANDOM]: generateClues(cluesPerSide, Mode.ALL_RANDOM),
}

function App() {
  const [mode, setMode] = useState<Mode>(Mode.HALF_VOICE_ACTORS);

  // TODO: figure out how to map Games instead of code duplication
  return (
    <div className="h-screen w-full md:flex box-border m-0 p-0">
      <QueryClientProvider client={client}>
        <Menu mode={mode} onUpdateMode={(mode: Mode) => setMode(mode)} />
        <div className="h-full w-full md:flex justify-center items-center">
          <Game clues={clues[Mode.HALF_VOICE_ACTORS]} visible={mode === Mode.HALF_VOICE_ACTORS} />
          <Game clues={clues[Mode.BABY]} visible={mode === Mode.BABY} />
          <Game clues={clues[Mode.ALL_VOICE_ACTORS]} visible={mode === Mode.ALL_VOICE_ACTORS} />
          <Game clues={clues[Mode.ALL_RANDOM]} visible={mode === Mode.ALL_RANDOM} />
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
