export const useMouseEvents=()=>{
    const mouseOver=(event)=> {
        const className = event.target.className;
        event.target.className = className + " mouse-over";
      };
    const mouseOut=(event)=> {
        const className = event.target.className;
        if (className===undefined) return;
        event.target.className = className.replace(" mouse-over", "");
      };
      return [mouseOver,mouseOut]
}