<?php


namespace NewsParserPlugin\Tests\Parser;

use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;


class AbstractParseContentTest extends \WP_UnitTestCase
{
    protected $instance;
    public function setUp():void
    {
        // parent::setUp();
        $this->mockParserContent=$this->getMockBuilder(\NewsParserPlugin\Parser\Abstracts\AbstractParseContent::class)
            ->setConstructorArgs(array(10))
            ->onlyMethods(array('wpRemoteGet','parse'))
            ->getMock();
        $this->mockParserContent->method('parse')
            ->will($this->returnArgument(0));
        
    }

    /**
     * @dataProvider dataGet
     * 
     * @covers NewsParserPlugin\Parser\Abstracts\AbstractParseContent::setCache()
     * @covers NewsParserPlugin\Parser\Abstracts\AbstractParseContent::download()
     * @covers NewsParserPlugin\Parser\Abstracts\AbstractParseContent::wpRemoteGet()
     */
    public function testGet($url,$response,$expected)
    {
        $this->mockParserContent->method('wpRemoteGet')
            ->willReturn($response);
        is_wp_error($response)&&$this->expectException($expected);
        $result=$this->mockParserContent->get($url);
        $this->assertEquals($expected,$result);
        $cached_data=get_transient(sha1($url));
        $this->assertEquals($expected,$cached_data);
    }
    /**
     * @dataProvider scriptTagsData
     */
    public function testRemoveScriptTags($tags,$expected)
    {
        $result=$this->mockParserContent->removeScriptTags($tags);
        $this->assertEquals($expected,$result);
    }
    /**
     * @dataProvider styleTagsData
     */
    public function testRemoveStyleTags($tags,$expected)
    {
        $result=$this->mockParserContent->removeStyleTags($tags);
        $this->assertEquals($expected,$result);
    }
    public function dataGet()
    {
        return array(
            array(
                'www.right-site.com',
                array('response'=>array(
                        'code'=>200
                    ),
                    'body'=>'test html data'
                ),
                'test html data'
            ),
            array(
                'www.wrong-site.com',
                new \WP_Error('wrong_url',"Wrong test url"),
                'NewsParserPlugin\Exception\MyException'
            ),
           
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
