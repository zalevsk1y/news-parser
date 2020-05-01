<?php
namespace  NewsParserPlugin\Utils;

use NewsParserPlugin\Interfaces\AdapterInterface;

/**
 * Transform parsed post content array into gutenberg blocks mark up.
 *
 *
 * PHP version 5.6
 *
 * @package  Utils
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */
class AdapterGuttenberg implements AdapterInterface
{
    /**
     * Create gutenberg editors blocks mark up from array.
     * Structure:
     * array(
     * 'tagName'=>string,
     * 'content'=>string|array
     * )
     *
     * @param array $body
     * @return string
     */
    public function convert($body)
    {
        $post_content='';
        $content_array=$body;
        foreach ($content_array as $el) {
            switch ($el['tagName']) {
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                    $post_content.=$this->heading($el);
                    break;
                case 'span':
                    $post_content.=$this->simpleText($el);
                    break;
                case 'img':
                    $post_content.=$this->image($el);
                    break;
                case 'p':
                    $post_content.=$this->paragraph($el);
                    break;
                case 'ul':
                    $post_content.=$this->listBlock($el);
                    break;
                case 'iframe':
                    $post_content.=$this->youtubeVideo($el);
                    break;
                case 'imgRow':
                    $post_content.=$this->imageRow($el);
                    break;
                case 'source':
                    $post_content.=$this->sourceLink($el);
            }
        }
        return $post_content;
    }
    /**
     * Format youtube video block.
     *
     * @param array $element structure ['tagName'=>string,'content'=>youtube id]
     * @return string
     */
    protected function youtubeVideo($element)
    {
        $hash=$element['content'];
        $video='<!-- wp:core-embed/youtube {"url":"https://youtu.be/%1$s","type":"video","providerNameSlug":"youtube","className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->'.
            '<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">'.
            'https://youtu.be/%1$s</div></figure><!-- /wp:core-embed/youtube -->';
        return sprintf(
            $video,
            \esc_html($hash)
        );
    }
    /**
     * Format header block.
     *
     * @param array $element ['tagName'=>string,'content'=>inner header text]
     * @return string
     */
    protected function heading($element)
    {
        $level=$this->getDigitsOnly($element['tagName']);
        $clean_content=\esc_html($element['content']);
        $clean_tag_name=\esc_html($element['tagName']);
        $header_tag='<!-- wp:heading {"level":%1$d} --><%2$s>%3$s</%2$s><!-- /wp:heading -->';
        return sprintf(
            $header_tag,
            (int)$level,
            $clean_tag_name,
            $clean_content
        );
    }
    /**
     * Format <p> paragraph block.
     *
     * @param array $element ['tagName'=>string,'content'=>inner paragraph text]
     * @return string
     */
    protected function paragraph($element)
    {
        $clean_content=\esc_html($element['content']);
        return '<!-- wp:paragraph --><p>'.$clean_content.'</p><!-- /wp:paragraph -->';
    }
    /**
     * No block format.
     *
     * @param array $element
     * @return string
     */
    protected function simpleText($element)
    {
        $clean_content=\esc_html($element['content']);
        return $clean_content;
    }
    /**
     * Image block format
     *
     * @param array $element ['tagName'=>string,'content'=>[src,alt]]
     * @return string
     */
    protected function image($element)
    {
        $clean_src=\esc_url_raw($element['content']['src']);
        $clean_alt=\esc_html($element['content']['alt']);
        $clean_src_set=array_key_exists('srcSet',$element['content'])?\esc_html($element['content']['srcSet']):'';
        $clean_sizes=array_key_exists('sizes',$element['content'])?\esc_html($element['content']['sizes']):'';
        $wp_image_declaration=sprintf(
            '{"id": "%s","sizeSlug": "%s","url": "%s","alt": "%s"}',
            'null',
            'large',
            $clean_src,
            $clean_alt
        );
        $image_block_tag='<!-- wp:image %s --><figure class="wp-block-image"><img src="%s"  alt="%s" %s %s/></figure><!-- /wp:image -->';
        return sprintf(
            $image_block_tag,
            $wp_image_declaration,
            $clean_src,
            $clean_alt,
            $clean_src_set!==''?'srcset="'.$clean_src_set.'"':'',
            $clean_sizes!==''?'sizes="'.$clean_sizes.'"':''
        );
    }
    /**
     * List block format.
     *
     * @param array $el ['tagName'=>string,'content'=>[...[inner list text]]]
     * @return string
     */
    protected function listBlock($el)
    {
        $list_begin='<!-- wp:list --><ul>';
        $list='';
        $list_end='</ul><!-- /wp:list -->';
        $li_elements=$el['content'];
        foreach ($li_elements as $li) {
            $list.=sprintf(
                '<li>%s</li>',
                esc_html($li)
            );
        }
        return $list_begin.$list.$list_end;
    }
    /**
     * Wraps the 'img' elements in a group container for WP Gutenberg elements.
     *
     * @param array $image_array The array of 'img' elements to wrap.
     * @return string The wrapped group container for the 'img' elements.
     */
    protected function imageRow($image_array)
    {
        $group_description=sprintf(
            '{"className":"row","layout":{"type":"%s","flexWrap":"%s"}}',
            'flex',
            'nowrap'
        );
        $image_group_start=sprintf(
            '<!-- wp:group %s --><div class="wp-block-group row ">',
            $group_description
        );
        $image_group_end='</div><!-- /wp:group -->';
        return $image_group_start.implode('', array_map(array($this,'image'),$image_array['content'])).$image_group_end;
    }
    /**
     * Get only digits from string using regular expression.
     *
     * @param string $str
     * @return string
     */
    protected function getDigitsOnly($str)
    {
        return preg_replace('/[^0-9]/i', '', $str);
    }
    protected function sourceLink($element){
        $clean_href=\esc_url_raw($element['content']['href']);
        $clean_text=\esc_html($element['content']['text']);
        $link_element =sprintf(
            '<a rel="nofollow" href="%s">%s</a>',
            $clean_href,
            $clean_text
        );
        return '<!-- wp:paragraph --><p>'.$link_element.'</p><!-- /wp:paragraph -->';
    }
}
