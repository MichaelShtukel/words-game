import { useMutation } from "@tanstack/react-query";
import Progress from '../../types/progress';
import { setProgress } from '../progress';

export default function useSetProgress() {
  return useMutation<Progress, never, Progress>({
    mutationFn: (progress: Progress) => setProgress(progress),
  });
}
