export function  sortByOffset(objectOfContent){
    const sortedContent=[],
    objectCopy={...objectOfContent};
    
    while(true){
        if(!Object.keys(objectCopy).length) break;
        let minIndex={
            index:0,
            offsetTop:Math.pow(10,10)
        }
        for (var item in objectCopy){
            if(objectCopy[item].offsetTop<minIndex.offsetTop){
                minIndex.offsetTop=objectCopy[item].offsetTop;
                minIndex.index=item;
            }
        }
        sortedContent.push(objectCopy[minIndex.index]);
        delete objectCopy[minIndex.index]
    }
    return sortedContent;
}