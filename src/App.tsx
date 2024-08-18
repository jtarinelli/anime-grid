import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Grid from './components/Grid'

const client = new QueryClient();

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      <QueryClientProvider client={client}>
        <Grid />
      </QueryClientProvider>
    </div>
  )
}

export default App
