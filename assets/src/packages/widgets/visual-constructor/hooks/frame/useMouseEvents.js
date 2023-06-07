export const useMouseEvents = () => {
  const mouseOver = (event) => {
    if (event.target.tagName === 'svg'|| event.target.tagName === 'path') return;
    const className = event.target.className;
    event.target.className = className + " mouse-over";
  };
  const mouseOut = (event) => {
    if (event.target.tagName === 'svg'|| event.target.tagName === 'path') return;
    const className = event.target.className;
    event.target.className = className.replace(" mouse-over", "");
  };
  return [mouseOver, mouseOut]
}