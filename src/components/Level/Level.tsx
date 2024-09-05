import React, { FC, useEffect, useState } from 'react';
import './Level.scss';
import useGetLevel from '../../api/queries/useGetLevel';
import Header from '../Header/Header';
import getLevelTitleByNumber from '../../core/getLevelTitleByNumber';
import WordList from '../WordList/WordList';
import WordInput from '../WordInput/WordInput';
import { getRandomShuffledLetters } from '../../core/getRandomShuffledLetters';
import WordLine from '../WordLine/WordLine';
import Confetti from '../Confetti/Confetti';
import useSetProgress from '../../api/queries/useSetProgress';

interface Props {
  levelNumber?: number;
  solvedWords?: string[];
}

const Level: FC<Props> = ({levelNumber, solvedWords = []}) => {
  const {data: level, isLoading} = useGetLevel(levelNumber);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [wordInputLetters, setWordInputLetters] = useState<string[]>([]);
  const [isAnimationMode, setIsAnimationMode] = useState<boolean>(false);

  const {mutate: setProgress} = useSetProgress()

  useEffect(() => {
    if (wordInputLetters.length === 0 && level && level.words.length !== 0) {
      setWordInputLetters(getRandomShuffledLetters(level.words))
    }
  }, [level, wordInputLetters])

  useEffect(() => {
    if (!isAnimationMode && selectedWord && level && level.words.indexOf(selectedWord) !== -1 && solvedWords.indexOf(selectedWord) === -1) {
      setProgress(selectedWord)
      setIsAnimationMode(true)
      setTimeout(() => {
        setIsAnimationMode(false)
      }, 2000)
    }
  }, [isAnimationMode, level, selectedWord, setProgress, solvedWords]);

  if (!level) {
    return <span>Sorry, something went wrong...</span>
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  const wordStatuses = level.words
    .sort((a, b) => a.length - b.length)
    .map(word => ({
      word,
      isSolved: solvedWords.indexOf(word) !== -1,
    }))

  return (
    <div className="level">
      <Header>{getLevelTitleByNumber(levelNumber)}</Header>
      <WordList wordStatuses={wordStatuses} />
      {
        isAnimationMode ? (
          <Confetti />
        ) : (
          <WordInput letters={wordInputLetters} setSelectedWord={setSelectedWord}>
            <div className="word-input__preword">
              <WordLine size="sm" word={selectedWord} isShow />
            </div>
          </WordInput>
        )
      }
    </div>
  );
}

export default Level;
