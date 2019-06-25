<?php
namespace Utils;
use Exception\MyException;
/**
 * Class manipulates plugin settings using WP methods
 *
 * @package  Utils
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */

class Settings
{
    protected $settings;
    public function __construct(){
        $options=\get_option(NEWS_PARSER_SETTINGS_SLUG);
        if(!$options){
            $options=$this->default();
            \add_option(NEWS_PARSER_SETTINGS_SLUG,$options);    
        }
        $this->settings=$options;
    }
    /**
     * Delete settings from the WP db delete_option()
     *
     * @return void
     */
    public static function deleteSettings(){
        \delete_option(NEWS_PARSER_SETTINGS_SLUG);
    }
    /**
     * Get settings data function in useful format
     *
     * @param string $type
     * @return object|array|json
     */
    public function get($type='object'){
        return $this->transformDatatype($type,$this->settings);
    }
    /**
     * Set new settings using WP update_option()
     *
     * @param array $new_settings
     * @return boolean
     */
    public function set(array $new_settings){
        //$newSettings is not sql sanitized, wp function update_options sanitize data so there's no need to run any extra san functions
        // /src/wp-includes/option.php 
        $settings=json_decode($this->default(),true);
        $settings_array=array();
        foreach($settings as $key=>$value){
            try{
                $settings_array[$key]=$this->arrayCopy($new_settings[$key],$settings[$key]);
            }catch(Exception $e){
                $msg="Wrong settings format. $key parameter not found.";
                throw new MyException($msg);
            }
        }
    
        $this->settings=json_encode($settings_array);
        return \update_option(NEWS_PARSER_SETTINGS_SLUG,$this->settings);
    }
    protected function arrayCopy(array $parent,array $child){
        foreach($parent as $key=>$value){
            $child[$key]=$parent[$key];
        }
        return $child;
    }
    /**
     * Get default settings
     *
     * @param string $type
     * @return object|array|json
     */
    public function getDefault($type='object'){
        return $this->transformDatatype($type,$this->default());
    }
    protected function transformDatatype($type,string $data){
        switch($type){
            case 'array':
                $type=true;
                break;
            case 'object':
                $type=false;
                break;
        }
        return json_decode($data,$type);
    }
    public  function default(){
        $array_default = array(
            'general'=>array(
                'addSource'=>false
                ),
            'post'=>array(
                'addThumbnail'=>true,
                'parseOtherPictures'=>false,
                'showPicturesDialog'=>true,
                'maxPictures'=>5,
            ),
            'gallery'=>array(
                    'addGallery'=>false,
                    'shortCode'=>'',
                    'parameterName'=>'',
                )
        );
        return json_encode($array_default);
    }
}
