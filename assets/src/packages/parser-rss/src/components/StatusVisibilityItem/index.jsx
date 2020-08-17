import React from 'react';
import { SettingsItem } from '../SettingsItem';

export class StatusVisibilityItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <SettingsItem>
                'Visibility'
            </SettingsItem>
        )
    }
}