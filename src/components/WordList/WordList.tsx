import { FC } from 'react';
import './WordList.scss';
import WordLine from '../WordLine/WordLine';
import WordStatus from '../../types/wordStatus';

interface Props {
  wordStatuses: WordStatus[];
}

const WordList: FC<Props> = ({wordStatuses}) => {
  return (
    <div className="word-list">
      {
        wordStatuses.map(({word, isSolved}, index) => (
          <WordLine
            key={index}
            word={word}
            isShow={isSolved}
            isSuccess={isSolved}
          />
        ))
      }
    </div>
  );
}

export default WordList;
