<?php

namespace NewsParserPlugin\CLI;
use \NewsParserPlugin\Controller\CronTaskController;

class InvokeAutopilot {
    protected $cronTaskController;
    protected $intervals=array('hourly','daily','weekly','monthly','yearly');
    protected $intervalErrorMessage='The --interval option must be one of the following values:

    * hourly
    * daily
    * weekly
    * monthly
    * yearly
    
    For example:
    
    autopilot --interval=hourly
    autopilot --interval=daily
    autopilot --interval=weekly
    autopilot --interval=monthly
    autopilot --interval=yearly
     ';
    public function __construct(CronTaskController $cronTaskController) {
        $this->cronTaskController = $cronTaskController;
    }

    public function commandCallback( $args,$assoc_args ) {
        if(!array_key_exists('interval',$assoc_args)){
            \WP_CLI::log( $this->intervalErrorMessage );
             return ;
        }
        $interval=$assoc_args['interval'];
        if (!$interval||!in_array($interval,$this->intervals)){
            \WP_CLI::log( $intervalErrorMessage );
             return ;
        }
        $parsed_posts=$this->cronTaskController->cronTaskCallback($interval); 
        \WP_CLI::log( sprintf( '%s posts were saved.', $parsed_posts) );
        
    }
}

