import { FC } from 'react';
import './VictoryScreen.scss';
import getLevelTitleByNumber from '../../core/utils/getLevelTitleByNumber';
import LetterCard from '../LetterCard/LetterCard';
import useSetProgress from '../../api/queries/useSetProgress';

interface Props {
  levelNumber: number;
}

const VictoryScreen: FC<Props> = ({levelNumber}) => {
  const {mutate: setProgress} = useSetProgress()

  return (
    <div className="victory-screen">
      <div className="victory-screen__container">
        <div className="victory-screen__title">
          <span>{getLevelTitleByNumber(levelNumber - 1)} пройден</span>
          <span className="victory-screen__description">Изумительно!</span>
        </div>
        <div onClick={() => setProgress('')}>
          <LetterCard letter={getLevelTitleByNumber(levelNumber)} isSuccess isShow size="lg" />
        </div>
      </div>
    </div>
  );
}

export default VictoryScreen;
