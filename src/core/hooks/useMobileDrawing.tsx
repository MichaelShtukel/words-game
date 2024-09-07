import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import { MousePosition, SelectedLetterData } from '../../types/selectedLetterData';
import CircleLetter from '../../types/circleLetter';
import { generatePathData } from '../utils/generatePathData';
import isIntersecting from '../utils/isIntersecting';

export default function useMobileDrawing(
  svgRef: RefObject<SVGSVGElement>,
  circleRef: RefObject<HTMLDivElement>,
  setSelectedWord: Dispatch<SetStateAction<string>>,
) {
  const [selectedLetters, setSelectedLetters] = useState<SelectedLetterData[]>([]);
  const [circleLetters, setCircleLetters] = useState<CircleLetter[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | undefined>(undefined);

  const d = generatePathData(selectedLetters, mousePosition)

  useEffect(() => {
    const handleTouchMove = (event: any) => {
      event.preventDefault();
    };

    if (circleRef.current) {
      circleRef.current.addEventListener('touchmove', handleTouchMove, {passive: false});
    }

    return () => {
      if (circleRef.current) {
        circleRef.current.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [circleRef]);

  useEffect(() => {
    if (svgRef.current && circleRef.current && !circleLetters.length) {
      const {left: svgLeft, top: svgTop} = svgRef.current.getBoundingClientRect();
      const newCircleLetters = Array.prototype.slice.call(circleRef.current.children)
        .filter(i => i.className === 'word-input__circle-letter')
        .map(item => {
          const i = item.getBoundingClientRect()
          const centerX = i.left + i.width / 2 - svgLeft;
          const centerY = i.top + i.height / 2 - svgTop;
          return {
            bottom: i.bottom,
            height: i.height,
            left: i.left,
            right: i.right,
            top: i.top,
            width: i.width,
            x: i.x,
            y: i.y,
            centerX,
            centerY,
            id: item.dataset.id,
            letter: item.dataset.letter,
          }
        });
      setCircleLetters(newCircleLetters)
    }
  })

  const onTouchStart = (event: any) => {
    setIsDrawing(true)
    const res = circleLetters?.find(i => isIntersecting(i, event.targetTouches[0]))
    if (res) {
      const {id, letter, centerX, centerY} = res;
      setSelectedLetters([
        ...selectedLetters,
        {
          id,
          letter,
          x: centerX,
          y: centerY,
        },
      ]);
    }
  }

  const onTouchEnd = () => {
    setSelectedLetters([])
    setSelectedWord('')
    setIsDrawing(false);
    setMousePosition(undefined)
  }

  const onTouchMove = (event: any) => {
    if (event.targetTouches.length && isDrawing) {
      const res = circleLetters?.find(i => isIntersecting(i, event.targetTouches[0]))
      if (res) {
        const {id, letter, centerX, centerY} = res;
        const isNotSelectedBefore = !selectedLetters.find(letter => letter.id === id);
        if (isNotSelectedBefore) {
          setSelectedLetters([
            ...selectedLetters,
            {
              id,
              letter,
              x: centerX,
              y: centerY,
            },
          ]);
        }
      } else {
        if (selectedLetters.length > 0) {
          const {left, top} = svgRef.current!.getBoundingClientRect();
          setMousePosition({x: event.targetTouches[0].clientX - left, y: event.targetTouches[0].clientY - top});
        }
      }
    }
  }

  return {
    selectedLetters,
    d,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
