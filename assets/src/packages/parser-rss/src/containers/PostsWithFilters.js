import React from 'react';
import Posts from './Posts';
import {table} from '@news-parser/helpers/classes/Table';

export function PostsWithFilters(table,Posts){
    return (props)=>{
        if(props.posts===undefined||props.posts.data.length===0||props.filters===undefined) {
            return <Posts posts={[]} />
        }else if (props.filters!==undefined&&props.filters.length>0) {
            const draft=props.posts.draft||{},
                selected=props.posts.selected||{},
                {posts,filters}=props,
                filteredPosts=useEffect(()=>{
                    const filteredPosts=filters.reduce((acc,filter)=>acc.concat(table(posts).selectWhere('title','like',filter)),[]),
                        uniqFilteredPosts=table(filteredPosts).removeDuplicate('_id');
                        return table(uniqFilteredPosts).join({draft,selected});
            },[posts,filters]);
            return <Posts posts={filteredPosts} />
        }
        
    }
}

export default PostsWithFilters(table,Posts);