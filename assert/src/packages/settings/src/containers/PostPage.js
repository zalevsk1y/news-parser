import React from 'react';
import {connect} from 'react-redux';
import {postPage} from '../actions/index';
import Switch from '../components/Switch';
import InputField from '../components/InputField';
import {POST_FIELD_NAME} from '../actions/index';
import PropTypes from 'prop-types';
import Translate from './Translate';

export const PostPage = ({settings, toggleAddThumbnail, toggleParseOtherPictures, toggleShowPicturesDialog,changeMaxPictures}) => (
    <div>
    <table className="settings-content">
        <tbody>
            <tr>
                <th>
                    <Translate>Add main image to post</Translate>
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
                    <Translate>Parse all pictures</Translate> 
                </th>
                <td>

                    <Switch
                        className="settings-switch download-pictures"
                        active={settings.parseOtherPictures}
                        onClick={toggleParseOtherPictures}
                        fieldName='downloadPictures'></Switch>
                    <p className="description">
                        <Translate>Try to parse additional image from the page.More</Translate>&nbsp;
                        <a href="?page=news-parser-menu-about#news-parser-settings"><Translate>info</Translate></a>
                    </p>

                </td>
            </tr>
        </tbody>
    </table>
    <table className={"sub-settings-content "+(settings.parseOtherPictures?"visible":"hidden")}>       
        <tbody>    
        <tr>
                <th>
                    <Translate>Show select pictures dialog</Translate>
                </th>
                <td>
                    <Switch
                        className="settings-switch download-pictures"
                        active={settings.showPicturesDialog}
                        onClick={toggleShowPicturesDialog}
                        fieldName='downloadPictures'></Switch>
                    <p className="description">
                        <Translate>Show preview of all parsed images in additional window.More</Translate>&nbsp;
                        <a href="?page=news-parser-menu-about#news-parser-settings"><Translate>info</Translate></a>
                    </p>

                </td>
            </tr>
            
            <tr>
                <th>
                    <Translate>Maximum pictures to add</Translate>
                </th>
                <td>
                    <InputField
                        className="settings-class-container"
                        onEnterPress={changeMaxPictures}
                        onBlur={changeMaxPictures}
                        fieldName={'MaxPictures'}
                        value={settings.maxPictures}/>
                    <p className="description">
                        <Translate>You can specify maximum number of pictures to add to your post</Translate>
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