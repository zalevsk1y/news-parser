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
                <li>Support of Gutenberg editor</li>
                <li>Visual content extractor</li>
                <li>Flexible template creation system to speed up parsing</li>
                <li>Ability to parse not only from RSS XML source but also </li>
            </ul>
            <h2>Future plans</h2>
            <ul>
                <li>Add auto-pilot feature.</li>
                <li>Parsing videos from other(than YouTube) sources</li>
                <li>Saving images to the Media Library</li>
                <li>Have an idea? – Please, feel free to let me know. Let’s make News-Parser even better!</li>
            </ul>
            <h2>Installing</h2>
            <ol>
                <li>You can clone the GitHub repository: <code>https://github.com/zalevsk1y/news-parser.git</code></li>
                <li>Or download it directly as a ZIP file:
                    <code>https://github.com/zalevsk1y/news-parser/archive/master.zip</code></li>
            </ol>
            <p>This will download the latest developer copy of News-parser.</p>
            <h2>How to use News-Parser plugin?</h2>
            <h3>Parsing RSS.</h3>
            <p>To parse RSS, go to the News-Parsing->Parsing RSS menu in the admin panel of your site. Enter the RSS feed address in the search bar. Click on the Parse RSS Feed button. When parsed data is fetched from the server,it will appear on your screen. You can open the visual extractor by clicking on the icon and create a template for parsing posts from this RSS source or simply select the content you are interested in and save it as a draft.</p>

            <p>Watch this short video to learn HOW TO PARSE FROM RSS with news-parser plugin:</p>
            <div class="youtube-video-container"><iframe  src="https://www.youtube.com/embed/xrZdkV0xA08" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <p>To parse several posts, select posts and press the Parse Selected button. Wait for the data to be saved,you`ll be notified by the message at the top of the screen. The icon at the bottom of the post allows you to go on to edit or publish a saved draft.Note that parsing selected post could be done only if you created parsing template!</p>

            <p>Watch this short video to learn HOW TO PARSE SEVERAL POSTS:</p>
            <div class="youtube-video-container"><iframe  src="https://www.youtube.com/embed/1LttLG9n4t4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            
            <h3>Visual Constructor.</h3>

            <p>To create a template or simply select the content you are interested in, use the visual constructor. You can open visual constructor by clicking icon at the bottom of post box.  
                To select content, click on the block that you need in the main window and it will be marked with a turquoise frame. When you hover over the content, the expected area will be painted in turquoise color.
                To cancel the selection, click on the block again. Try to separate different types of content (pictures, video, text) into separate blocks. The YouTube video will be replaced with a picture of the YouTube logo. You can extrude it and this video will be inserted into your post. Parsing videos from other sources is not yet supported. Pictures are inserted into your post as a link; the exception is a featured image which is saved in your media library.
                In the sidebar, you can change the featured image of your post. Just select the appropriate image on the left side of the designer and click the Change Image button. The last image you selected will be selected as featured image. You can also create a post without featured image. Just click on No featured image.
                You can change the name of the post in the next submenu 'Post title'. Write your version of the post title in textaria and click the Change Title button.
                To add a source link, check the box labeled 'Add source link' to the post. in the 'Extra Options' submenu.</p>

            <p>Watch this short video to learn HOW TO USE VISUAL CONSTRUCTOR:</p>
            <div class="youtube-video-container"><iframe  src="https://www.youtube.com/embed/gGqbRBnGeNE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

            <h3>Create Parsing Template</h3>
            <p>To save the template, it is necessary to mark the content in the main window of the visual constructor, select the 'Save parsing template that you can use in automatic parsing from this source item.' and click the Save Tempalte button. It is important to understand that individual posts even from one source can be very different, therefore parsed pages may not contain the content you need.</p>
            <p>Watch this short video to learn HOW TO CREATE PARSING TEMPLATE:</p>
            <div class="youtube-video-container"><iframe  src="https://www.youtube.com/embed/gWo2aRTGttM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <h3>Parsing single page.</h3>
            <p>To parse a single page, select News-Parsing-> Parse Page in the admin panel of your site. In the search bar, enter the site address URL and press Parse Page button. Visual constructor will open. In the visual constructor, select the content and click the Create Post Draft button. The draft will be automatically created and you can edit it in the Posts editor.If everything suits you, you can simply publish this post or edit it at your discretion.</p>
            <p>Watch this short video to learn HOW TO PARSE SINGLE PAGE with news-parser plugin:</p>
            <div class="youtube-video-container"><iframe  src="https://www.youtube.com/embed/9x56djil-b0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        
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