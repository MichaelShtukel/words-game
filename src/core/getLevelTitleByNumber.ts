export default function getLevelTitleByNumber (levelNumber?: number) {
  return levelNumber ? `Уровень ${levelNumber}` : 'Уровень 1';
}
