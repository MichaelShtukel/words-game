import { useQuery } from "@tanstack/react-query";
import Progress from '../../types/progress';
import { getProgress } from '../progress';

export default function useGetProgress() {
  return useQuery<Progress>({
    queryKey: ['progress'],
    queryFn: getProgress,
  });
}
