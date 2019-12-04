<?php
namespace NewsParserPlugin\Parser;
use NewsParserPlugin\Parser\HTMLParser;
use Sunra\PhpSimple\HtmlDomParser;

class HTMLPatternParser extends HTMLParser{

    private $body=array();

    public function __construct(HtmlDomParser $HTMLParserClass, $cache_expiration = 600){
        parent::__construct($HTMLParserClass,$cache_expiration);
    }
    /**
     * Parse post body
     *
     *
     * @return array
     */

    public function postBody($options)
    {   
       
        $search_template='';
        $template=$options->getTemplate();
        
        foreach($template['children'] as $child_element){
            $search_template.=$child_element['searchTemplate'].',';
        }
        $search_template=substr($search_template,0,-1);
        $container=$this->find($template['searchTemplate']);

        if(empty($container)){
            return '';
        }
        $elements=$container[0]->find($search_template);
        $this->parseContainer($elements);
        
       
        return $this->body ?: array();

    }
    protected function parseContainer($elements){
        foreach($elements as $el){
            $el_tag=$el->tag;     
                $el_data=array(
                    'tagName'=>$el_tag,
                );
                switch($el_tag){
                    case 'img':
                        $el_data['content']=array(
                            'alt'=>$el->alt,
                            'src'=>(is_array($el->attr)&&array_key_exists('data-src',$el->attr))?$el->attr['data-src']:$el->src
                        );
                        break;
                    case 'ul':
                        $el_data['content']=array();
                        foreach($el->find('li') as $li){
                            $el_data['content'][]=$this->removeTags($li->innertext);
                        }
                        break;
                    case 'iframe':
                        preg_match('/youtube\.com\/embed\/(.*)[?|\'|\"]/i',$el->src,$match);
                        $el_data['content']=$match[1]?preg_replace('/[^0-9a-zA-Z\_]/i','',$match[1]):'';
                        break;
                    default:
                        $el_data['content']=$this->removeTags(trim($el->innertext));
                }
                $this->body[]=$el_data;
            };
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