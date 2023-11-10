<div class='wrap wrap-about-news-parser'>
<div class="container-about">
    <h2>Welcome to News-Parser <?php echo NEWS_PARSER_PLUGIN_VERSION ?></h2>
    <br>
    
  
    <p>
        <img src="<?php echo NEWS_PARSER_PLUGIN_URL.'/public/images/banner-1280x360.png' ?>" alt="'Alt text'" style="max-width:100%;">
    </p>
    
    <div class='about-text'>
            
            <p>News-parser is a plugin for Wordpress that allows you to easily receive the full text of the article, as
                well as images from the site using an RSS feed. Parsed information from the site is saved as a
                draft,which you can just publish or edit at your discretion. This makes it easy to create content for
                your site.</p>
            <h3>Features</h3>
            <ul class='styled-list'>
                <li>Support of Gutenberg editor</li>
                <li>Autopilot Function for Automatic RSS Parsing</li>
                <li>Visual content extractor</li>
                <li>Flexible template creation system to speed up parsing</li>
                <li>Ability to parse not only from RSS XML source but also </li>
            </ul>
            <h3>Future plans</h3>
            <ul class='styled-list'>
                <li>Parsing videos from other(than YouTube) sources</li>
                <li>Saving images to the Media Library</li>
                <li>Have an idea? – Please, feel free to let me know. Let’s make News-Parser even better!</li>
            </ul>
            <h3>Installing</h3>
            <ol>
                <li>You can clone the GitHub repository: <code>https://github.com/zalevsk1y/news-parser.git</code></li>
                <li>Or download it directly as a ZIP file:
                    <code>https://github.com/zalevsk1y/news-parser/archive/master.zip</code></li>
            </ol>
            <p>This will download the latest developer copy of News-parser.</p>
            <h3>How to use News-Parser plugin?</h3>
            <h4>Parsing RSS</h4>
            <p>To parse RSS, follow these steps in the admin panel of your website under the News Parsing -> Parsing RSS menu:</p>
            <ul class='styled-list'>
                <li>Enter the RSS feed address in the search bar.</li>
                <li>Click on the "Parse RSS Feed" button.</li>
            </ul>
            <p>Once the parsed data is fetched from the server, it will appear on your screen.
            You can open the visual extractor by clicking on the icon. The visual extractor allows you to create a template for parsing posts from this RSS source.
            Alternatively, you can manually select the content you are interested in and save it as a draft.
            In the visual editor, you'll also find several options available:</p>
            <ul class='styled-list'>
                <li>Categories: You can assign categories to the parsed posts. This helps organize the content and make it easier for users to navigate.</li>
                <li>Tags: You can add tags to the parsed posts. Tags provide additional metadata to describe the content and make it more discoverable.</li>
                <li>Publishing Options: You can choose whether the post should be published immediately after parsing or saved as a draft. This gives you control over when the content goes live on your website.</li>
            </ul>
            <p>After selecting the desired content, you need to click on the "Create Post" button. Once the data is processed, the post will be created. If necessary, you can continue editing the post in the built-in WordPress editor by clicking on the "Edit post" icon. This will open the saved post in the built-in editor in a separate browser tab. After saving the changes, you can check the result on your website to ensure that the post appears as intended.</p>
            <p>Watch this short video to learn HOW TO PARSE FROM RSS with news-parser plugin:</p>
            <div class="youtube-video-container mb-4 "><iframe  src="https://www.youtube.com/embed/Aiye15Cp5_8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <p>To parse several posts, select posts and press the Parse Selected button. Wait for the data to be saved,you`ll be notified by the message at the top of the screen. The icon at the bottom of the post allows you to go on to edit or publish a saved draft.Note that parsing selected post could be done only if you created parsing template!</p>

            <p>Watch this short video to learn HOW TO PARSE SEVERAL POSTS:</p>
            <div class="youtube-video-container mb-4"><iframe  src="https://www.youtube.com/embed/m85PExDeAMA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            
            <h4>Visual Constructor</h4>

            <p>To create a template or simply select the content you are interested in, use the visual constructor. You can open visual constructor by clicking icon at the bottom of post box.  
                To select content, click on the block that you need in the main window and it will be marked with a turquoise frame. When you hover over the content, the expected area will be painted in turquoise color.
                To cancel the selection, click on the block again.</p> 
            <p>Try to separate different types of content (pictures, video, text) into separate blocks. The YouTube video will be replaced with a picture of the YouTube logo. You can extrude it and this video will be inserted into your post. Parsing videos from other sources is not yet supported. Pictures are inserted into your post as a link; the exception is a featured image which is saved in your media library.
                In the sidebar, you can change the featured image of your post. Just select the appropriate image on the left side of the designer and click the Change Image button. The last image you selected will be selected as featured image. You can also create a post without featured image. Just click on No featured image.</p>
            <p>You can change the name of the post in the next submenu 'Post title'. Write your version of the post title in textaria and click the Change Title button.
                To add a source link, check the box labeled 'Add source link' to the post. in the 'Extra Options' submenu.</p>

            <p>Watch this short video to learn HOW TO USE VISUAL CONSTRUCTOR:</p>
            <div class="youtube-video-container mb-4"><iframe  src="https://www.youtube.com/embed/0yS0ptvBpzY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

            <h4>Create Parsing Template</h4>
            <p>To save the template, it is necessary to mark the content in the main window of the visual constructor, select the 'Save parsing template that you can use in automatic parsing from this source item.' and click the Save Tempalte button. It is important to understand that individual posts even from one source can be very different, therefore parsed pages may not contain the content you need.</p>
            <p>Watch this short video to learn HOW TO CREATE PARSING TEMPLATE:</p>
            <div class="youtube-video-container mb-4"><iframe  src="https://www.youtube.com/embed/0awSRLWsP-I" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <h4>Parsing single page.</h4>
            <p>To parse a single page, select News-Parsing-> Parse Page in the admin panel of your site. In the search bar, enter the site address URL and press Parse Page button. Visual constructor will open. In the visual constructor, select the content and click the Create Post Draft button. The draft will be automatically created and you can edit it in the Posts editor.If everything suits you, you can simply publish this post or edit it at your discretion.</p>
            <p>Watch this short video to learn HOW TO PARSE SINGLE PAGE with news-parser plugin:</p>
            <div class="youtube-video-container mb-4"><iframe  src="https://www.youtube.com/embed/Sbke_LF-TFA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            
            <h4>Autopilot Function for Automatic RSS Parsing</h4>
                <p>The autopilot function is now available to automatically parse posts from an RSS feed. Please note that the <a href="https://developer.wordpress.org/plugins/cron/">wp-cron</a> is used for scheduling the autopilot function, which triggers the task scheduler only when the website is visited. If you encounter issues with this function, you can add the following option to the <code>wp-config.php</code> file: <code>define('ALTERNATE_WP_CRON', true);</code></p>
                <p>To configure the autopilot settings, follow these steps:</p>
                <ol type='1' start='1'>
                    <li>Navigate to the Autopilot tab in the menu (News Parser -> Autopilot).</li>
                    <li>In the Schedule Options, select the URL that corresponds to the RSS source from which parsing will take place.</li>
                    <li>Click on the Select button.</li>
                    <li>After the data is loaded, the following options will be available:
                    <ul class='styled-list'>
                        <li>Status: Determines whether the autopilot is activated for this source.</li>
                        <li>Maximum Number of Posts: Sets the maximum number of posts to be parsed from this source.</li>
                        <li>Maximum Number of Autopilot Runs: Specifies the maximum number of times the autopilot should run for this source.</li>
                        <li>Parsing Frequency: Defines the frequency at which parsing should occur from this source.</li>
                    </ul>
                    </li>
                    <li>Additionally, in this menu, you can delete previously saved parsing templates.</li>
                </ol>
                <p>Watch this short video to learn HOW TO USE AUTOPILOT with news-parser plugin.</p>
            <div class="youtube-video-container mb-4"><iframe  src="https://www.youtube.com/embed/Eu_5GR32nB0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                <h4>WP-CLI Support</h4>
                <p>With the latest update, a new feature has been introduced that leverages wp-cli. This feature enables users to activate an autopilot function, allowing for automated parsing and saving of posts from RSS feeds. The autopilot function can now be accessed directly from the command-line interface, providing a convenient way to manage this process.</p>
                <p>To utilize this functionality, you'll need to install wp-cli and execute the command <code>wp autopilot</code> in the command-line interface. Additionally, you'll need to specify the desired interval at which the autopilot function should be triggered by including the additional parameter <code>wp autopilot --interval=</code>. This allows you to customize the frequency of the autopilot function according to your specific needs.</p>
                <p>By incorporating wp-cli and the new "wp autopilot" command, managing the automatic parsing and saving of posts from RSS feeds becomes more efficient and streamlined. This feature provides enhanced control and flexibility, empowering users to automate their post management tasks with ease.</p>
                <p>Example:</p>
                <code>wp autopilot --interval=hourly</code>
                
                <h3>Dependencies</h3>
            <ul>
                <li>php-simple-html-dom-parser <a
                        href="https://github.com/sunra/php-simple-html-dom-parser">https://github.com/sunra/php-simple-html-dom-parser</a>
                </li>
            </ul>
            <p>
                If you have any thoughts, feedback, or proposals, feel free to connect with the author:
            </p>
            <ul className='list-unstyled list-inline'>
                <li class="list-inline-item">
                <img alt='Instagram icon' className='me-2' height="20px" src=<?php echo NEWS_PARSER_PLUGIN_URL.'/public/images/clipart1375168_d6sh2a.png'?> />
                    <a href="https://www.instagram.com/wp_news_parser" aria-label="Instagram - Connect with the author">
                        
                        Instagram
                    </a>
                </li>
                <li class="list-inline-item">
                <img alt='Discord icon' className='me-2' height="25px" src=<?php echo  NEWS_PARSER_PLUGIN_URL.'/public/images/discord-icon-43742_qoe0fc.png'?> />
                    <a href="https://discord.gg/mxhJ9hE4" aria-label="Discord - Connect with the author">
                        
                        Discord
                    </a>
                </li>
            </ul>
           
        </article>

    </div><!-- about-text -->
</div><!--container-about -->
</div><!-- wrap-about-news-parser -->