import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import CircleLetter from '../../types/circleLetter';
import isIntersecting from '../utils/isIntersecting';
import useDrawing from './useDrawing';

export default function useMobileDrawing(
  svgRef: RefObject<SVGSVGElement>,
  circleRef: RefObject<HTMLDivElement>,
  setSelectedWord: Dispatch<SetStateAction<string>>,
) {
  const {
    selectedLetters,
    setSelectedLetters,
    isDrawing,
    setIsDrawing,
    setMousePosition,
    d,
  } = useDrawing()

  const [circleLetters, setCircleLetters] = useState<CircleLetter[]>([]);

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

  const onTouchStart = (event: any) => {
    setIsDrawing(true)
    let newCircleLetters: CircleLetter[] = []
    if (svgRef.current && circleRef.current) {
      const {left: svgLeft, top: svgTop} = svgRef.current.getBoundingClientRect();
      newCircleLetters = Array.prototype.slice.call(circleRef.current.children)
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
    const res = newCircleLetters?.find(i => isIntersecting(i, event.targetTouches[0]))
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
