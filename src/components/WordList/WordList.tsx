import { FC } from 'react';
import './WordList.scss';
import WordLine from '../WordLine/WordLine';

interface Props {
  words: string[];
}

const WordList: FC<Props> = ({words}) => {
  return (
    <div className="word-list">
      {
        words.map((word, index) => <WordLine key={index} word={word} />)
      }
    </div>
  );
}

export default WordList;
