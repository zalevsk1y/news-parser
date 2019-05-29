import React from 'react';
import {connect} from 'react-redux';
import {postPage} from '../actions/index';
import Switch from '../components/Switch';
import InputField from '../components/InputField';
import {POST_FIELD_NAME} from '../actions/index';
import PropTypes from 'prop-types';

export const PostPage = ({settings, toggleAddThumbnail, toggleParseOtherPictures, toggleShowPicturesDialog,changeMaxPictures}) => (
    <div>
    <table className="settings-content">
        <tbody>
            <tr>
                <th>
                    Add thumbnail to post
                </th>
                <td>
                    <Switch
                        className="settings-switch parse-pictures"
                        active={settings.addThumbnail}
                        onClick={toggleAddThumbnail}
                        fieldName='addThumbnail'></Switch>
                </td>
            </tr>
            <tr>
                <th>
                    Parse all pictures 
                </th>
                <td>

                    <Switch
                        className="settings-switch download-pictures"
                        active={settings.parseOtherPictures}
                        onClick={toggleParseOtherPictures}
                        fieldName='downloadPictures'></Switch>
                    <p className="description">
                        Parsed pictures urls will be add to your post body. More
                        <a href="#">info</a>
                    </p>

                </td>
            </tr>
        </tbody>
    </table>
    <table className={"sub-settings-content "+(settings.parseOtherPictures?"visible":"hidden")}>       
        <tbody>    
        <tr>
                <th>
                    Show select pictures dialog
                </th>
                <td>
                    <Switch
                        className="settings-switch download-pictures"
                        active={settings.showPicturesDialog}
                        onClick={toggleShowPicturesDialog}
                        fieldName='downloadPictures'></Switch>
                    <p className="description">
                        Parsed pictures urls will be add to your post body. More
                        <a href="#">info</a>
                    </p>

                </td>
            </tr>
            
            <tr>
                <th>
                    Maximum Pictures to add
                </th>
                <td>
                    <InputField
                        className="settings-class-container"
                        onEnterPress={changeMaxPictures}
                        onBlur={changeMaxPictures}
                        fieldName={'MaxPictures'}
                        value={settings.maxPictures}/>
                    <p className="description">
                        You can specify maximum number of pictures to add to your post.
                    </p>

                </td>
            </tr>
        </tbody>
    </table>
    </div>
)


const mapStateToProps = (state, ownProps) => {
        return {
            settings: state.settings[POST_FIELD_NAME]
        }
    },
    mapDispatchToProps = (dispatch, ownProps) => {
        const toggleAddThumbnail = () => {
                dispatch(postPage.addThumbnail());
            },
            toggleParseOtherPictures = () => {
                dispatch(postPage.parseOtherPictures());
            },
            toggleShowPicturesDialog = () => {
                dispatch(postPage.showPicturesDialog());
            },
            changeMaxPictures = (number) => {
                dispatch(postPage.maxPictures(parseInt(number)))
            };
        return {toggleAddThumbnail, toggleParseOtherPictures, toggleShowPicturesDialog,changeMaxPictures}

    }

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);

PostPage.propTypes={
    settings:PropTypes.shape({
        addThumbnail:PropTypes.bool,
        downloadPictures:PropTypes.bool,
        maxPictures:PropTypes.number
    }).isRequired,
    toggleAddThumbnail:PropTypes.func.isRequired,
    toggleParseOtherPictures:PropTypes.func.isRequired,
    toggleShowPicturesDialog:PropTypes.func.isRequired,
    changeMaxPictures:PropTypes.func.isRequired

}