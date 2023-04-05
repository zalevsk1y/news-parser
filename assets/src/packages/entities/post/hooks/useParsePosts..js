import { useSelector } from "react-redux";
import {table} from "@news-parser/helpers/classes/Table";
import { useParsePost } from "./useParsePost";

export const useParsePosts = () => {
    const { data, select } = useSelector(state => state.parse.items);
    const posts = useMemo(()=>table(data).join({ select }).filter(post => post.select),[data,select]);
    const [isParsing,startParsing]=useParsePost()
    var requestPromise;
    for (var i = 0, end = selectedPosts.length; i < end; i++) {
        let url = selectedPosts[i].link,
            inner_id = selectedPosts[i]._id;
        if (i === 0) requestPromise = dispatch(apiRequest(PAGE, PARSE, { url, _id: inner_id, data: action.payload.data }));
        if (i > 0) requestPromise = requestPromise.then(() => dispatch(apiRequest(PAGE, PARSE, { url, _id: inner_id, data: action.payload.data })));
    }
}
            
