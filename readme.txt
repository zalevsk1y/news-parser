=== News-Parser ===
Contributors: bikkel
Donate link: 
Author: Evgeniy Zalevskiy
Tags: news-parser, wordpress news-parser plugin, News-Parser, wordpress  News-Parser plugin, rss parser, autopilot, news parser, News Parser, wordpress News Parser plugin
Requires PHP: 7.2
Requires at least: 3.5.0
Tested up to: 5.2.2
Stable tag: 0.2.0
License: MIT
License URI: https://opensource.org/licenses/MIT

=== News-parser WordPress Plugin===

News-parser is a plugin for WordPress that allows you to easily receive the full text of the article, as well as images from the site using an RSS feed. Parsed information from the site is saved as a draft,which you can just publish or edit at your discretion. This makes it easy to create content for your site.


==  Features ==

*   Paging data directly from the site
*   Ability to parse not only text, but also pictures
*   Flexible settings system
*   Possibility to use shortcodes
*   Translation into several languages
*   Ability to parse e only from RSS but also from url

==Future plans==

*   Add auto-pilot feature.
*   Add visual content extractor.
*   Have an idea? – Please, feel free to let me know. Let’s make News-Parser even better!

== Installing==

1. You can clone the GitHub repository: `https://github.com/zalevsk1y/news-parser.git`
2. Or download it directly as a ZIP file: `https://github.com/zalevsk1y/news-parser/archive/master.zip`

This will download the latest developer copy of News-parser.

== How to use NewsParserPlugin\this plugin?==

Just enter the address of the RSS source in the search bar and click "Parse RSS Feed" button, you will receive a list of articles from this source. In order to save the draft, simply click on the download check in the lower right corner of the block with the post interesting for you and it will be saved as a draft. Go to the menu item Posts-> All Posts in your admin panel to find the draft of the post you parsed. If everything suits you, you can simply publish this post or edit it at your discretion.

You can also parse just pages with individual posts. Enter the Url page, click the "Parse Page" button and page will be saved in your posts as a draft. To edit or publish data, go to the menu item Posts-> All Posts in your admin panel, find the draft of the post that you spars. If everything suits you, you can simply publish this post or edit it at your discretion.


In the setting you can set the ability to select pictures that will be attached to your post. And also automatically generate a shortcode for the gallery (for example [MyGallery](https://wordpress.org/plugins/mygallery/)).


== Dependencies ==

*  php-simple-html-dom-parser https://github.com/sunra/php-simple-html-dom-parser

== Bugs ==

If you find an issue, let us know [here](https://github.com/zalevsk1y/news-parser/issues?state=open)!
