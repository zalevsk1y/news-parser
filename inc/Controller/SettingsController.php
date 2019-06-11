<?php

namespace Controller;
use Utils\Settings;
use Exception\MyException;
use Message\Errors;
use Message\Success;
use Utils\ResponseFormatter;

class SettingsController{
    public function __construct(Settings $settings,ResponseFormatter $formatter){
        $this->settings=$settings;
        $this->formatter=$formatter;
    }
    public function get(){
       try{
           $response=array(
               'main'=>$this->formatter->message('none')->get('array'),
               'settings'=>$this->settings->get('array')
           );
        }catch(MyException $e){
            $response=array(
            'main'=>$this->formatter->message('error',Errors::text('SETTINGS_CANNOT_BE_SAVED'))->get('array'),
            'settings'=>array()
            );
        }
       return \json_encode($response);
    }
    public function getDefault(){
        try{
            $response=array(
                'main'=>$this->formatter->message('none')->get('array'),
                'settings'=>$this->settings->getDefault('array')
            );
         }catch(MyException $e){
             $response=array(
             'main'=>$this->formatter->error(1)->message('error',Errors::text('SETTINGS_CANNOT_BE_SAVED'))->get('array'),
             'settings'=>array()
             );
         }
        return \json_encode($response);
    }
    public function set(string $new_settings){
        try{
            $decode_data=\stripslashes($new_settings);
            $message=$this->settings->set(\json_decode($decode_data,true));
            if ($message){
                $message=$this->formatter->message('success',Success::text('SETTINGS_SAVED'))->get('array');
            }
        }catch(MyException $e){
            $message=$this->formatter->error(1)->message('error',Errors::text('SETTINGS_CANNOT_BE_SAVED'))->get('array');
        }
        $main_response=array(
            'main'=>$message
        );
        return \json_encode($main_response);
    }
}