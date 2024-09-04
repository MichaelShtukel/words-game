import { useQuery } from "@tanstack/react-query";
import Level from '../../types/level';
import { getLevel } from '../level';

export default function useGetLevel (levelNumber: number = 1) {
  return useQuery<Level>({
    queryKey: [levelNumber],
    queryFn: () => getLevel(levelNumber!),
    enabled: levelNumber !== undefined,
  });
}
