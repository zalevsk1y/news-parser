export const useMouseEvents=()=>{
    const mouseOver=(event)=> {
        const className = event.target.className;
        event.target.className = className + " mouse-over";
      },
      mouseOut=(event)=> {
        const className = event.target.className;
        event.target.className = className.replace(" mouse-over", "");
      };
      return [mouseOver,mouseOut]
}