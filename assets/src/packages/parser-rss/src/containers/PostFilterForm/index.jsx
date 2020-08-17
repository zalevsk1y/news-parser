import React from "react";
import { InputTag } from "../../components/InputTag/";
import { addPostFilter } from "./actions";
import { removePostFilter } from "./actions";

import {SettingsBox} from '../../components/SettingsBox'
import {SettingsGrid} from '../../components/SettingsGrid';
import {SettingsItem} from '../../components/SettingsItem'
import {SettingTitle} from '../../components/SettingTitle';
import {SettingValue} from '../../components/SettingValue';
import { connect } from "react-redux";
import "./post-filter-form.scss";

export class PostFilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.tagChangeHandler = this.tagChangeHandler.bind(this);
    this.state = { resetTags: false };
  }
  tagChangeHandler(event) {
    switch (event.type) {
      case "add":
        this.props.addFilterTag(event.name);
        break;
      case "remove":
        this.props.removeFilterTag(event.name);
        break;
    }
  }
  resetButton({ onClick }) {
    return (
      <span>
        <i className="fo fo-delete" onClick={onClick}>
          D
        </i>
      </span>
    );
  }
  componentDidUpdate() {
    this.state.resetTags && this.setState({ resetTags: false });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.resetTags === true && nextState.resetTags === false) {
      return false;
    } else {
      return true;
    }
  }
  render() {
    return (
     <SettingsBox>
       <SettingsGrid>
          <SettingsItem>
            <SettingTitle>Posts filters</SettingTitle>
            <SettingValue>
                  <div className="input-tag-container d-flex flex-row">
                    <InputTag
                      className="flex-grow-1"
                      resetButton={this.resetButton}
                      onChange={this.tagChangeHandler}
                    />
                  </div>
            </SettingValue>
          </SettingsItem>
       </SettingsGrid>
     </SettingsBox>
                  
    );
  }
}

function mapStateToProps(state) {
  return {
    postFilters: ["cars", "bmw"],
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addFilterTag: (postFilterValue) => {
      dispatch(addPostFilter(postFilterValue));
    },
    removeFilterTag: (postFilterValue) => {
      dispatch(removePostFilter(postFilterValue));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostFilterForm);
