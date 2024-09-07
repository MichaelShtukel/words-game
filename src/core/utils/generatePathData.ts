import { MousePosition, SelectedLetterData } from '../../types/selectedLetterData';

export function generatePathData(selectedLetters: SelectedLetterData[], mousePosition?: MousePosition) {
  if (!selectedLetters.length) {
    return '';
  }

  let d = '';

  // Начальная точка
  d += `M ${selectedLetters[0].centerX} ${selectedLetters[0].centerY} `;

  // Проходим по всем точкам, кроме последней
  for (let i = 1; i < selectedLetters.length; i++) {
    const prevLetter = selectedLetters[i - 1];
    const currentLetter = selectedLetters[i];

    // Вычисляем среднюю точку между предыдущей и текущей точками
    const midX = (prevLetter.centerX + currentLetter.centerX) / 2;
    const midY = (prevLetter.centerY + currentLetter.centerY) / 2;

    // Рассчитываем направление перпендикулярного вектора, но теперь инвертируем его для изгиба наружу
    const vectorX = currentLetter.centerY - prevLetter.centerY;
    const vectorY = -(currentLetter.centerX - prevLetter.centerX);

    // Контрольная точка направляется наружу от средней точки
    const controlX = midX + vectorX * 0.2;  // Коэффициент 0.2 для контроля изгиба
    const controlY = midY + vectorY * 0.2;

    // Кривая через контрольную точку
    d += `Q ${controlX} ${controlY}, ${currentLetter.centerX} ${currentLetter.centerY} `;
  }

  // Последняя точка
  const lastLetter = selectedLetters[selectedLetters.length - 1];
  d += `L ${lastLetter.centerX} ${lastLetter.centerY} `;

  // Если указана позиция мыши, рисуем линию до неё
  if (mousePosition) {
    d += `L ${mousePosition.centerX} ${mousePosition.centerY}`;
  }

  return d;
}
