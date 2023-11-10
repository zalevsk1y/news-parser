import {wp} from 'globals';

const {__,_n}=wp.i18n;
// pages/parser-rss
export const PAGES={
    PARSER_RSS:{
        INPUT_BUTTON:__('Parse RSS Feed','news-parser'),
        POSTS_SECTION_MESSAGE:__('You have selected', 'news-parser'),
        POST:__('post','news-parser'),
        POSTS2:_n('post','posts',2,'news-parser'),
        POSTS5:_n('post','posts',5,'news-parser'),
        POST_WAS_PARSED:__('post was parsed','news-parser'),
        POST_WAS_PARSED2:_n('post was parsed','posts were parsed',2,'news-parser'),
        POST_WAS_PARSED5:_n('post was parsed','posts were parsed',5,'news-parser'),
        PROGESS_WAIT:__('Please wait.Parsing in progress...','news-parser'),
        PARSE_BUTTON:__('Parse','news-parser'),
       
    },
    PARSER_PAGE:{
        INPUT_BUTTON:__('Parse page','news-parser'),
    },
    AUTOPILOT:{
        CURRENT_STATUS:__('Current status','news-parser'),
        DELETE_TEMPLATE_TITLE:__('Delete Template Confirmation'),
        DELETE_TEMPLATE_BODY:__('Are you sure you want to delete the template? This action cannot be undone.'),
        DELETE_TEMPLATE_BUTTON:__('Delete Template'),
        CANCEL_DELETE_TEMPLATE_BUTTON:__('Cancel'),
        SCHEDULE_OPTIONS:__('Schedule Options'),
        RIGHT_SECTION_TITLE:__('Autopilot Parsing'),
        RIGHT_SECTION_BODY:__('The autopilot parsing feature is currently in beta mode. Please be aware that it may have some bugs or unexpected behavior. Use it carefully.'),
        SELECT_BUTTON:__('Select'),
        SELECT_BUTTON_LOADING:__('Loading...')
        
    }
}
export const MESSAGE={
    ERROR:{
        WRONG_URL_INPUT:__('Wrong url input','news-parser'),
        NO_SAVED_PARSING_TEMPLATE:__('Save parsing template first.','news-parser'),
        COULD_NOT_PARSE_POSTS:__('Some of the posts could not be parsed.','news-parser'),
        POST_NOT_PARSED:__('Post was not parsed.','news-parser'),
    },
    SUCCESS:{
        POSTS_PARSED:__('Posts were parsed successfully','news-parser'),
        POST_PARSED:__('Post was parsed and saved.','news-parser'),
    }
}

export const WIDGETS={
    VISUAL_CONSTRUCTOR:{
        WIDGET_TITLE:__('Parsing Constructor','news-parser'),
        CREAT_POST_BUTTON:__('Creat Post','news-parser'),
        SAVE_TEMPLATE_BUTTON:__('Save Template','news-parser')
    }
}

export const COMPONENTS={
    SIDEBAR_RIGHT:{
        SECTIONS_TITLE:{
            CATEGORIES:__('Categories','news-parser'),
            DISCUSSION:__('Discussion','news-parser'),
            STATUS_VISIBILITY:__('Satus&Visibility','news-parser'),
            TAGS:__('Tags','news-parser'),
            EXTRA_OPTIONS:__('Extra options','news-parser'),
            FEATURED_IMAGE:__('Featured Image','news-parser'),
            IMAGE_OPTIONS:__('Image options','news-parser'),
            POST_TITLE:__('Post title','news-parser')            
        },
        CATEGORIES_GROUP:{
            ADD_NEW_CATEGORY:__('Add New Category','news-parser'),
            SEARCH_CATEGORIES:__('Search Categories','news-parser'),
            NEW_CATEGORY_NAME:__('New Category Name','news-parser'),
            PARENT_CATEGORY:__('Parent Category','news-parser'),
        },
        DISCUSSION_GROUP:{
            ALLOW_COMMENTS:__('Allow comments','news-parser'),
            ALLOW_PINGBACKS:__('Allow pingbacks & trackbacks','news-parser')
        },
        STATUS_VISIBILITY:{
            POST_STATUS:__('Status','news-parser'),
            POST_FORMAT:__('Post format','news-parser')
        },
        TAG_GROUP:{
            TAG_LABEL:__('Add New Tag','news-parser'),
            TAG_CAPTION:__('Separate with commas or the Enter key.','news-parser')
        },
        EXTRA_OPTIONS_GROUP:{
            ADD_SOURCE_LINK_CAPTION:__('Add source link to the post','news-parser'),
            SAVE_PARSING_TEMPLATE:__('Save parsing template that you can use in automatic parsing from this source.','news-parser') 
        },
        FEATURED_MEDIA_GROUP:{
            FEATURED_MEDIA_CAPTION:__('If you want to change featured image, select image you would like to choose in the constructor and click "Change image" button.','news-parser'),
            NO_FEATURED_MEDIA:__('No featured image.','news-parser')
        },
        IMAGE_OPTIONS_GROUP:{
            GROUR_IMAGES_IN_ROWS:__('Groups images in two in the row.','news-parser'),
            ADD_SRCSET:__('Add srcset and sizes attribures to the parsed images.','news-parser')
        },   
        POST_TITLE_GROUP:{
            POST_TITLE_CAPTION:__('If you want to change title, type the new title and press "Change title" button.','news-parser')
        }   
    }
}