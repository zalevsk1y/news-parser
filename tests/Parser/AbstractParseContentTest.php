<?php


namespace NewsParserPlugin\Parser\Abstracts 
{
/**
 * Mock WP function wp_remote_get to avoid real downloading process.
 *
 * @param string $url
 * @param array $request_args
 * @return array|\WP_Error
 */
    function wp_remote_get($url,$request_args)
    {
        switch($url){
            case 'www.right-site.com':
                return array('response'=>array(
                    'code'=>200
                ),
                'body'=>'test html data'
            );
            case 'www.wrong-site.com':
                return array('response'=>array(
                    'code'=>404
                ));
        }
        return new \WP_Error('test_error','Test error');
    }
}
namespace NewsParserPlugin\Tests
{
    use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;

/**
 * Dump class to get access to protected method of abstract class.
 * 
 */
class ParseContent extends AbstractParseContent
{
    protected function parse($data,$options)
    {
        return $data;
    }
    public function getFromCache($url)
    {
        return parent::getFromCache($url);
    }
    public function setCache($url, $data)
    {
        return parent::setCache($url, $data);
    }
    
}

class AbstractParseContentTest extends \WP_UnitTestCase
{
    protected $instance;
    public function setUp()
    {
        $this->instance=new ParseContent(10);
    }
    public function testSetAndGetCache()
    {
        $url='test-url.com';
        $data='test data';
        $result_of_set_cache=$this->instance->setCache($url,$data);
        $result_of_get_cache=$this->instance->get($url);
        $this->assertEquals($result_of_set_cache,true);
        $this->assertEquals($result_of_get_cache,$data);
    }
    /**
     * @dataProvider urlData
     */
    public function testGet($url,$expected)
    {
        if($expected==='NewsParserPlugin\Exception\MyException'){
            $this->expectException($expected);
            $this->instance->get($url);
        }else{
            $result=$this->instance->get($url);
            $this->assertEquals($expected,$result);
        }
    }
    /**
     * @dataProvider scriptTagsData
     */
    public function testRemoveScriptTags($tags,$expected)
    {
        $result=$this->instance->removeScriptTags($tags);
        $this->assertEquals($expected,$result);
    }
    /**
     * @dataProvider styleTagsData
     */
    public function testRemoveStyleTags($tags,$expected)
    {
        $result=$this->instance->removeStyleTags($tags);
        $this->assertEquals($expected,$result);
    }
    public function urlData()
    {
        return array(
            array('www.right-site.com','test html data'),
            array('www.wrong-site.com','NewsParserPlugin\Exception\MyException'),
            array('error-url','NewsParserPlugin\Exception\MyException')
        );
    }
    public function scriptTagsData()
    {
        return array(
            array('<script type="text/javascript" src="site.com/my-script"></script><h1>test title</h1>','<h1>test title</h1>'),
            array('<script type="text/javascript">alert("test");</script><h1>test title</h1>','<h1>test title</h1>'),
        );
    }
    public function styleTagsData()
    {
        return array(
            array('<style>.class{display:none;}</style><h1>test title</h1>','<h1>test title</h1>'),
            array('<h1>test title</h1><style type="text/css">.class{display:none;}</style>','<h1>test title</h1>'),
        );
    }
}
}