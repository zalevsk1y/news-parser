

export const Translate=({children,dict,lang})=>{
    if(typeof dict!=="object") return children;
    if(!(children in dict))return children;
        return dict[children][lang];   
}