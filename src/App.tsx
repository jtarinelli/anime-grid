import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Menu, { Mode } from './components/Menu';
import Game from './components/Game';
import { useState } from 'react';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

function App() {
  const [selectedMode, setSelectedMode] = useState<Mode>(Mode.HALF_VOICE_ACTORS);

  return (
    <div className="h-screen w-full hor:flex box-border m-0 p-0">
      <QueryClientProvider client={client}>
        <Menu mode={selectedMode} onUpdateMode={(mode: Mode) => setSelectedMode(mode)} />
        <div className="h-full w-full hor:flex justify-center items-center">
          {Object.values(Mode).map(mode =>
            <Game mode={selectedMode} visible={selectedMode === mode} key={mode}
            />)}
        </div>
      </QueryClientProvider>
    </div>
  )
}

export default App
