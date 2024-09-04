import './App.scss';
import Level from './components/Level/Level';
import useGetProgress from './api/queries/useGetProgress';

function App() {
  const { data: progress, isLoading } = useGetProgress()

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <div className="app">
      <Level levelNumber={progress?.levelNumber} />
    </div>
  );
}

export default App;
