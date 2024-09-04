import { FC } from 'react';
import './LetterCard.scss';

interface Props {
  letter: string;
  isSuccess?: boolean;
  isShow?: boolean;
  size?: 'sm' | 'md';
}

const LetterCard: FC<Props> = ({letter, isSuccess, isShow, size = 'md'}) => {
  return (
    <div className={`letter-card ${isSuccess && 'letter-card--success'} ${size === 'sm' && 'letter-card--sm'}`}>
      <span className={`letter-card__letter ${isShow && 'letter-card__letter--show'}`}>{letter}</span>
    </div>
  );
}

export default LetterCard;
