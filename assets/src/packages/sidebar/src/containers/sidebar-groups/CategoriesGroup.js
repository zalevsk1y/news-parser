import React from 'react'
import { CategoriesCheckboxList } from '../../components/CategoriesCheckboxList';
import { CategoiresOptionList } from '../../components/CategoiresOptionList';
import { Select } from '../../components/Select';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarItemsGroup } from '../../components/SidebarItemsGroup';
import { SidebarItemExpandable } from '../../components/SidebarItemExpandable';
import { addCategory,selectCategory,diselectCategory } from '../../actions/category.actions';
import {connect} from 'react-redux'
import '@news-parser/styles/sidebar/_input-container.scss';
import '@news-parser/styles/sidebar/_categories-group.scss';

export class CategoriesGroup extends React.Component{
    constructor (props){
        super(props);
        this.changeFilterValue=this.changeFilterValue.bind(this);
        this.categorySelectHandler=this.categorySelectHandler.bind(this);
        this.newCategoryNameInputHandler=this.newCategoryNameInputHandler.bind(this);
        this.newCategoryParentSelectHandler=this.newCategoryParentSelectHandler.bind(this);
        this.addCategoryHandler=this.addCategoryHandler.bind(this)
        this.state={filterValue:'',addCategoryParams:{parent:0,name:''}}
    }
    changeFilterValue(event){
        const inputedValue=event.target.value;
        this.setState({filterValue:inputedValue})
    }
    categoriesFilter(categoryName){
        return this.filterWithParent(categoryName,this.props.categories)||[]
    }
    filterWithParent(categoryName,categories){
        const getParent=(categoryObj,categoryArr)=>categoryArr.find((categoryItem)=>categoryItem.id==categoryObj.parent)||false,
            filteredCategories=categories.filter(category=>category.name.includes(categoryName));
            filteredCategories.forEach(categoryItem=>{
                let parentCategoryItem=getParent(categoryItem,categories);
                parentCategoryItem&&filteredCategories.findIndex(categoryItem=>categoryItem.id==parentCategoryItem.id)==-1&&filteredCategories.push(parentCategoryItem)
        })
        return filteredCategories;
    }
    categorySelectHandler(event,id){
        const checkedStatus=event.target.checked;
        if(checkedStatus===undefined) return
        checkedStatus?this.props.selectCategory(id):this.props.diselectCategory(id)
    }
    categoryAddHandler(event,parent){
        this.props.addCategory(event.target,parent)
    }
    newCategoryNameInputHandler(event){
        this.setState({addCategoryParams:{...this.state.addCategoryParams,name:event.target.value}})
    }
    newCategoryParentSelectHandler(event){
        this.setState({addCategoryParams:{...this.state.addCategoryParams,parent:event.target.value}})
    }
    addCategoryHandler(){
        if (this.state.addCategoryParams.name=='') return;
        this.props.addCategory(this.state.addCategoryParams.name,this.state.addCategoryParams.parent)
    }
    render(){
        return (
            <SidebarItemsGroup header='Categories' border={'bottom'}>
                    <SidebarItem>
                        <div className='input-container categories-search'>
                            <label htmlFor='categories-filter-input'>Search Categories:</label>
                            <input type='text'  id='categories-filter-input' onChange={this.changeFilterValue} />
                        </div>
                    </SidebarItem>
                    <SidebarItem>
                        <CategoriesCheckboxList categories={this.categoriesFilter(this.state.filterValue)} id={0} selected={this.props.selected} onChange={this.categorySelectHandler}/>
                    </SidebarItem>
                    <SidebarItemExpandable expandButtonCallback={(onClick)=><button onClick={onClick} className='pop-up-link'>Add New Category</button>}>
                        <div className='sidebar-item-expandable-row'>
                            <label htmlFor='category-input'>New Category Name</label>
                            <input type='text' id='category-input' onBlur={this.newCategoryNameInputHandler}></input>
                       </div>
                       <div className='sidebar-item-expandable-row'>
                            <label htmlFor='parent-category-select'>Parent Category</label><br></br>
                            <Select id='arent-category-select' onChange={this.newCategoryParentSelectHandler}>
                                <option value={0} >— Parent Category —</option>
                                <CategoiresOptionList id={0} categories={this.props.categories} />
                            </Select>
                       </div>
                       <div className='sidebar-item-expandable-row'>
                            <button className='sidebar-submit-big-button' onClick={this.addCategoryHandler}>Add New Category</button>
                        </div>
                    </SidebarItemExpandable>
                </SidebarItemsGroup>
        )
    }
}

CategoriesGroup.defaultProps={
    categories:[]
}

function mapStateToProps(state) {
    return {
        categories:state.parse.sidebar.categories,
        selected:state.parse.sidebar.selectedCategories
    }
}
function mapDispatchToProps(dispatch){
    return {
        addCategory:(name,parent)=>{
            
            dispatch(addCategory(name,parent))
        },
        selectCategory:(id)=>{
            dispatch(selectCategory(id))
        },
        diselectCategory:(id)=>{
            dispatch(diselectCategory(id))
        }
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(CategoriesGroup)