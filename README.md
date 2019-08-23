!['Alt text'](banner_header.png)
# News-parser Wordpress Plugin

News-parser is a plugin for Wordpress that allows you to easily receive the full text of the article, as well as images from the site using an RSS feed. Parsed information from the site is saved as a draft,which you can just publish or edit at your discretion. This makes it easy to create content for your site.


### Features

*   Paging data directly from the site
*   Ability to parse not only text, but also pictures
*   Flexible settings system
*   Possibility to use shortcodes
*   Translation into several languages
*   Ability to parse e only from RSS but also from url

### Future plans

*   Add auto-pilot feature.
*   Add visual content extractor.
*   Have an idea? – Please, feel free to let me know. Let’s make News-Parser even better!

### Installing

1. You can clone the GitHub repository: `https://github.com/zalevsk1y/news-parser.git`
2. Or download it directly as a ZIP file: `https://github.com/zalevsk1y/news-parser/archive/master.zip`

This will download the latest developer copy of News-parser.

## How to use NewsParserPlugin\this plugin?

Just enter the address of the RSS source in the search bar and click "Parse RSS Feed" button, you will receive a list of articles from this source. In order to save the draft, simply click on the download check in the lower right corner of the block with the post interesting for you and it will be saved as a draft. Go to the menu item Posts-> All Posts in your admin panel to find the draft of the post you parsed. If everything suits you, you can simply publish this post or edit it at your discretion.

Watch this short video to learn HOW TO PARSE FROM RSS with news-parser plugin:

[![Alt text](http://img.youtube.com/vi/GgmNEgVQCoo/0.jpg)](https://www.youtube.com/watch?v=GgmNEgVQCoo)

You can also parse just pages with individual posts. Enter the Url page, click the "Parse Page" button and page will be saved in your posts as a draft. To edit or publish data, go to the menu item Posts-> All Posts in your admin panel, find the draft of the post that you spars. If everything suits you, you can simply publish this post or edit it at your discretion.

Watch this short video to learn HOW TO PARSE SINGLE PAGE with news-parser plugin:

[![Alt text](http://img.youtube.com/vi/bLXMZ8M5za0/0.jpg)](https://www.youtube.com/watch?v=bLXMZ8M5za0)

In the setting you can set the ability to select pictures that will be attached to your post. And also automatically generate a shortcode for the gallery (for example [MySliderGallery](https://wordpress.org/plugins/mygallery/)).

## Settings

Settings, for your convenience, are divided into three parts - General, Post, Gallery.

General:

*   Add a link to the source - adds a link at the end of the post to the source of information.

Post:

*   Add main image to post - Determines whether "featured image" should be added to the post automatically.
*   Parse all pictures - Determines whether to parse images other than "featured image".
*   Show select pictures dialog - if this item is selected you can manually select images that need to be added to the post. If this item is not selected, then all images that were parsed will be added to the post automatically.
*   Maximum pictures to add - Maximum number of images that the parser will parse from each page.


Gallery:

*   Add gallery to post - Allows you to automatically add shortcodes of gallery plugins to the post and pass image id to them.
*   Shortcode for gallery - Gallery plugin shortcode name. An example ([MyGallerySlider plugin](https://wordpress.org/plugins/mygallery/)) has the following shortcode format `[my-gallery ids = 1,2,3,4]`. In this column you should enter `my-gallery` in the next `ids` as the parameter name.
*   Parameter name for gallery - the name of the parameter to which the list of id images is transferred.

## Dependencies

*  php-simple-html-dom-parser https://github.com/sunra/php-simple-html-dom-parser

## Bugs ##

If you find an issue, let us know [here](https://github.com/zalevsk1y/news-parser/issues?state=open)!
