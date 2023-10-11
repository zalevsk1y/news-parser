<?php

namespace NewsParserPlugin\View;

/**
 * Class loading template file and render it with args.
 *
 *
 * PHP version 5.6
 *
 * @author  Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license MIT https://opensource.org/licenses/MIT
 */
class TemplateRender
{
    /**
     * Path to the template file.
     *
     * @var string
     */
    protected $path;
    /**
     * Array of arguments for template.
     *
     * @var array
     */
    protected $args;
    /**
     * Init function
     *
     * @param string $template_path
     * @param array $args
     */
    public function __construct($template_path, $args = array())
    {
        if (!file_exists($template_path)) {
            throw new \Exception('Cannot load template file '.$template_path);
        }
        $this->path=$template_path;
        $this->args=$args;
    }
    /**
     * Render template.
     *
     * @param bool Echo output if true.
     * @return null|string
     */
    public function render($echo = true)
    {
        if (count($this->args)>0) {
            foreach ($this->args as $key => $item) {
                ${$key} = $item;
            }
        }
        ob_start();
        include $this->path;
        $output=ob_get_contents();
        if (true===$echo) {
            ob_end_flush();
            return;
        } elseif (false===$echo) {
            ob_end_clean();
            return $output;
        }
    }
}
