import React, { FC, useEffect, useRef, useState } from 'react';
import './Level.scss';
import useGetLevel from '../../api/queries/useGetLevel';
import Header from '../Header/Header';
import getLevelTitleByNumber from '../../core/getLevelTitleByNumber';
import WordList from '../WordList/WordList';
import WordInput from '../WordInput/WordInput';
import { getRandomShuffledLetters } from '../../core/getRandomShuffledLetters';
import WordLine from '../WordLine/WordLine';
import WordStatus from '../../types/wordStatus';
import isDeepEqual from '../../core/isDeepEqual';
import Confetti from '../Confetti/Confetti';

interface Props {
  levelNumber?: number;
  solvedWords?: string[];
}

const Level: FC<Props> = ({levelNumber, solvedWords = []}) => {
  const {data: level, isLoading} = useGetLevel(levelNumber);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [wordInputLetters, setWordInputLetters] = useState<string[]>([]);
  const [isAnimationMode, setIsAnimationMode] = useState<boolean>(false);
  const localSolvedWords = useRef<string[]>(solvedWords); // временное решение
  const wordStatuses = useRef<WordStatus[]>([]);

  useEffect(() => {
    if (wordInputLetters.length === 0 && level && level.words.length !== 0) {
      setWordInputLetters(getRandomShuffledLetters(level.words))
    }
  }, [level, wordInputLetters])

  useEffect(() => {
    if (level && level.words.length !== 0) {
      const newWordStatuses = level.words
        .sort((a, b) => a.length - b.length)
        .map(word => ({
          word,
          isSolved: word === selectedWord || localSolvedWords.current.indexOf(word) !== -1,// solvedWords.indexOf(word) !== -1,
        }))
      if (wordStatuses.current.length === 0) {
        wordStatuses.current = newWordStatuses;
      }
      const isEqual = isDeepEqual(wordStatuses.current, newWordStatuses);
      if (!isEqual) {
        wordStatuses.current = newWordStatuses;
        // здесь будет сохранение статуса
        localSolvedWords.current = [
          ...localSolvedWords.current,
          selectedWord,
        ];
        setIsAnimationMode(true)
        setTimeout(() => {
          setIsAnimationMode(false)
        }, 2000)
      }
    }
  }, [level, selectedWord]); // , solvedWords]);

  if (!level) {
    return <span>Sorry, something went wrong...</span>
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  return (
    <div className="level">
      <Header>{getLevelTitleByNumber(levelNumber)}</Header>
      <WordList wordStatuses={wordStatuses.current} />
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
