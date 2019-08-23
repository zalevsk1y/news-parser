<div class='wrap wrap-about-news-parser'>
<div class="container-about">
    <h1>Welcome to News-Parser <?php echo NEWS_PARSER_PLUGIN_VERSION ?></h1>
    <br>
    
  
    <p>
        <img src="<?php echo NEWS_PARSER_PLUGIN_URL.'/public/images/banner-1280x360.png' ?>" alt="'Alt text'" style="max-width:100%;">
    </p>
    
    <div class='about-text'>
            
            <p>News-parser is a plugin for Wordpress that allows you to easily receive the full text of the article, as
                well as images from the site using an RSS feed. Parsed information from the site is saved as a
                draft,which you can just publish or edit at your discretion. This makes it easy to create content for
                your site.</p>
            <h2>Features</h2>
            <ul>
                <li>Paging data directly from the site</li>
                <li>Ability to parse not only text, but also pictures</li>
                <li>Flexible settings system</li>
                <li>Possibility to use shortcodes</li>
                <li>Translation into several languages</li>
                <li>Ability to parse e only from RSS but also from url</li>
            </ul>
            <h2>Future plans</h2>
            <ul>
                <li>Add auto-pilot feature.</li>
                <li>Add visual content extractor.</li>
                <li>Have an idea? – Please, feel free to let me know. Let’s make News-Parser even better!</li>
            </ul>
            <h2>Installing</h2>
            <ol>
                <li>You can clone the GitHub repository: <code>https://github.com/zalevsk1y/news-parser.git</code></li>
                <li>Or download it directly as a ZIP file:
                    <code>https://github.com/zalevsk1y/news-parser/archive/master.zip</code></li>
            </ol>
            <p>This will download the latest developer copy of News-parser.</p>
            <h2>How to use NewsParserPlugin\this plugin?</h2>
            <p>Just enter the address of the RSS source in the search bar and click "Parse RSS Feed" button, you will
                receive a list of articles from this source. In order to save the draft, simply click on the download
                check in the lower right corner of the block with the post interesting for you and it will be saved as a
                draft. Go to the menu item Posts-&gt; All Posts in your admin panel to find the draft of the post you
                parsed. If everything suits you, you can simply publish this post or edit it at your discretion.</p>
            <p>Watch this short video to learn HOW TO PARSE FROM RSS with news-parser plugin:</p>
            <p><a href="https://www.youtube.com/watch?v=GgmNEgVQCoo" rel="nofollow"><img src="http://img.youtube.com/vi/GgmNEgVQCoo/0.jpg" alt="Alt text" style="max-width:100%;"></a></p>
            <p>You can also parse just pages with individual posts. Enter the Url page, click the "Parse Page" button
                and page will be saved in your posts as a draft. To edit or publish data, go to the menu item Posts-&gt;
                All Posts in your admin panel, find the draft of the post that you spars. If everything suits you, you
                can simply publish this post or edit it at your discretion.</p>
            <p>Watch this short video to learn HOW TO PARSE SINGLE PAGE with news-parser plugin:</p>
            <p><a href="https://www.youtube.com/watch?v=bLXMZ8M5za0" rel="nofollow"><img src="http://img.youtube.com/vi/bLXMZ8M5za0/0.jpg" alt="Alt text"  style="max-width:100%;"></a></p>
            <p>In the setting you can set the ability to select pictures that will be attached to your post. And also automatically 
            generate a shortcode for the gallery (for example 
            <a href="https://wordpress.org/plugins/mygallery/" rel="nofollow">MySliderGallery</a>).</p>

            <h2 id='news-parser-settings'>Settings</h2>
            <p>Settings, for your convenience, are divided into three parts - General, Post, Gallery.</p>
            <p>General:</p>
            <ul>
            <li>Add a link to the source - adds a link at the end of the post to the source of information.</li>
            </ul>
            <p>Post:</p>
            <ul>
                <li>Add main image to post - Determines whether "featured image" should be added to the post automatically.</li>
                <li>Parse all pictures - Determines whether to parse images other than "featured image".</li>
                <li>Show select pictures dialog - if this item is selected you can manually select images that need to be added to the post. If this item is not selected, then all images that were parsed will be added to the post automatically.</li>
                <li>Maximum pictures to add - Maximum number of images that the parser will parse from each page.</li>
            </ul>
            <p>Gallery:</p>
            <ul>
                <li>Add gallery to post - Allows you to automatically add shortcodes of gallery plugins to the post and pass image id to them.</li>
                <li>Shortcode for gallery - Gallery plugin shortcode name. An example (<a href="https://wordpress.org/plugins/mygallery/" rel="nofollow">MyGallerySlider plugin</a>) has the following shortcode format <code>[my-gallery ids = 1,2,3,4]</code>. In this column you should enter <code>my-gallery</code> in the next <code>ids</code> as the parameter name.</li>
                <li>Parameter name for gallery - the name of the parameter to which the list of id images is transferred.</li>
            </ul>

            <h2>Dependencies</h2>
            <ul>
                <li>php-simple-html-dom-parser <a
                        href="https://github.com/sunra/php-simple-html-dom-parser">https://github.com/sunra/php-simple-html-dom-parser</a>
                </li>
            </ul>
            <h2>If you find an issue, let us know <a
                    href="https://github.com/zalevsk1y/news-parser/issues?state=open">here</a>!</p>
        </article>

    </div><!-- about-text -->
</div><!--container-about -->
</div><!-- wrap-about-news-parser -->