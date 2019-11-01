<?php
namespace NewsParserPlugin\Utils;
/**
 * Class format response in proper way.You can build a chain of 
 * method e.g. ->post($args)->message($args)->get() to get response at the end of chain add ::get() 
 *
 * @package  Message
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */

class ResponseFormatter {
 
    protected $data=array('err'=>0);
    protected $action;
/**
 * Format answer after post draw was created
 *
 * @param array $data should contain post_id,status,link
 * @return object return this for chain building
 */
    public function post(array $data){
        $this->action='post';
        $this->data['data']=array(
            'post_id'=>$data['post_id'],
            'status'=>$data['status'],
            'link'=>$data['previewLink']
        );
        return $this;
    }
    /**
     * Format answer for parse rss list request
     *
     * @param array $data array of list objects
     * @return object return this for chain building
     */
    public function list(array $data){
        $this->action='list';
        $this->data['data']=$data;
        return $this;
    }
    /**
     * Format answer for image selection dialog 
     *
     * @param string $type type of dialog window current 'gallery' only
     * @param array $data array of image urls for dialog window
     * @return object return this for chain building
     */
    public function dialog($type,$data){
        $this->data['dialog']=array(
            'type'=>$type,
            'data'=>$data
        );
            return $this;
    }
    /**
     * Format answer for rawHtML request.
     *
     * @param string $data Raw HTML data .
     * @return void
     */
    public function rawHTML($data){
        $this->data['data']=esc_html($data);
        return $this;
    }
    /**
     * Return error message in case some errors
     *
     * @param int $code code of error
     * @return object return this for chain building
     */
    public function error($code){
        $this->data['err']=esc_html($code);
        return $this;
    }
    /**
     * Format message section of the answer
     *
     * @param string $status success|error|Info
     * @param string $text
     * @return object return this for chain building
     */
    public function message($status,$text=''){
        
        if($status=='none'){
            $this->data['msg']=false;
        }else{
            $this->data['msg']=array(
            
                    'type'=>esc_html($status),
                    'text'=>esc_html($text),
                    'timestamp'=>time()
                
            );
        }
        return $this; 
    }
    /**
     * Return answer data in array|object|json format
     *
     * @param string $format array|object|json
     * @return array|object|json
     */
    public function get($format){
        $json=json_encode($this->data);
        switch($format){
            case 'json':
                return $json;
            case 'object':
                return json_decode($json);
            case 'array':
                return json_decode($json,true);
            default:
            return $this->data;
        }
    }
}