import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Posts,PostsProps} from '../../../../src/packages/modules/Posts/Posts';
import { describe, it, jest, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';

jest.mock('globals', () => {
    return {
      newsParserSettings: {},
      newsParserApiEndpoints: {}
    }
  })

describe('Posts', () => {
    const mockOpenEditor = jest.fn();
    const mockSelectPost = jest.fn();
    const mockPosts:PostsProps['posts'] = [
        {
            _id: 1,
            title: 'Post 1',
            pubDate: '2023-09-07',
            image: 'post1.jpg',
            description: 'This is post 1',
            link: 'post1-link'
        },
        {
            _id: 2,
            title: 'Post 2',
            pubDate: '2023-09-08',
            image: 'post2.jpg',
            description: 'This is post 2',
            link: 'post2-link',
        },
    ];

    beforeEach(() => {
        mockOpenEditor.mockClear();
        mockSelectPost.mockClear();
    });

    it('renders the correct number of post cards', () => {
        const { getAllByTestId } = render(
            <Posts openEditor={mockOpenEditor} selectPost={mockSelectPost} posts={mockPosts} />
        );

        const postCards = getAllByTestId('post-card');
        expect(postCards).toHaveLength(mockPosts.length);
    });

    it('calls the openEditor function with the correct arguments when clicking on the edit icon', () => {
        const { getByTitle } = render(
            <Posts openEditor={mockOpenEditor} selectPost={mockSelectPost} posts={mockPosts} />
        );

        const editIcon = getByTitle('Edit post');
        fireEvent.click(editIcon);

        expect(mockOpenEditor).toHaveBeenCalledTimes(1);
        expect(mockOpenEditor).toHaveBeenCalledWith(2, 'editor-link');
    });

    it('calls the selectPost function with the correct argument when clicking on the select icon', () => {
        const { getByTitle } = render(
            <Posts openEditor={mockOpenEditor} selectPost={mockSelectPost} posts={mockPosts} />
        );

        const selectIcon = getByTitle('Unselect post');
        fireEvent.click(selectIcon);

        expect(mockSelectPost).toHaveBeenCalledTimes(1);
        expect(mockSelectPost).toHaveBeenCalledWith(2);
    });

    it('calls the selectPost function with the correct argument when clicking on the unselect icon', () => {
        const { getByTitle } = render(
            <Posts openEditor={mockOpenEditor} selectPost={mockSelectPost} posts={mockPosts} />
        );

        const unselectIcon = getByTitle('Select post');
        fireEvent.click(unselectIcon);

        expect(mockSelectPost).toHaveBeenCalledTimes(1);
        expect(mockSelectPost).toHaveBeenCalledWith(1);
    });

    it('calls the openEditor function with the correct arguments when clicking on the visual constructor icon', () => {
        const { getByTitle } = render(
            <Posts openEditor={mockOpenEditor} selectPost={mockSelectPost} posts={mockPosts} />
        );

        const visualConstructorIcon = getByTitle('Visual constructor');
        fireEvent.click(visualConstructorIcon);

        expect(mockOpenEditor).toHaveBeenCalledTimes(1);
        expect(mockOpenEditor).toHaveBeenCalledWith(2, 'post2-link');
    });
});
