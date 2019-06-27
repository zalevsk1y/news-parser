<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Interfaces\ModelInterface;

/**
 * Class list of posts parsed from xml RSS feed model.
 *
 * PHP version 7.2.1
 *
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */

class ListModel implements ModelInterface
{
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }
    public function getAttributes($format = 'array')
    {
        if ($format == 'json') {
            return json_encode($this->data);
        }
        return $this->data;
    }
}
