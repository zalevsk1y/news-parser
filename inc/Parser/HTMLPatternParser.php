<?php
namespace NewsParserPlugin\Parser;
use Sunra\PhpSimple\HtmlDomParser;
use NewsParserPlugin\Parser\HTMLParser;

class HTMLPatternParser extends HTMLParser{

    private $body=array();

    public function __construct(HtmlDomParser $HTMLParserClass, $cache_expiration = 600){
        parent::__construct($HTMLParserClass,$cache_expiration);
    }
    /**
     * Parse post body
     *
     *
     * @return string
     */

    public function postBody()
    {   
        $body='';
        $template=array(
            array(
                'type'=>'container',
                'tagName'=>'div',
                'className'=>'postContent',
                'children'=>array(
                    array(
                        'type'=>'element',
                        'tagName'=>'h2',
                        'className'=>'preview',
                        'searchTemplate'=>'h2'
                    )
                )
            ),
            array(
                'type'=>'container',
                'tagName'=>'div',
                'className'=>'postBody',
                'children'=>array(
                    array(
                        'type'=>'element',
                        'tagName'=>'p',
                        'className'=>false,
                        'searchTemplate'=>'p'
                    ),
                    array(
                        'type'=>'element',
                        'tagName'=>'h2',
                        'className'=>'content-header',
                        'searchTemplate'=>'h2'
                    ),
                    array(
                        'type'=>'element',
                        'tagName'=>'div',
                        'className'=>'msnt-photo-thumb-gallery',
                        'searchTemplate'=>'img'
                    ),
                   
                )
            )
        );
        foreach($template as $item){
            if($item['type']==='container') $this->parseContainer($item);
        }
        //Parse body inside <p> tag
        //$body = $this->parseBodyTagP();
        return $this->body ?: '';

    }
    protected function parseContainer($container){
        $tag=$container['tagName'];
        $class_name=$container['className'];
        $pattern=$tag.'.'.$class_name;
        $container_element=$this->find($pattern)[0];
        foreach($container_element->children() as $el){
            $el_tag=$el->tag;
            $el_class_name=$el->class;
            if($element_pattern=$this->isElementInTemplate($el_tag,$el_class_name,$container)){
                if($element_pattern['searchTemplate']!==$element_pattern['tagName']){
                    $el=$el->find($element_pattern['searchTemplate'])[0];
                    $el_tag=$el->tag;
                    $el_class_name=$el->class;
                }
                $el_data=array(
                    'tagName'=>$el_tag,
                    'className'=>$el_class_name
                );
                switch($el_tag){
                    case 'img':
                        $el_data['content']=array(
                            'alt'=>$el->alt,
                            'src'=>$el->attr['data-src']?:$el->src
                        );
                        break;
                    case 'ul':
                        $el_data['content']=array();
                        foreach($el->find('li') as $li){
                            $el_data['content'][]=$this->removeTags($li->innertext);
                        }
                    default:
                        $el_data['content']=$this->removeTags(trim($el->innertext));
                }
                $this->body[]=$el_data;
            };
        }
    }
    protected function isElementInTemplate($tag,$class_name,$container){
        foreach($container['children'] as $el){
            if($el['tagName']===$tag&&((strpos($class_name,$el['className'])!==false)||$el['className']===false)){
                return $el;
            }
        }
        return false;
    }
}