import { useMutation, useQueryClient } from "@tanstack/react-query";
import Progress from '../../types/progress';
import { setProgress } from '../progress';
import Level from '../../types/level';
import arraysEqual from '../../core/arraysEqual';

export default function useSetProgress() {
  const queryClient = useQueryClient();
  const progress = queryClient.getQueryData<Progress>(['progress'])
  const level = queryClient.getQueryData<Level>(['level'])

  return useMutation<Progress, never, string>({
    mutationFn: (word: string) => {
      if (progress) {
        const solvedWords = [
          ...progress.solvedWords,
          word,
        ]
        if (level && arraysEqual(solvedWords, level.words)) {
          if (progress.levelNumber === 7) {
            return setProgress({
              levelNumber: 1,
              solvedWords: [],
            })
          }
          return setProgress({
            levelNumber: progress.levelNumber + 1,
            solvedWords: [],
          })
        }

        return setProgress({
          levelNumber: progress.levelNumber,
          solvedWords,
        })
      }
      return setProgress({
        levelNumber: 1,
        solvedWords: [word],
      })
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['progress'],
      })
      void queryClient.invalidateQueries({
        queryKey: ['level'],
      })
    }
  });
}
