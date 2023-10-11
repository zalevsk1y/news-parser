<?php
namespace NewsParserPlugin\Tests\Models;
use NewsParserPlugin\Models\ListModel;

class ListModelTest extends \WP_UnitTestCase
{
    public function testGetAttributes()
    {
        $list_array=array(
            'listItem1',
            'listItem2',
            'listItem3'
        );
        $list=new ListModel($list_array);
        $this->assertIsArray($list->getAttributes());
    }
    
}