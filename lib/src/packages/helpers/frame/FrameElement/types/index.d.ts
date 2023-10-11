export type FrameModifier=(html:string)=>string
export type FrameMiddleware=(frame:HTMLIFrameElement)=>void
export type DOMEventHandler=(this:Document,e:Event|MouseEvent)=>any;
export type FrameEventElement=[keyof DocumentEventMap,DOMEventHandler]
export type FrameArrayOfEvents=Array<FrameEventElement>;
export interface FrameElementInterface{
    runMiddleware(arrayOfMiddleware: Array<FrameMiddleware>):FrameElementInterface
    injectHTML(html: string, modifiers: Array<FrameModifier>):FrameElementInterface
    injectCSS(options: {
        tag: string,
        href: string,
        parent: string
      }):FrameElementInterface
    bindEvents(arrayOfEvents?:FrameArrayOfEvents):FrameElementInterface
    addModifiers(html:string, arrayOfModifiers:Array<FrameModifier>):string
    runMethodWhenReady(callback:()=>void):FrameElementInterface
    shutDown(runBeforeShutDown:Array<FrameMiddleware>):void
}