import {connect} from 'react-redux';
import {generalPage} from '../actions/index.js';
import React from 'react';
import Switch from '../components/Switch.js';
import {GENERAL_FIELD_NAME} from '../actions/index';
import PropTypes from 'prop-types';

export const GeneralPage = ({settings, toggleAddSource}) => (
    <table className="settings-content">
        <tbody>
            <tr>
                <th>
                    Add a link to the source
                </th>
                <td>
                    <Switch
                        className="settings-switch add-link"
                        active={settings.addSource}
                        onClick={toggleAddSource}
                        fieldName='addSource'></Switch>
                </td>
            </tr>
        </tbody>
    </table>
)


const mapStateToProps = (state) => {
        return {
            settings: state.settings[GENERAL_FIELD_NAME]
        }
    },
    mapDispatchToProps = (dispatch) => {
        return {
            toggleAddSource: function () {
                dispatch(generalPage.toggleAddSource());
            }
        }
    };

export default connect(mapStateToProps, mapDispatchToProps)(GeneralPage);

GeneralPage.propTypes={
    settings:PropTypes.shape({
        addSource:PropTypes.bool
    }).isRequired,
    toggleAddSource:PropTypes.func.isRequired
}