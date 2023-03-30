import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Message from '@news-parser/message/';
import InputForm from './InputForm';
import Posts from './Posts';
import Indicator from './Indicator';
import VisualConstructor from '@news-parser/widget/visual-constructor/';
import {useOpenVisualConstructor} from '@news-parser/widget/visual-constructor/hooks'
import PropTypes from 'prop-types';
import { parseSelected } from '../actions/page.actions';
import { SelectedPostsInfo } from '@news-parser/modules/SelectedPostsInfo';
import { validateIntupUrl } from '@news-parser/helpers'
import { getUrlSearchParams } from '@news-parser/helpers/';
import {useFetchPostsList} from '@news-parser/entity/postsList/hooks/useFetchPostsList'
import {useSetPostsList} from '@news-parser/entity/postsList/hooks/useSetPostsList'


/**
 * Main application element.
 * 
 * @since 0.8.0
 */


const Main = () => {
  const showMessage = useShowMessage();
  const [mainState,setMainState] = useState(() => {
    const searchParams = getUrlSearchParams();
    return {
      entity: searchParams.has('entity') ? searchParams.get('entity') : null,
      url: searchParams.has('url') ? searchParams.get('url') : '',
      template:false
    }
  });
  const [isPostsReady, posts] = useGetPosts(mainState.url);
  const [isTemplateReady, template] = useGetTemplate(mainState.url);

const [selectedPosts,selectedPostsCount]=useMemo(()=>{
    const sp=posts.filter(post=>post.selected)
    return [sp,sp.length]
  },[posts]);
  const isParseSelectedPostsDisabled = useMemo(() => !mainState.template && !isTemplateReady, [parsedTemplate, isTemplateFetching])
  const parseSelectedHandler = useCallback(() => parsePosts(selectedPosts), [selectedPosts]);
  const postEditDialogOpenHandler=useOpenVisualConstructor();
  const inputSubmitHandler = useCallback((url) => {
    if (validateIntupUrl(url)) {
      setUrlSearchParams({ entity: PARSER_RSS_LIST, url })
    } else {
      showMessage('error', 'Please enter valid url.');
    }
  }, [PARSER_RSS_LIST, setUrlSearchParams]);

  return (
    <div className={"wrap"}>
      <VisualConstructor />
      <div className="parsing-title">
        <h1>News-Parser</h1>
      </div>
      <Indicator step={0.5} />
      <Message />
      <InputForm buttonName="Parse RSS Feed" submitAction={inputSubmitHandler} initValue={mainState.url} disabled={isPostsFetching} />

      <SelectedPostsInfo disabled={isParseSelectedPostsDisabled} submitAction={parseSelectedHandler} selectedPostsCount={selectedPostsCount} />

      <Posts posts={posts} openEditor={postEditDialogOpenHandler}/>
    </div>
  );
}


export default Main;


Main.propTypes = {
  /**
   * Current app parsing entity [list|single|multi]
   */
  submitType: PropTypes.string,
  /**
  * Current app parsing entity parser-rss-[list|page|media]
  */
  entity: PropTypes.string
}