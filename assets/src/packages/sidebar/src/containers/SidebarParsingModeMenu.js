import React, { useCallback } from 'react';
import { Select } from '../components/Select';
import { SidebarItemLabel } from '../components/SidebarItemLabel';
import { SidebarItem } from '../components/SidebarItem';
import { connect } from 'react-redux';
import { changeSubmitType } from '@news-parser/parser-rss/actions/app.actions';
import { SUBMIT_TYPE_LIST ,SUBMIT_TYPE_PAGE } from '@news-parser/parser-rss/constants';

export function SidebarParsingModeMenu ({submitType,changeSubmitType}){
        const PARSE_RSS='Parse RSS',
            PARSE_PAGE='Parse Page';
        let selectState=submitType;
        const submitSelection=useCallback((e)=>{
            changeSubmitType(selectState)
        }),
            getSelectState=useCallback((state)=>{
                selectState=state
            })
        return (
            <>
                <SidebarItem wide={true} border={true}>
                <SidebarItemLabel>Select parsing mode:</SidebarItemLabel>
                <Select onStateChange={getSelectState} value={submitType}>
                    <option value={SUBMIT_TYPE_LIST}>{PARSE_RSS}</option>
                    <option value={SUBMIT_TYPE_PAGE}>{PARSE_PAGE}</option>
                </Select>
                </SidebarItem>
                <SidebarItem>
                    <SidebarItemLabel></SidebarItemLabel>
                    <button className='sidebar-submit-button'onClick={submitSelection}>Select</button>
                </SidebarItem>
            </>
        )
    
}

function mapStateToProps(state){    
    return {
        submitType:state.parse.appState.submitType,

    }
}
function mapDispatchToProps (dispatch){
    return {
        changeSubmitType:function(submitType){
            dispatch(changeSubmitType(submitType))
        }
    }
}

export default connect (mapStateToProps,mapDispatchToProps) (SidebarParsingModeMenu)