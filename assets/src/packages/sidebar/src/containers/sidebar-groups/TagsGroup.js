import React from "react";
import { useDispatch, useSelector } from "react-redux";
import  TagInput  from "../../components/TagInput";
import { SidebarItemsGroup } from "../../components/SidebarItemsGroup";
import { addTag, diselectTag, selectTag } from "../../actions/tag.actions";
import { SidebarItem } from "../../components/SidebarItem";

export class TagsGroup1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [], selected: [] };
    this.TagInputHandler = this.TagInputHandler.bind(this);
  }
  TagInputHandler(tag) {
    if (tag.id == undefined) {
      const tagExists = this.props.tags.filter(
        (item) => item.name === tag.name
      )[0];
      tagExists == undefined
        ? this.props.addTag(tag.name)
        : this.props.selectTag(tagExists.id);
      return;
    }
    this.props.diselectTag(tag.id);
  }
  render() {
    return (
      <SidebarItemsGroup header="Tags" border={"bottom"}>
        <TagInput
          id="tag-input"
          labelText="Add New Tag:"
          bottomCapture="Separate with commas or the Enter key."
          onChange={this.TagInputHandler}
          tags={this.props.tags.filter((tag) =>
            this.props.selected.includes(tag.id)
          )}
        />
      </SidebarItemsGroup>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.parse.sidebar.tags);
  return {
    tags: state.parse.sidebar.tags,
    selected: state.parse.sidebar.selectedTags,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    selectTag: (id) => {
      dispatch(selectTag(id));
    },
    diselectTag: (id) => {
      dispatch(diselectTag(id));
    },
    addTag: (name) => {
      dispatch(addTag(name));
    },
  };
}

//export default connect(mapStateToProps,mapDispatchToProps) (TagsGroup)

const TagsGroup = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.parse.sidebar.tags);
  const selected = useSelector((state) => state.parse.sidebar.selectedTags);

  const TagInputHandler = (tag) => {
    if (tag.id === undefined) {
      const tagExists = tags.filter((item) => item.name === tag.name)[0];
      tagExists === undefined
        ? dispatch(addTag(tag.name))
        : dispatch(selectTag(tagExists.id));
      return;
    }
    dispatch(diselectTag(tag.id));
  };
  
  return (
    <SidebarItem>
      <TagInput
        id="tag-input"
        labelText="Add New Tag:"
        bottomCapture="Separate with commas or the Enter key."
        onChange={TagInputHandler}
        tags={tags.filter((tag) => selected.includes(tag.id))}
      />
    </SidebarItem>
  );
};

export default TagsGroup;
