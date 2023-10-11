<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Models\TemplateModelWithUserID as TemplateModel;
use NewsParserPlugin\Utils\ResponseFormatter;

/**
 * Class TemplateController
 *
 * Class saves received options.
 *
 * @package NewsParserPlugin\Controller
 */
class TemplateControllerWithUserInfo extends TemplateController
{
   

    /**
     * Get template by URL.And Rewmove userID data.
     *
     * @param string $url The URL of the template.
     * @return array|false The array of  template model attributes if found, false otherwise.
     */
    public function get($url)
    {
        $template_data=parent::get($url);
        if(is_array($template_data)){
            unset($template_data['userID']);
        }
        return $template_data;
    }
    /**
     * Save received options.
     *
     * @param array $options The received options.
     * @return TemplateModel  created template model.
     */
    public function create($options)
    {
        /**
         * @var TemplateModel $template_model
         */
        

        $updated_template_options=$this->addUserId($options);
        $template_model = $this->modelsFactory($updated_template_options);
        $template_model->create();
        return $template_model->getAttributes('array');
    }
     /**
     * Get instance of TemplateModel class.
     *
     * @param array $template_options The template options.
     * @return TemplateModel The instance of TemplateModel class.
     */
    protected function modelsFactory($template_options)
    {
        $template_model = new TemplateModel($template_options);
        return $template_model;
    }
    protected function addUserId($options)
    {
        $current_user_id=get_current_user_id();
        if (!current_user_can( 'publish_posts' )) {
            return new \MyException(Errors::text('NO_RIGHTS_TO_PUBLISH'),Error::code('BAD_REQUEST'));
            }
        if(is_int($current_user_id)){
            $options['userID']=$current_user_id;
        }
        return $options;
    }
}