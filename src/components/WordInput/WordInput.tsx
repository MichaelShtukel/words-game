import React, {
  Dispatch,
  FC,
  MouseEventHandler,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import './WordInput.scss';
import { generatePathData } from '../../core/generatePathData';
import { MousePosition, SelectedLetterData } from '../../types/selectedLetterData';
import { getCenterCoordinates } from '../../core/getCenterCoordinates';

interface Props {
  letters: string[];
  setSelectedWord: Dispatch<SetStateAction<string>>
}

const WordInput: FC<PropsWithChildren<Props>> = ({letters, setSelectedWord, children}) => {
  const angle = 360 / letters.length;

  const svgRef = useRef<SVGSVGElement>(null);

  const [selectedLetters, setSelectedLetters] = useState<SelectedLetterData[]>([]);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | undefined>(undefined);

  useEffect(() => {
    const selectedWord = selectedLetters.map(selectedLetter => selectedLetter.letter).join('');
    setSelectedWord(selectedWord)
  }, [selectedLetters, setSelectedWord])

  const d = generatePathData(selectedLetters, mousePosition)

  const handleMouseDown = (id: string, letter: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDrawing(true)
    const {left, top} = svgRef.current!.getBoundingClientRect();
    const {x, y} = getCenterCoordinates(event, left, top);
    setSelectedLetters([
      ...selectedLetters,
      {
        id,
        letter,
        x,
        y,
      },
    ]);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isDrawing && selectedLetters.length > 0) {
      const {left, top} = svgRef.current!.getBoundingClientRect();
      setMousePosition({x: event.clientX - left, y: event.clientY - top});
    }
  };

  const handleMouseUp = () => {
    setSelectedLetters([])
    setSelectedWord('')
    setIsDrawing(false);
    setMousePosition(undefined)
  };

  const handleLetterMouseMove = (id: string, letter: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDrawing && selectedLetters.length > 0 && selectedLetters[selectedLetters.length - 1].id !== id) {
      const {left, top} = svgRef.current!.getBoundingClientRect();
      const {x, y} = getCenterCoordinates(event, left, top);
      setSelectedLetters([
        ...selectedLetters,
        {
          id,
          letter,
          x,
          y,
        },
      ]);
    }
  };

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
              onMouseUp={handleMouseUp}
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
