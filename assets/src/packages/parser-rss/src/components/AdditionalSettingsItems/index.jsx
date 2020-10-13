import React from 'react';
import { StatusVisibilityItem } from '../StatusVisibilityItem';
import {CategoriesExpandableItem} from '../CategoriesExpandableItem' 

export class AdditionalSettingsItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                <>
                    <StatusVisibilityItem />
                    <CategoriesExpandableItem />
                </>
        )
    }
}