<?php

namespace NewsParserPlugin\Utils;

/**
 * Class load menu config file.
 * 
 * @package Utils
 * @author  Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license MIT https://opensource.org/licenses/MIT
 */
class MenuConfig
{
    protected $config;
    protected $main_menu_keys=['page_title'=>0,'menu_title'=>1 ,'capability'=>2,'menu_slug'=>3,'template'=>4,'icon'=>5];
    protected $sub_menu_keys=['page_title'=>0,'parent_slug'=>1,'menu_title'=>2,'capability'=>3,'menu_slug'=>4,'template'=>5];
    public function __construct($config_path){
        if (!file_exists($config_path)) {
            throw new \Exception('Cannot load template file '.$config_path);
        }
        $config=include $config_path;
        $this->verifyFormat($config['menu']);
        $this->config=$config;
    }
    /**
     * Get the menu config in diff formats
     *
     * @param string $format format of output config
     * @return object|array|string
     */
    public function get(string $format='object')
    {
        $config_json=json_encode($this->config);
        switch($format){
            case 'object':
            return json_decode($config_json);
            case 'json':
            return $config_json;
            case 'array':
            return json_decode($config_json,true);
        }
    }
    /**
     * Verify of menu config file format 
     *
     * @param array $config
     * @return void
     */
    protected function verifyFormat(array $config){
        $check_main_menu=array_diff_key($this->main_menu_keys,$config);
        if(count($check_main_menu)>0){
            throw new \Exception('Wrong main menu config file format.No needed keys in config file '.implode(',',$check_main_menu));
        }
        if(array_key_exists('subs',$config)&&is_array($config['subs'])){
            foreach($config['subs'] as $sub_menu){
                $check_sub_menu=array_diff_key($this->sub_menu_keys,$sub_menu);
                if(count($check_sub_menu)>0){
                    throw new \Exception('Wrong sub menu config file format.No needed keys in config file '.implode(',',$check_sub_menu));
                }
            }
        }
    }
}
