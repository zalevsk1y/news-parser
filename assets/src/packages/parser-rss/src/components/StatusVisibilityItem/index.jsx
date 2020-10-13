import React from 'react';
import { SettingsItem } from '../SettingsItem';
import {SettingsExpandableItem} from '../SettingsExpandableItem';

export class StatusVisibilityItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <SettingsExpandableItem title='Status&Visibility'>
                'Visibility'
            </SettingsExpandableItem>
        )
    }
}