export const mockPostsData={
    err: 0,
    msg: {
        type:'success',
        text:'ok'
    },
    data:[
        {   
            title:'Test title',
            image:'test.com/image.jpg',
            description:'Test',
            pubDate:'01-01-2001',
            link:'test.com/post.html',
            status:'parsed'
        },
        {
            title:'Test title2',
            image:'test.com/image2.jpg',
            description:'Test2',
            pubDate:'01-01-2001',
            link:'test.com/post1.html',
            status:'parsed'
        },
        {
            title:'Test title3',
            image:'test.com/image3.jpg',
            description:'Test3',
            pubDate:'01-01-2001',
            link:'test.com/post2.html',
            status:'parsed'
        },
        {
            title:'Test title4',
            image:'test.com/image4.jpg',
            description:'Test4',
            pubDate:'01-01-2001',
            link:'test.com/post3.html',
            status:'parsed'
        },
    ]
};
export const mockPostData={
    err: 0,
    msg: {
        type:'success',
        text:'ok'
    },
    data:{
        status:'draft',
        postId:1,
        link:'http://localhost:3000/test-edit/',
    }
}
export const mockDialogData={
    err: 0,
    msg: false,
    dialog:{
        type:'gallery',
        data:[
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/2020-bmw-m5-edition-35-years-300x169.jpg",
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/ferrari-purosangue-suv-rendering-3-300x169.jpg",
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/ferrari-purosangue-suv-rendering-2-300x169.jpg",
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/ferrari-purosangue-suv-rendering-1-300x169.jpg",
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/ferrari-purosangue-suv-rendering-300x169.jpg",
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/IMG-6797.jpg",
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/nothumb_user_100x100-26.jpg",
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/nothumb_user_100x100-25.jpg",
            "http://192.168.137.148/wpblog1/wp-content/uploads/2019/05/nothumb_user_100x100-24.jpg"
        ]
    }
}
export const  mockReceiveError={
    msg:{
        type:"error",
        text:"Sorry XML file cannot be downloaded"
    },
    err:1}