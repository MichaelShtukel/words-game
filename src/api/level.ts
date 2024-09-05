import Level from '../types/level';
import axiosInstance from './axiosInstance';

export async function getLevel(levelNumber: number): Promise<Level> {
  let correctLevelNumber
  switch (levelNumber) {
    case 1:
      correctLevelNumber = 1;
      break;
    case 2:
      correctLevelNumber = 2;
      break;
    case 3:
      correctLevelNumber = 3;
      break;
    case 4:
      correctLevelNumber = 1;
      break;
    case 5:
      correctLevelNumber = 2;
      break;
    case 6:
      correctLevelNumber = 3;
      break;
    case 7:
      correctLevelNumber = 1;
      break;
    default:
      correctLevelNumber = 1;
      break;
  }
  const response = await axiosInstance.get<Level>(`/levels/${correctLevelNumber}.json`);
  return response.data;
}
