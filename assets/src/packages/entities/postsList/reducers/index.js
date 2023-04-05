const posts=(state=[],action)=>{
    switch(action.type){
        case SET_LIST:
                return [...action.payload.data];
        default:
            return [...state]
    }
}
