<?php
namespace NewsParserPlugin\Tests\Controller{
use NewsParserPlugin\Controller\CronTaskController;
use NewsParserPlugin\Controller\EventController;
use NewsParserPlugin\Models\CronDataModel;
use NewsParserPlugin\Controller\CronController;

class CronTaskControllerTest extends \WP_UnitTestCase {
    protected $cronTaskController;
    protected $event;
    public function setUp():void
    {
        parent::setUp();
        $this->event=$this->getMockBuilder(EventController::class)
                ->disableOriginalConstructor()
                ->onlyMethods(['trigger','on','off'])
                ->getMock();
        $this->cronTaskController=$this->getMockBuilder(CronTaskController::class)
            ->setConstructorArgs([$this->event])
            ->onlyMethods(['getOption','getCronOptionsModel'])
            ->getMock();    
    }
    /**
     * @dataProvider dataCronTaskCallback
     * @covers NewsParserPlugin\Controller\CronTaskController::parsePosts()
     * @covers NewsParserPlugin\Controller\CronTaskController::getCronOptions()
     */
    public function testCronTaskCallback($interval,$cron_options,$posts,$new_timestamp) {
        $this->event->method('trigger')
        ->willReturnCallback(function ($event,$args) use ($posts) {
            if($event=='list:get'){
                return $posts;
            }else{
                return true;
            }
        });
        $instans=$this;
        $this->cronTaskController->method('getOption')
            ->willReturn($cron_options);
        $this->cronTaskController->method('getCronOptionsModel')
            ->willReturnCallback(function($cron_option) use ($instans,$new_timestamp){
            $cronModelMock=$instans->getMockBuilder(\NewsParserPlugin\Models\CronDataModel::class)
                ->setConstructorArgs(array($cron_option))
                ->onlyMethods(['setTimestamp','save'])
                ->getMock(); 
            $cronModelMock->expects($this->once())
                ->method('setTimestamp')
                ->with($this->equalTo($new_timestamp)); 
            return $cronModelMock;
            });
        $this->cronTaskController->cronTaskCallback($interval);
    }
    public function dataCronTaskCallback(){
        return array(
            array(
                'hourly',
                array(
                    array(
                        'url'=>'http://www.sample-site.com',
                        'maxCronCalls'=>10,
                        'maxPostsParsed'=>10,
                        'interval'=>'hourly',
                        'timestamp'=>strtotime('24.02.2022'),
                        'cronCalls'=>0,
                        'parsedPosts'=>0,
                        'status'=>'active'
                    )
                ),
                array(
                    json_decode(json_encode(array(
                        'pubDate'=>'01.01.2023',
                        'link'=>''
                    )))
                ),
                strtotime('01.01.2023')
            )
        );
    }
    
    

}
}