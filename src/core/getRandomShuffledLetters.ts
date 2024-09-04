function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getUniqueLetters(words: string[]) {
  const allLetters = words.join('').split('');
  const uniqueLettersSet = new Set(allLetters);
  return Array.from(uniqueLettersSet);
}

export function getRandomShuffledLetters(words: string[]) {
  return shuffleArray(getUniqueLetters(words));
}
