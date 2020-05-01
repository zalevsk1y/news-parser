import { useToggleContent } from '@news-parser/entities/sidebarTemplate/hooks/useToggleContent';

export type MouseOver = (event: MouseEvent|Event) => void;
export type MouseOut = (event: MouseEvent|Event) => void;
export type mouseClickHandler= (event: MouseEvent | Event)=>void
export type UseMouseEvents = (frameRef: HTMLIFrameElement|null) => [MouseOver, MouseOut,mouseClickHandler];
/**
 * Custom hook for handling mouse events.
 * @returns {[MouseOver, MouseOut]} An array containing the mouseOver and mouseOut event handler functions.
 *
 */

export const useMouseEvents: UseMouseEvents = (frameRef) => {
  const [selectElement, removeElement] = useToggleContent(frameRef);
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
  const mouseClickHandler = (event: MouseEvent | Event) => {
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    const { className } = targetElement;
    if (className.search(' parser-select') === -1) {
      targetElement.className = `${className} parser-select`;
      selectElement(targetElement);
    } else {
      targetElement.className = className.replace(' parser-select', '');
      removeElement(targetElement);
    }
  };
  return [mouseOver, mouseOut,mouseClickHandler]
}