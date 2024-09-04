import { FC } from 'react';
import './WordLine.scss';
import LetterCard from '../LetterCard/LetterCard';

interface Props {
  word: string;
}

const WordLine: FC<Props> = ({word}) => {
  const letters = word.split('')

  return (
    <div className="word-line">
      {
        letters.map((letter, index) => <LetterCard key={index} letter={letter} />)
      }
    </div>
  );
}

export default WordLine;
