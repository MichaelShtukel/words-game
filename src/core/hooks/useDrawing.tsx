import React, { Dispatch, MouseEventHandler, RefObject, SetStateAction, useState } from 'react';
import { MousePosition, SelectedLetterData } from '../../types/selectedLetterData';
import { generatePathData } from '../utils/generatePathData';
import { getCenterCoordinates } from '../utils/getCenterCoordinates';

export default function useDrawing(
  svgRef: RefObject<SVGSVGElement>,
  setSelectedWord: Dispatch<SetStateAction<string>>,
) {
  const [selectedLetters, setSelectedLetters] = useState<SelectedLetterData[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | undefined>(undefined);

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
    const isNotSelectedBefore = !selectedLetters.find(letter => letter.id === id);
    if (isDrawing && selectedLetters.length > 0 && isNotSelectedBefore) {
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

  return {
    selectedLetters,
    d,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleLetterMouseMove,
  }
}
