!['Alt text'](banner_header.png)

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/zalevsk1y/news-parser/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/zalevsk1y/news-parser/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/zalevsk1y/news-parser/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/zalevsk1y/news-parser/?branch=master) [![Build Status](https://scrutinizer-ci.com/g/zalevsk1y/news-parser/badges/build.png?b=master)](https://scrutinizer-ci.com/g/zalevsk1y/news-parser/build-status/master)

# News-parser Wordpress Plugin

News-parser is a plugin for Wordpress that allows you to easily receive the full text of the article, as well as images from the site using an RSS feed. Parsed information from the site is saved as a draft,which you can just publish or edit at your discretion. This makes it easy to create content for your site.


### Features

*   Support of Gutenberg editor
*   Autopilot Function for Automatic RSS Parsing
*   Visual content extractor
*   Flexible template creation system to speed up parsing
*   Ability to parse not only from RSS XML source but also from url
*   WP_CLI support

### Future plans

*   Parsing videos from other(than YouTube) sources
*   Saving images to the Media Library 
*   Add AI support
*   Have an idea? – Please, feel free to let me know. Let’s make News-Parser even better!

### Installing

1. You can clone the GitHub repository: `https://github.com/zalevsk1y/news-parser.git`
2. Or download it directly as a ZIP file: `https://github.com/zalevsk1y/news-parser/archive/master.zip`

This will download the latest developer copy of News-parser.

## How to use NewsParserPlugin plugin?

### Parsing RSS.

To parse RSS, follow these steps in the admin panel of your website under the News Parsing -> Parsing RSS menu:

- Enter the RSS feed address in the search bar.
- Click on the "Parse RSS Feed" button.

Once the parsed data is fetched from the server, it will appear on your screen.
You can open the visual extractor by clicking on the icon. The visual extractor allows you to create a template for parsing posts from this RSS source.
Alternatively, you can manually select the content you are interested in and save it as a draft.
In the visual editor, you'll also find several options available:
- Categories: You can assign categories to the parsed posts. This helps organize the content and make it easier for users to navigate.
- Tags: You can add tags to the parsed posts. Tags provide additional metadata to describe the content and make it more discoverable.
- Publishing Options: You can choose whether the post should be published immediately after parsing or saved as a draft. This gives you control over when the content goes live on your website.

After selecting the desired content, you need to click on the "Create Post" button. Once the data is processed, the post will be created. If necessary, you can continue editing the post in the built-in WordPress editor by clicking on the "Edit post" icon. This will open the saved post in the built-in editor in a separate browser tab. After saving the changes, you can check the result on your website to ensure that the post appears as intended.

Watch this short video to learn HOW TO PARSE FROM RSS with news-parser plugin:

[![Alt text](http://img.youtube.com/vi/Aiye15Cp5_8/0.jpg)](https://www.youtube.com/watch?v=Aiye15Cp5_8)

To parse several posts, select posts and press the Parse Selected button. Wait for the data to be saved,you`ll be notified by the message at the top of the screen. The icon at the bottom of the post allows you to go on to edit or publish a saved draft.Note that parsing selected post could be done only if you created parsing template!

Watch this short video to learn HOW TO PARSE SEVERAL POSTS:

[![Alt text](http://img.youtube.com/vi/m85PExDeAMA/0.jpg)](https://www.youtube.com/watch?v=m85PExDeAMA)

### Visual Constructor.

To create a template or simply select the content you are interested in, use the visual constructor. You can open visual constructor by clicking icon at the bottom of post box.  
To select content, click on the block that you need in the main window and it will be marked with a turquoise frame. When you hover over the content, the expected area will be painted in turquoise color.
To cancel the selection, click on the block again. Try to separate different types of content (pictures, video, text) into separate blocks. The YouTube video will be replaced with a picture of the YouTube logo. You can extrude it and this video will be inserted into your post. Parsing videos from other sources is not yet supported. Pictures are inserted into your post as a link; the exception is a featured image which is saved in your media library.
In the sidebar, you can change the featured image of your post. Just select the appropriate image on the left side of the designer and click the Change Image button. The last image you selected will be selected as featured image. You can also create a post without featured image. Just click on No featured image.
You can change the name of the post in the next submenu 'Post title'. Write your version of the post title in textaria and click the Change Title button.
To add a source link, check the box labeled 'Add source link' to the post. in the 'Extra Options' submenu.

Watch this short video to learn HOW TO USE VISUAL CONSTRUCTOR:

[![Alt text](http://img.youtube.com/vi/0yS0ptvBpzY/0.jpg)](https://www.youtube.com/watch?v=0yS0ptvBpzY)

### Create Parsing Template

To save the template, it is necessary to mark the content in the main window of the visual constructor, select the 'Save parsing template that you can use in automatic parsing from this source item.' and click the Save Tempalte button. It is important to understand that individual posts even from one source can be very different, therefore parsed pages may not contain the content you need.

Watch this short video to learn HOW TO CREATE PARSING TEMPLATE:

[![Alt text](http://img.youtube.com/vi/0awSRLWsP/0.jpg)](https://www.youtube.com/watch?v=0awSRLWsP)

### Parsing single page.


To parse a single page, select News-Parsing-> Parse Page in the admin panel of your site. In the search bar, enter the site address URL and press Parse Page button. Visual constructor will open. In the visual constructor, select the content and click the Create Post Draft button. The draft will be automatically created and you can edit it in the Posts editor.If everything suits you, you can simply publish this post or edit it at your discretion.

Watch this short video to learn HOW TO PARSE SINGLE PAGE with news-parser plugin:

[![Alt text](http://img.youtube.com/vi/Sbke_LF-TFA/0.jpg)](https://www.youtube.com/watch?v=Sbke_LF-TFA)


### Autopilot Function for Automatic RSS Parsing

The autopilot function is now available to automatically parse posts from an RSS feed. Please note that the wp-cron (`https://developer.wordpress.org/plugins/cron/`) is used for scheduling the autopilot function, which triggers the task scheduler only when the website is visited. If you encounter issues with this function, you can add the following option to the wp-config.php file: `define('ALTERNATE_WP_CRON', true);`

To configure the autopilot settings, follow these steps:

1. Navigate to the Autopilot tab in the menu (News Parser -> Autopilot).
2. In the Schedule Options, select the URL that corresponds to the RSS source from which parsing will take place.
3. Click on the Select button.
4. After the data is loaded, the following options will be available:

   - Status: Determines whether the autopilot is activated for this source.
   - Maximum Number of Posts: Sets the maximum number of posts to be parsed from this source.
   - Maximum Number of Autopilot Runs: Specifies the maximum number of times the autopilot should run for this source.
   - Parsing Frequency: Defines the frequency at which parsing should occur from this source.

5. Additionally, in this menu, you can delete previously saved parsing templates.


Watch this short video to learn HOW TO USE AUTOPILOT with news-parser plugin:

[![Alt text](http://img.youtube.com/vi/Eu_5GR32nB0/0.jpg)](https://www.youtube.com/watch?v=Eu_5GR32nB0)

### WP-CLI Support

With the latest update, a new feature has been introduced that leverages wp-cli. This feature enables users to activate an autopilot function, allowing for automated parsing and saving of posts from RSS feeds. The autopilot function can now be accessed directly from the command-line interface, providing a convenient way to manage this process.

To utilize this functionality, you'll need to install wp-cli and execute the command `wp autopilot` in the command-line interface. Additionally, you'll need to specify the desired interval at which the autopilot function should be triggered by including the additional parameter `wp autopilot --interval=`. This allows you to customize the frequency of the autopilot function according to your specific needs.

By incorporating wp-cli and the new "wp autopilot" command, managing the automatic parsing and saving of posts from RSS feeds becomes more efficient and streamlined. This feature provides enhanced control and flexibility, empowering users to automate their post management tasks with ease.

Example: 

`wp autopilot --interval=hourly`


## Dependencies

*  php-simple-html-dom-parser https://github.com/sunra/php-simple-html-dom-parser

## Bugs ##

If you find an issue, let us know [here](https://github.com/zalevsk1y/news-parser/issues?state=open)!

