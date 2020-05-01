import { useState } from 'react';
import { Post } from 'types/post';
import { useParsePost } from './useParsePost';


export type ParsedPostsCounter = number;
export type IsParsing = boolean;
export type PostsParser = (postsArray: Post[], mode: 'race' | 'sequence', rssUrl: string) => Promise<void>;
export type UseParsePost = () => [ParsedPostsCounter, IsParsing, PostsParser];


/**
*
* Custom hook for parsing posts.
*
* @returns {Array} An array containing the parsed posts counter, parsing status, and the postsParser function.
*/


export const useParsePosts: UseParsePost = () => {
    const parsePost = useParsePost();
    const [parsedPostsCounter, setParsedPostsCounter] = useState<number>(0);
    const [isParsing, setIsParsing] = useState<boolean>(false)
    const postsParser: PostsParser = (postsArray, mode = 'race', rssUrl) => {
        setParsedPostsCounter(0);
        setIsParsing(true);
        let counter = 0;
        switch (mode) {
            case 'race':
                return Promise.all(postsArray.map((post) => parsePost(post.link, post._id, rssUrl).finally(() => {
                    counter++;
                    setParsedPostsCounter(counter)
                }))).finally(() => setIsParsing(false));
            case 'sequence':
                const sequenceRunCallback = async (): Promise<any> => {
                    const outputArray: Array<any> = [];
                    let parsingResult;
                    for (let post of postsArray) {
                        try {
                            parsingResult = await parsePost(post.link, post._id, rssUrl)
                        } catch (error: any) {
                            setIsParsing(false);
                            throw new Error(error.message);
                        }
                        outputArray.push(parsingResult);
                        setParsedPostsCounter(postsArray.length - outputArray.length);
                    }
                    setIsParsing(false);
                    return outputArray;
                }
                return sequenceRunCallback();
            /*
            const postsArrClone = postsArray.slice();
            const sequenceCallback = (post: Post | undefined, postsArr: Post[]) => {
                if (!post) return;
                parsePost(post.link, post._id, rssUrl).finally(() => {
                    setParsedPostsCounter(postArrLength - postsArr.length);
                    if (postsArr.length > 0) {
                        sequenceCallback(postsArr.shift(), postsArr);
                    } else {
                        setIsParsing(false)
                    }
                })
            }
            sequenceCallback(postsArrClone.shift(), postsArrClone);
            break;
            */
        }
    }
    return [parsedPostsCounter, isParsing, postsParser]
}

