

export type MouseOver = (event: MouseEvent|Event) => void;
export type MouseOut = (event: MouseEvent|Event) => void;
export type UseMouseEvents = () => [MouseOver, MouseOut];
/**
 * Custom hook for handling mouse events.
 * @returns {[MouseOver, MouseOut]} An array containing the mouseOver and mouseOut event handler functions.
 *
 */

export const useMouseEvents: UseMouseEvents = () => {
  const mouseOver:MouseOver = (event) => {
    const targetElemnt=event.target as HTMLElement;
    if (targetElemnt.tagName === 'svg' || targetElemnt.tagName === 'path') return;
    const {className} = targetElemnt;
    targetElemnt.className = `${className  } mouse-over`;
  };
  const mouseOut:MouseOut = (event) => {
    const targetElemnt=event.target as HTMLElement;
    if (targetElemnt.tagName === 'svg' || targetElemnt.tagName === 'path') return;
    const {className} = targetElemnt;
    targetElemnt.className = className.replace(" mouse-over", "");
  };
  return [mouseOver, mouseOut]
}