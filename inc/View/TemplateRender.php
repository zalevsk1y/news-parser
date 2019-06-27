<?php

namespace NewsParserPlugin\View;

/**
 * Class loading template file and render it with args.
 *
 * @author  Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license MIT https://opensource.org/licenses/MIT
 */
class TemplateRender
{
    /**
     * Get render template.
     *
     * @param string $template_path path to the template
     * @param array  $object_args   associative array of args
     *
     * @return string
     */
    public function render($template_path, $object_args)
    {
        if (!file_exists($template_path)) {
            throw new \Exception('Cannot load template file '.$template_path);
        }
        foreach ($object_args as $key => $item) {
            ${$key} = $item;
        }
        ob_start();
        include $template_path;
        $content = ob_get_contents();
        ob_end_clean();

        return $content;
    }
}
