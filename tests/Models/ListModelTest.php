<?php
namespace NewsParserPlugin\Tests\Models;
use NewsParserPlugin\Models\ListModel;

class ListModelTest extends \WP_UnitTestCase
{
    /**
     * @dataProvider dataTypes
     */
    public function testGetAttributes($dataType,$expected)
    {
        $list_array=array(
            'listItem1',
            'listItem2',
            'listItem3'
        );
        $list=new ListModel($list_array);
        $this->assertInternalType($expected,$list->getAttributes($dataType));
    }
    public function dataTypes(){
        return array(
            array('array','array'),
            array('json','string'),
            array('object','array')
        );
    }
}