import React from 'react';

import {SettingsBox} from '../../components/SettingsBox'
import {SettingsGrid} from '../../components/SettingsGrid';
import {SettingsItem} from '../../components/SettingsItem'
import {SettingTitle} from '../../components/SettingTitle';
import {SettingValue} from '../../components/SettingValue';
import {SettingsSubmitButton} from '../../components/SettingsSubmitButton';
import {AdditionalSettingsItem} from '../../components/AdditionalSettingsItems';

import './post-selected-form.scss';

export class PostsSelectedForm extends React.Component{
    constructor(props){
        super (props);
        this.state={postsSelectedCount:0}
    }
    additionalSettings(){
        return(
            <SettingsGrid>
                <SettingsItem>
                    <SettingsTitle>Categories</SettingsTitle>
                    <SettingsValue></SettingsValue>
                </SettingsItem>
            </SettingsGrid>
        )
    }
    render(){
        return (
            <SettingsBox>
                <SettingsGrid>
                    <SettingsItem>
                        <SettingTitle>Posts selected</SettingTitle>
                        <SettingValue>
                            <div className='filter-elements-wrapper d-flex flex-row'>
                                <div className="search-type-text flex-grow-1">
                                    {this.state.postsSelectedCount}
                                </div>
                                <span>
                                    <i className='fo fo-settings'>S</i>
                                </span>
                            </div>
                        </SettingValue>
                    </SettingsItem>
                    <AdditionalSettingsItem />
                </SettingsGrid>
                
                <SettingsSubmitButton>
                        <button className='button-main' >Parse</button> 
                </SettingsSubmitButton>
            </SettingsBox>
        )
    }
}