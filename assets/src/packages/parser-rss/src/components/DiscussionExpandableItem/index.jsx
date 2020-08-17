import React from 'react'
import {SettingsExpandableItem} from '../SettingsItem';

export class DiscussionExpandableItem extends React.Component{
    constructor(props){
        super (props)
    }
    render(){
        return (
            <SettingsExpandableItem title='Discussion'>
                Discussion 
            </SettingsExpandableItem>
        )
    }
}