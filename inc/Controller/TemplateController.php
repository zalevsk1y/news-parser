<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\TemplateModelWithPostOptions as TemplateModel;
use NewsParserPlugin\Utils\ResponseFormatter;

/**
 * Class TemplateController
 *
 * Class saves received options.
 *
 * @package NewsParserPlugin\Controller
 */
class TemplateController
{
    protected const TEMPLATE_TABLE_NAME = NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME;

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
        $template_model = $this->modelsFactory($options);
        $template_model->create();
        return $template_model->getAttributes('array');
    }

    /**
     * Get template by URL.
     *
     * @param string $url The URL of the template.
     * @return array|false The array of  template model attributes if found, false otherwise.
     */
    public function get($url)
    {
        $template_model=$this->findByUrl($url);
        return $template_model!==false?$template_model->getAttributes('array'):$template_model;
    }

    /**
     * Get all template keys.
     *
     * @return array The array of template keys.
     */
    public function templateKeys()
    {
        return array_keys($this->getAll());
    }

    /**
     * Delete template by URL.
     *
     * @param string $url The URL of the template to delete.
     * @return void
     */
    public function delete($url)
    {
        $template = $this->findByUrl($url);
        if ($template) {
            $template->delete();
        }
        return $this->templateKeys();
    }

    /**
     * Get all templates.
     *
     * @return array The array of templates.
     */
    protected function getAll()
    {
        if (!$templates = $this->getOption(self::TEMPLATE_TABLE_NAME)) {
            return [];
        }
        return json_decode(json_encode($templates),true);
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

    /**
     * Find template by URL.
     *
     * @param string $url The URL of the template.
     * @return TemplateModel|false The template model if found, false otherwise.
     */
    protected function findByUrl($url)
    {
        $templates = $this->getAll();
        if (array_key_exists($url, $templates)) {
            return $this->modelsFactory($templates[$url]);
        }
        return false;
    }

    /**
     * Get option by key.
     *
     * @param string $key The option key.
     * @return mixed The option value.
     */
    protected function getOption($key)
    {
        return get_option($key);
    }
}
