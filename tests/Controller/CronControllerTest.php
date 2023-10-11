<?php
namespace NewsParserPlugin\Tests\Controller{

use NewsParserPlugin\Controller\CronController;
use NewsParserPlugin\Models\CronDataModel;

class CronControllerTest extends \WP_UnitTestCase {
    protected $mockCronDataModel;
    protected $mockCronController;
    public function setUp():void
    {
        parent::setUp();
        $this->mockCronDataModel = $this->createMock(CronDataModel::class);
        $this->mockCronController = $this->getMockBuilder(CronController::class)
            ->onlyMethods(['modelsFactory', 'isCronExists', 'setCron','unsetCron','getOption','updateOption','isIntervalActive'])
            ->getMock();
        $this->mockCronController->method('modelsFactory')
            ->willReturn($this->mockCronDataModel);
    }
    public function testCreate() {
        // Create a mock CronDataModel
        $this->mockCronDataModel->expects($this->once())
            ->method('getStatus')
            ->willReturn('active');
        $this->mockCronDataModel->expects($this->once())
            ->method('setTimestamp');
        $this->mockCronDataModel->expects($this->once())
            ->method('save');
        $this->mockCronDataModel->expects($this->once())
            ->method('getAttributes')
            ->with($this->equalTo('array'))
            ->willReturn(array());
        $this->mockCronController->expects($this->once())
            ->method('isCronExists')
            ->willReturn(false);
        $this->mockCronController->expects($this->once())
            ->method('setCron');

        // Call the create() method
        $cronData = ['interval' => 'daily'];
        $result = $this->mockCronController->create($cronData);

        // Assert the result
        $this->assertIsArray($result);
        // Add more assertions for the expected values in the result array
    }

    public function testGetAll() {
        $this->mockCronController->expects($this->once())
            ->method('getOption')
            ->willReturn(['cron1', 'cron2']);

        // Call the getAll() method
        $result = $this->mockCronController->getAll();

        // Assert the result
        $this->assertIsArray($result);
        $this->assertCount(2, $result);
        // Add more assertions for the expected values in the result array
    }
    /**
     * @dataProvider dataGet
     */
    public function testGet($url,$options,$expected) 
    {
        $this->mockCronController->expects($this->once())
            ->method('getOption')
            ->willReturn($options);
        $this->mockCronDataModel->method('getAttributes')
            ->willReturn($expected);
        // Call the get() method without specifying a URL
        $result = $this->mockCronController->get($url);
        // Assert the result
        if(isset($expected['url'])) $expected['url']=$url;
        $this->assertEquals($result, $expected);
    }
    public function dataGet()
    {
        return array(
            array(
                'http://example.com',
                array(
                    'http://example.com'=>array('cron1 data'), 
                    'http://site.com'=>array('corn2 data')
                ),
                array('cron1 data')
            ),
            array(
                null,
                array(
                    'http://example.com'=>array('cron1 data'), 
                    'http://site.com'=>array('corn2 data')
                ),
                array(
                    'http://example.com'=>array('cron1 data'), 
                    'http://site.com'=>array('corn2 data')
                )
                ),
            array(
                'http://not-in-the-list.com',
                array(
                    'http://example.com'=>array('cron1 data'), 
                    'http://site.com'=>array('corn2 data')
                ),
                CronDataModel::DEFAULT_CRONE_OPTIONS 
                ),
                               
        );
    }
    /**
     * @dataProvider dataDelete
     */
    public function testDelete($url,$options,$expected) 
    {
        $this->mockCronController
            ->method('getOption')
            ->willReturn($options);
        $this->mockCronController->expects($this->once())
            ->method('isIntervalActive')
            ->willReturn($options[$url]['isActive']);
        $this->mockCronController->expects($this->once())
            ->method('updateOption')
            ->with($this->equalTo(NEWS_PURSER_PLUGIN_CRON_OPTIONS_NAME),$this->equalTo($expected));
        if(!$options[$url]['isActive']){
            $this->mockCronController->expects($this->once())
                ->method('unsetCron');
        }
        // Call the delete() method
        $result = $this->mockCronController->delete($url);

    }
    public function dataDelete()
    {
        return array(
            array(
                'http://example.com',
                array(
                    'http://example.com'=>array(
                        'url' => 'http://example.com',
                        'maxCronCalls' => '',
                        'maxPostsParsed' => '',
                        'interval' => 'hourly',
                        'isActive'=>true
                    )
                ),
                array()
            ),
            array(
                'http://example.com',
                array(
                    'http://example.com'=>array(
                        'url' => 'http://example.com',
                        'maxCronCalls' => '',
                        'maxPostsParsed' => '',
                        'interval' => 'daily',
                        'isActive'=>false
                        )
                    ),
                array()
                
                )    
        );
    }


    // Add more unit tests for the other methods of CronController

}
}