<?php
namespace Menu\Admin;

use Interfaces\MenuPageInterface;

/**
 * Class renders menu page.
 *
 *
 * @package  Menu
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */

class MenuPage implements MenuPageInterface
{
    protected $template = null;
    protected $args = null;
    public function render()
    {
        $args = $this->args;
        if (is_null($this->template)) {
            throw new \Exception('No template was set.Use setTemplate(templateName) to set template file before render it.');
        }
        include $this->template;
    }
    public function setTemplate($template, $args = null)
    {
        if (!file_exists($template)) {
            throw new \Exception('Template file ' . $template . ' doesn`t exist.');
        }
        $this->args = $args;
        $this->template = $template;
    }
}
