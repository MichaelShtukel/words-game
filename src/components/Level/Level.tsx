import React, { FC, useEffect, useState } from 'react';
import './Level.scss';
import useGetLevel from '../../api/queries/useGetLevel';
import Header from '../Header/Header';
import getLevelTitleByNumber from '../../core/utils/getLevelTitleByNumber';
import WordList from '../WordList/WordList';
import WordInputHOC from '../WordInput/WordInputHOC';
import getMinimalLetterSet from '../../core/utils/getMinimalLetterSet';
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
      setWordInputLetters(getMinimalLetterSet(level.words))
    }
  }, [level, wordInputLetters])

  useEffect(() => {
    if (!isAnimationMode && selectedWord && level && level.words.indexOf(selectedWord) !== -1 && solvedWords.indexOf(selectedWord) === -1) {
      setSelectedWord('')
      setWordInputLetters([])
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
          <WordInputHOC letters={wordInputLetters} setSelectedWord={setSelectedWord}>
            <div className="word-input__preword">
              <WordLine size="sm" word={selectedWord} isShow />
            </div>
          </WordInputHOC>
        )
      }
    </div>
  );
}

export default Level;
