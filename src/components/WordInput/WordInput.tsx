import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useRef } from 'react';
import './WordInput.scss';
import useDesktopDrawing from '../../core/hooks/useDesktopDrawing';

interface Props {
  letters: string[];
  setSelectedWord: Dispatch<SetStateAction<string>>
}

const WordInput: FC<PropsWithChildren<Props>> = ({letters, setSelectedWord, children}) => {
  const angle = 360 / letters.length;
  const svgRef = useRef<SVGSVGElement>(null);

  const {
    selectedLetters,
    d,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleLetterMouseMove,
  } = useDesktopDrawing(svgRef, setSelectedWord)

  useEffect(() => {
    const selectedWord = selectedLetters.map(selectedLetter => selectedLetter.letter).join('');
    setSelectedWord(selectedWord)
  }, [selectedLetters, setSelectedWord])

  return (
    <div className="word-input" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {children}
      <div className="word-input__circle">
        <svg className="word-input__svg" ref={svgRef}>
          <path d={d} stroke="#638EC4" strokeWidth="10" fill="none" />
        </svg>
        {letters.map((letter, index) => {
          const rotateAngle = angle * index;
          return (
            <div
              key={index}
              className="word-input__circle-letter"
              style={{transform: `rotate(${rotateAngle}deg) translate(125px) rotate(-${rotateAngle}deg)`}}
              onMouseDown={event => {
                handleMouseDown(index.toString(), letter, event)
              }}
              onMouseMove={event => handleLetterMouseMove(index.toString(), letter, event)}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WordInput;
