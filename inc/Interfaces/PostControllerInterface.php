<?php
namespace NewsParserPlugin\Interfaces;
/**
 * Interface for Post Controller.
 *
 * This interface defines the contract for a Post Controller, which is responsible for creating post drafts, retrieving parsed data, and updating the body array in the parsed data.
 *
 * @package  NewsParserPlugin\Interfaces
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
interface PostControllerInterface
{
    /**
     * Create a post draft and return the response in the proper format.
     *
     * @param string $url The URL of the post that should be parsed and saved as a draft.
     * @param string $_id The front-end index of the post that should be parsed and saved as a draft.
     * @param string $template_url Object with parameters for WP post.
     * @return array The response in the proper format.
     * @throws MyException if an error occurs during the creation of the post draft.
     */
    public function create($url, $_id, $template_url = false);

    /**
     * Get the parsed data associated with the Post Controller.
     *
     * @return array The parsed data.
     */
    public function getParsedData();

    /**
     * Update the body array in the parsed data of the Post Controller.
     *
     * @param array $body_array The array of body elements to update the parsed data with.
     * @return void
     */
    public function updateParsedDataBody(array $body_array);
}

