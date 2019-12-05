<?php
namespace  NewsParserPlugin\Traits;

trait AdapterGutenbergTrait{

    protected function createGutenbergBlocks($body){
        $post_content='';
        $content_array=$body;
        foreach($content_array as $el){
            switch ($el['tagName']){
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
                    $post_content.=$this->list($el);
                    break;
                case 'iframe':
                    $post_content.=$this->youtubeVideo($el);
                    break;
            }
        }
        return $post_content;
    }
    protected function youtubeVideo($element){
        $hash=$element['content'];
        $video='<!-- wp:core-embed/youtube {"url":"https://youtu.be/%1$s","type":"video","providerNameSlug":"youtube","className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->'.
            '<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">'.
            'https://youtu.be/%1$s</div></figure><!-- /wp:core-embed/youtube -->';
        return sprintf(
            $video,
            \esc_html($hash)
        );
    }
    protected function heading($element){
        $level=$this->getDigitsOnly($element['tagName']);
        $clean_content=\esc_html($element['content']);
        $clean_tag_name=\esc_html($element['tagName']);
        return '<!-- wp:heading {"level":'.$level.'} --><'.$clean_tag_name.'>'.$clean_content.'</'.$clean_tag_name.'><!-- /wp:heading -->';
    }
    protected function paragraph($element){
        $clean_content=\esc_html($element['content']);
        return '<!-- wp:paragraph --><p>'.$clean_content.'</p><!-- /wp:paragraph -->';
    }
    protected function  simpleText($element){
        $clean_content=\esc_html($element['content']);
        return $clean_content;
    }
    protected function image($element){
        $clean_src=\esc_url_raw($element['content']['src']);
        $clean_alt=esc_html($element['content']['alt']);
        return '<!-- wp:image --><figure class="wp-block-image"><img src="'.$clean_src.'" alt="'.$clean_alt.'"/></figure><!-- /wp:image -->';
    }
    protected function list($el){
        $list_begin='<!-- wp:list --><ul>';
        $list='';
        $list_end='</ul><!-- /wp:list -->';
        $li_elements=$el['content'];
        foreach($li_elements as $li){
            $list.=sprintf('<li>%s</li>',
                esc_html($li)
            );
        }
        return $list_begin.$list.$list_end;
    }
    protected function getDigitsOnly($str){
        return preg_replace('/[^0-9]/i','',$str);
    }

}