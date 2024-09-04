import Progress from '../types/progress';

// прогресс должен сохраняться на сервер и/или в сервис воркер, но для тестового сделан быстрый вариант с сохранением в localStorage
export function getProgress(): Progress {
  const response = localStorage.getItem('progress');
  return response ? JSON.parse(response) : '';
}

export function setProgress(progress: Progress): Promise<Progress> {
  localStorage.setItem('progress', JSON.stringify(progress))
  return new Promise(resolve => resolve(progress));
}
