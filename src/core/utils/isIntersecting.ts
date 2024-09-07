export default function isIntersecting(rect: any, point: any) {
  const withinXBounds = point.pageX >= rect.left && point.pageX <= rect.right;
  const withinYBounds = point.pageY >= rect.top && point.pageY <= rect.bottom;

  return withinXBounds && withinYBounds;
}
