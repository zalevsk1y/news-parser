
export const defaultState={ 
    main:{
        isFetching:false,
        error:false,
        message:false,
    },
    settings:{
        general:{
            addSource:false
        },
        post:{
            addThumbnail:true,
            parseOtherPictures:false,
            showPicturesDialog:true,
            maxPictures:5,
        },
        gallery:{
            addGallery:false,
            shortCode:undefined,
            parameterName:undefined
        }
}
};
