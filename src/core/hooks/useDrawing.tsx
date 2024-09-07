import { useState } from 'react';
import { MousePosition, SelectedLetterData } from '../../types/selectedLetterData';
import { generatePathData } from '../utils/generatePathData';

export default function useDrawing() {
  const [selectedLetters, setSelectedLetters] = useState<SelectedLetterData[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition | undefined>(undefined);

  const d = generatePathData(selectedLetters, mousePosition)

  return {
    selectedLetters,
    setSelectedLetters,
    isDrawing,
    setIsDrawing,
    setMousePosition,
    d,
  }
}
