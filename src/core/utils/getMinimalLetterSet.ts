export default function getMinimalLetterSet(words: string[]) {
  // Объект для хранения максимального количества каждой буквы
  const maxLetterCounts: Record<string, number> = {};

  // Для каждого слова подсчитываем количество каждой буквы
  words.forEach(word => {
    const letterCounts: Record<string, number> = {};

    // Подсчитываем количество букв в слове
    word.split('').forEach(letter => {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    });

    // Обновляем глобальный счетчик с максимальными значениями
    Object.entries(letterCounts).forEach(([letter, count]) => {
      maxLetterCounts[letter] = Math.max(maxLetterCounts[letter] || 0, count);
    });
  });

  // Формируем минимальный набор букв
  const result: string[] = [];
  Object.entries(maxLetterCounts).forEach(([letter, count]) => {
    for (let i = 0; i < count; i++) {
      result.push(letter);
    }
  });

  return result;
}
