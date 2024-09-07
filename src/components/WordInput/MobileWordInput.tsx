import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useRef } from 'react';
import './WordInput.scss';
import useMobileDrawing from '../../core/hooks/useMobileDrawing';

interface Props {
  letters: string[];
  setSelectedWord: Dispatch<SetStateAction<string>>
}

const MobileWordInput: FC<PropsWithChildren<Props>> = ({letters, setSelectedWord, children}) => {
  const angle = 360 / letters.length;
  const svgRef = useRef<SVGSVGElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const {
    selectedLetters,
    d,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useMobileDrawing(svgRef, circleRef, setSelectedWord)

  useEffect(() => {
    const selectedWord = selectedLetters.map(selectedLetter => selectedLetter.letter).join('');
    setSelectedWord(selectedWord)
  }, [selectedLetters, setSelectedWord])

  return (
    <div
      className="word-input"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
      <div className="word-input__circle" ref={circleRef}>
        <svg className="word-input__svg" ref={svgRef}>
          <path d={d} stroke="#638EC4" strokeWidth="10" fill="none" />
        </svg>
        {letters.map((letter, index) => {
          const rotateAngle = angle * index;
          return (
            <div
              key={index}
              className="word-input__circle-letter"
              data-id={index}
              data-letter={letter}
              style={{transform: `rotate(${rotateAngle}deg) translate(125px) rotate(-${rotateAngle}deg)`}}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MobileWordInput;
