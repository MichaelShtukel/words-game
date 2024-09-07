import React, { Dispatch, MouseEventHandler, RefObject, SetStateAction } from 'react';
import { getCenterCoordinates } from '../utils/getCenterCoordinates';
import useDrawing from './useDrawing';

export default function useDesktopDrawing(
  svgRef: RefObject<SVGSVGElement>,
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

  const handleMouseDown = (id: string, letter: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDrawing(true)
    const {left, top} = svgRef.current!.getBoundingClientRect();
    const {x, y} = getCenterCoordinates(event, left, top);
    setSelectedLetters([
      ...selectedLetters,
      {
        id,
        letter,
        centerX: x,
        centerY: y,
      },
    ]);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isDrawing && selectedLetters.length > 0) {
      const {left, top} = svgRef.current!.getBoundingClientRect();
      setMousePosition({centerX: event.clientX - left, centerY: event.clientY - top});
    }
  };

  const handleMouseUp = () => {
    setSelectedLetters([])
    setSelectedWord('')
    setIsDrawing(false);
    setMousePosition(undefined)
  };

  const handleLetterMouseMove = (id: string, letter: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const isNotSelectedBefore = !selectedLetters.find(letter => letter.id === id);
    if (isDrawing && selectedLetters.length > 0 && isNotSelectedBefore) {
      const {left, top} = svgRef.current!.getBoundingClientRect();
      const {x, y} = getCenterCoordinates(event, left, top);
      setSelectedLetters([
        ...selectedLetters,
        {
          id,
          letter,
          centerX: x,
          centerY: y,
        },
      ]);
    }
  };

  return {
    selectedLetters,
    d,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleLetterMouseMove,
  }
}
