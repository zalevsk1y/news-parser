<?php

namespace Utils;

/**
 * Class load menu config file.
 * 
 * @package Utils
 * @author  Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license MIT https://opensource.org/licenses/MIT
 */
class MenuConfig
{
    protected static $config;

    public static function get()
    {
        if (!static::$config) {
            static::$config = include NEWS_PARSER_DIR . 'menu-config.php';
        }

        return static::$config;
    }
}
