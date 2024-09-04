export interface MousePosition {
  x: number;
  y: number;
}

export interface SelectedLetterData extends MousePosition {
  id: string;
  letter: string;
}
