import { FC } from 'react';
import './Level.scss';
import useGetLevel from '../../api/queries/useGetLevel';
import Header from '../Header/Header';
import getLevelTitleByNumber from '../../core/getLevelTitleByNumber';
import WordList from '../WordList/WordList';
import WordInput from '../WordInput/WordInput';
import { getRandomShuffledLetters } from '../../core/getRandomShuffledLetters';

interface Props {
  levelNumber?: number;
}

const Level: FC<Props> = ({levelNumber}) => {
  const {data: level, isLoading} = useGetLevel(levelNumber);

  if (!level) {
    return <span>Sorry, something went wrong...</span>
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  const sortedWords = level.words.sort((a, b) => a.length - b.length)
  const wordInputLetters = getRandomShuffledLetters(level.words)

  return (
    <div className="level">
      <Header>{getLevelTitleByNumber(levelNumber)}</Header>
      <WordList words={sortedWords} />
      <WordInput letters={wordInputLetters} />
    </div>
  );
}

export default Level;
