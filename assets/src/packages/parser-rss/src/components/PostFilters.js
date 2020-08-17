import React from 'react';

function PostFilters ({props}){
    return (
        <div className="post-filters-container">
        <label htmlFor="filter-input">Post Filters</label>
            <div className="filter-input-wrapper">
                {props.children}
            </div>
                <i className="filter-delete-icon"></i>
            </div>
    )
}