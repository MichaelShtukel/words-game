export default function isIntersecting(rect: any, point: any) {
  const withinXBounds = point.clientX >= rect.left && point.clientX <= rect.right;
  const withinYBounds = point.clientY >= rect.top && point.clientY <= rect.bottom;

  return withinXBounds && withinYBounds;
}
