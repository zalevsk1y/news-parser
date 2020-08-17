import React from 'react';
import {SettingsExpandableItem} from '../SettingsItem';

export class CategoriesExpandableItem extends React.Component{
    constructor (props){
        super (props);
    }
    render(){
        return (
            <SettingsExpandableItem title='Categories'>
                Categories
            </SettingsExpandableItem>
        )
    }
}
