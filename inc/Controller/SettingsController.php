<?php

namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Utils\Settings;
use NewsParserPlugin\Interfaces\ControllerInterface;
/**
 * Class controller for the settings
 *
 * PHP version 7.2.1
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class SettingsController 
{
    protected $settings;
    protected $formatter;
    public function __construct(Settings $settings, ResponseFormatter $formatter)
    {
        $this->settings = $settings;
        $this->formatter = $formatter;
    }
    /**
     * Get current settings
     *
     * @return string json format
     */
    public function get()
    {
        try {
            $response = array(
                'main' => $this->formatter->message('none')->get('array'),
                'settings' => $this->settings->get('array'),
            );
        } catch (MyException $e) {
            $response = array(
                'main' => $this->formatter->message('error', Errors::text('SETTINGS_CANNOT_BE_SAVED'))->get('array'),
                'settings' => array(),
            );
        }
        return \json_encode($response);
    }
    /**
     * Get default settings
     *
     * @return string json format
     */
    public function getDefault()
    {
        try {
            $response = array(
                'main' => $this->formatter->message('none')->get('array'),
                'settings' => $this->settings->getDefault('array'),
            );
        } catch (MyException $e) {
            $response = array(
                'main' => $this->formatter->error(1)->message('error', Errors::text('SETTINGS_CANNOT_BE_SAVED'))->get('array'),
                'settings' => array(),
            );
        }
        return \json_encode($response);
    }
    /**
     * Save settings
     *
     * @param string $new_settings new settings
     * 
     * @return string message json format
     */
    public function set(array $new_settings)
    {
        try {
            
            $message = $this->settings->set($new_settings);
            if ($message) {
                $message = $this->formatter->message('success', Success::text('SETTINGS_SAVED'))->get('array');
            }
        } catch (MyException $e) {
            $message = $this->formatter->error(1)->message('error', Errors::text('SETTINGS_CANNOT_BE_SAVED'))->get('array');
        }
        $main_response = array(
            'main' => $message,
        );
        return \json_encode($main_response);
    }
}
