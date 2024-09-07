import { MousePosition, SelectedLetterData } from '../../types/selectedLetterData';

export function generatePathData(selectedLetters: SelectedLetterData[], mousePosition?: MousePosition) {
  if (!selectedLetters.length) {
    return '';
  }

  let d = '';
  selectedLetters.forEach((letter, index) => {
    if (index === 0) {
      d += `M ${letter.x} ${letter.y} `;
    } else {
      d += `L ${letter.x} ${letter.y} `;
    }
  });

  if (mousePosition) {
    d += `L ${mousePosition.x} ${mousePosition.y}`;
  }

  return d;
}
