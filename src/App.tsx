import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Anime } from './queries/animeSearch';
import generateClues, { Mode } from './clues/generateClues';
import Menu from './components/Menu';
import Game from './components/Game';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

const cluesPerSide = 3;

const clues = generateClues(cluesPerSide, Mode.ALL_RANDOM);

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

  return (
    <div className="h-screen w-full md:flex box-border m-0 p-0">
      <QueryClientProvider client={client}>
        <Menu />
        <div className="h-full w-full md:flex justify-center items-center">
          <Game clues={clues} />
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
