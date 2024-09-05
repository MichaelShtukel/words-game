import { FC } from 'react';
import './WordLine.scss';
import LetterCard from '../LetterCard/LetterCard';

interface Props {
  word: string;
  isSuccess?: boolean;
  isShow?: boolean;
  size?: 'sm' | 'md';
}

const WordLine: FC<Props> = ({word, isSuccess, isShow, size = 'md'}) => {
  const letters = word.split('')

  return (
    <div className={`word-line ${size === 'sm' && 'word-line--sm'}`}>
      {
        letters.map((letter, index) => (
          <LetterCard
            key={index}
            letter={letter}
            isShow={isShow}
            isSuccess={isSuccess}
            size={size}
          />
        ))
      }
    </div>
  );
}

export default WordLine;
