import React from 'react';

export function getCenterCoordinates(event: React.MouseEvent<HTMLDivElement, MouseEvent>, rootLeft: number, rootTop: number) {
  const targetElement = event.currentTarget;
  const {left, top, width, height} = targetElement.getBoundingClientRect();
  const x = left + width / 2 - rootLeft;
  const y = top + height / 2 - rootTop;

  return {
    x,
    y,
  }
}
