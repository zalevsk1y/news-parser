<?php
namespace NewsParserPlugin\Tests\DI;

use NewsParserPlugin\DI\ContainerBuilder;
use NewsParserPlugin\Message\Errors;         

require DI_MOCK_DIR.'/mock-test-classes.php';

class ContainerBuilderTest extends \WP_UnitTestCase{
   protected $path_to_defenintion=DI_MOCK_DIR.'/mock-di-config.php';
   public function setUp(){
       parent::setUp();
   }
    public function testGet (){
        $instance=new ContainerBuilder();
        $defininition=require_once($this->path_to_defenintion);
        $keys=array_keys($defininition);
        $instance->addDefinitions($this->path_to_defenintion);
        $test_instance=$instance->get($keys[0]);
        $this->assertEquals(get_class($test_instance),$keys[0]);
    }
    /** 
    * @dataProvider dataTestWrongGet
    */
    public function testGetWrong($path_to_defenintion,$expected_error_msg){
        $instance=new ContainerBuilder();
    }
    public function dataTestWrongGet(){
        return [
            [DI_MOCK_DIR.'/mock-di-wrong-config.php',Errors::text('NO_NEEDED_DEPENDENCY_IN_DEFENITION')],
            [DI_MOCK_DIR.'/mock-di-wrong-path-config.php',Errors::text('NO_DI_DEFENITION_FILE')]
        ];
    }
}