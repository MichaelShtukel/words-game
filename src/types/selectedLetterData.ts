export interface MousePosition {
  centerX: number;
  centerY: number;
}

export interface SelectedLetterData extends MousePosition {
  id: string;
  letter: string;
}
