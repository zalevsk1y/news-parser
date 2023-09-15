import React, { ReactElement, ReactNode, useCallback, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component";

export type InfinitePostsScrollProps={
  postsArray:Array<ReactElement>,
  postsPerWindow:number,
  className?:string
}

export const InfinitePostsScroll:React.FC<InfinitePostsScrollProps> = ({ postsArray, postsPerWindow,className }) => {
  const [hasMore, setHasMore] = useState<boolean>(() => postsArray.length > postsPerWindow);
  const [postsToRender, setPostsToRender] = useState<Array<ReactElement>>(() => postsArray.slice(0, postsPerWindow));
  const [endPointer, setEndPointer] = useState<number>(postsPerWindow);
  const next = useCallback(() => {
    const nextEndPointer = endPointer + postsPerWindow;
    setEndPointer(nextEndPointer);
    setPostsToRender(postsArray.slice(0, nextEndPointer));
    if (nextEndPointer >= postsArray.length) setHasMore(false);
  }, [endPointer])
  return (
    <InfiniteScroll
      className={className}
      dataLength={postsToRender.length}
      next={next}
      hasMore={hasMore}
      scrollThreshold={0.8}
      loader={<div className="">...Loading</div>}
      scrollableTarget={'parsing-rss-app'}
    >
      {postsToRender}
    </InfiniteScroll>
  )
}