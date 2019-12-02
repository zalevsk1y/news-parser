<?php
namespace  NewsParserPlugin\Traits;

trait AdapterGutenbergTrait{

    protected function createGutenbergBlocks($data){
        $post_content='';
        $content_array=$data['body'];
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
        $data['body']=$post_content;
        return $data;
    }
    protected function youtubeVideo($element){
        $hash=$element['content'];
        $video='<!-- wp:core-embed/youtube {"url":"https://youtu.be/%1$s","type":"video","providerNameSlug":"youtube","className":"wp-embed-aspect-16-9 wp-has-aspect-ratio"} -->'.
            '<figure class="wp-block-embed-youtube wp-block-embed is-type-video is-provider-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio"><div class="wp-block-embed__wrapper">'.
            'https://youtu.be/%1$s</div></figure><!-- /wp:core-embed/youtube -->';
        return sprintf(
            $video,
            preg_replace('/[^a-zA-z\_]/i','',$hash)
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
        if(!$this->validateImageUrl($clean_src)) return;
        return '<!-- wp:image --><figure class="wp-block-image"><img src="'.$clean_src.'" alt="'.$clean_alt.'"/></figure><!-- /wp:image -->';
    }
    protected function list($el){
        $list_begin='<!-- wp:list --><ul>';
        $list='';
        $list_end='</ul><!-- /wp:list -->';
        $li_elements=$el['content'];
        foreach($li_elements as $li){
            $list+=sprintf('<li>%s</li>',
                esc_html($li)
            );
        }
        return $list_begin+$list+$lis_end;
    }
    protected function getDigitsOnly($str){
        return preg_replace('/[^0-9]/i','',$str);
    }
    /**
     * Validate is input url is link to the image.
     *
     * @param string $input_image_url String that should be validate.
     * @return void
     */
    public function validateImageUrl($input_url){
        $filetype=wp_check_filetype($input_url);
        $mime_type=$filetype['type'];
        if(strpos($mime_type,'image')!==false){
            return $input_url;
        }
        return false;
    }
}