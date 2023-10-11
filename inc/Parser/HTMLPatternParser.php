<?php
namespace NewsParserPlugin\Parser;

use NewsParserPlugin\Parser\HTMLParser;
use NewsParserPlugin\Interfaces\AdapterInterface;

/**
 * Parse html using pre saved template pattern.
 *
 * PHP version 5.6
 *
 * @package Parser
 * @author  Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license MIT
 */

class HTMLPatternParser extends HTMLParser
{

    /**
     * Class that provide methods that convert array body data to string for post model
     * using gutenberg editor blocks markup.
     *
     * @var AdapterInterface
     * @method convert array of body elements data.
     */
    protected $adapter;

    /**
     * Init function.
     *
     * @param integer $cache_expiration cache expiration time.
     */
    public function __construct(AdapterInterface $adapter, $cache_expiration = 3600)
    {
        parent::__construct($cache_expiration);
        $this->adapter=$adapter;
    }
    /**
     * Parse post body
     *
     * @uses AdapterInterface::convert() convert array of elements into string.
     * @return string data that would be saved as post content.
     */

    public function postBody()
    {
        $search_template='';
        if (!isset($this->options['template'])) {
            throw new \Exception('Parsing template patterns should be set.');
        }
        $template=$this->options['template'];
        
        foreach ($template['children'] as $child_element) {
            //Create search template for Sunra\HtmlDomParser::find method
            //https://simplehtmldom.sourceforge.io/manual.htm How to find HTML elements? section.
            $search_template.=$child_element['searchTemplate'].',';
        }
        $search_template=substr($search_template, 0, -1);
        $container=$this->find($template['searchTemplate']);

        if (empty($container)) {
            return '';
        }
        $elements=$container[0]->find($search_template);
        $body=$this->parseContainer($elements);
        
       
        return $body ? $this->adapter->convert($body):'';
    }
    /**
     * Iterate over array of HtmlDomParser elements and parse data.
     *
     * @param array $elements array of HtmlDomParser elements objects
     * @return array ['tagName'=>string,'content'=>string|array]
     */
    protected function parseContainer($elements)
    {
        $body=array();
        foreach ($elements as $el) {
            $el_tag=$el->tag;
                $el_data=array(
                    'tagName'=>$el_tag,
                );
                switch ($el_tag) {
                    case 'img':
                    //If element is image content element will be type of array.
                        $el_data['content']=array(
                            'alt'=>$el->alt,
                            //if lazy load attribute data-src exists take that as source of image if none take src attribute.
                            'src'=>(is_array($el->attr)&&array_key_exists('data-src', $el->attr))?$el->attr['data-src']:$el->src
                        );
                        break;
                    case 'ul':
                        //if element is list content element will be type of array.
                        $el_data['content']=array();
                        foreach ($el->find('li') as $li) {
                            $el_data['content'][]=$this->removeTags($li->innertext);
                        }
                        break;
                    case 'iframe':
                        //find youtube video ID.
                        preg_match('/youtube\.com\/embed\/([a-zA-Z0-9\_]*)/i', $el->src, $match);
                        //remove any symbols except that is allowed.
                        $el_data['content']=array_key_exists(1, $match)?$match[1]:false;
                        break;
                    default:
                        $el_data['content']=$this->removeTags(trim($el->innertext));
                }
                if ($el_data['content']!==false) {
                    $body[]=$el_data;
                }
        };
            return $body;
    }
}
