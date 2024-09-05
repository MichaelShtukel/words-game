import './App.scss';
import Level from './components/Level/Level';
import useGetProgress from './api/queries/useGetProgress';
import useTabsCounter from './api/queries/useTabsCounter';

function App() {
  const {data: progress, isLoading} = useGetProgress()
  const {
    tabsCounterModal,
  } = useTabsCounter()

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <div className="app">
      <Level levelNumber={progress?.levelNumber} solvedWords={progress?.solvedWords} />
      {tabsCounterModal}
    </div>
  );
}

export default App;
