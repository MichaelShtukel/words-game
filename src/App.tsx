import './App.scss';
import Level from './components/Level/Level';
import useGetProgress from './api/queries/useGetProgress';
import useTabsCounter from './core/hooks/useTabsCounter';
import VictoryScreen from './components/VictoryScreen/VictoryScreen';

function App() {
  const {data: progress, isLoading} = useGetProgress()
  const {
    tabsCounterModal,
  } = useTabsCounter()

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (progress && progress.showVictoryScreen) {
    return (
      <div className="app">
        <VictoryScreen levelNumber={progress.levelNumber} />
      </div>
    );
  }

  return (
    <div className="app">
      <Level levelNumber={progress?.levelNumber} solvedWords={progress?.solvedWords} />
      {tabsCounterModal}
    </div>
  );
}

export default App;
