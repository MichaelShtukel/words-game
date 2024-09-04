import Level from '../types/level';
import axiosInstance from './axiosInstance';

export async function getLevel(levelNumber: number): Promise<Level> {
  const response = await axiosInstance.get<Level>(`/levels/${levelNumber}.json`);
  return response.data;
}
