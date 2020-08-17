/**
 * Class join state objects like DB tables.
 * 
 * @since 1.0.0 
 *  
 */
class Table{
    /**
     * Init function.
     * 
     * @param {array} table 
     */
    constructor(table){
        this.table=[...table];
    }
    /**
     * Add to this.table array items properties from joinTables objects.
     * joinTables - should have objects with index of this.table array as a property name.
     * 
     * @param {object} joinTables 
     * @returns {array}
     */
    join(joinTables){
        let newTable=this.table;
        Object.keys(joinTables).forEach(name=>newTable=this.joinOnce(newTable,joinTables[name],name));
        return newTable;
    }
    /**
     * Add properties of  joinTable object to the item of mainTable with index as joinTable
     * property name.
     * 
     * @param {array} mainTable Array of items
     * @param {object} joinTable Object with mainTable items index as property name.
     * @param {string} propName Property name that will by add to mainTable. 
     */
    joinOnce(mainTable,joinTable,propName){
        return mainTable.map((data,index)=>({...data,[propName]:(joinTable[index]!==undefined&&joinTable[index])}));
    }
    /**
     * 
     * @param {string} row 
     * @param {string} operator 
     * @param {string} value 
     */
    selectWhere(row,operator,value){
        switch (operator){
            case 'like':
                return this._selectWhereLike(row,value);
            default:
                return [];
        }
    }
    /**
     * 
     * @param {string} key 
     */
    removeDuplicate(key){
        const hashTable={},uniqItemsArray=[];
        this.table.forEach(item=>typeof(item)==='object'&&item.hasOwnProperty(key)&&(hashTable[item[key]]=item));
        const uniqHashValues=(new Set(Object.keys(hashTable))).values();
        return uniqHashValues.map(uniqHashValue=>hashTable[uniqHashValue]);
    }
    /**
     * 
     * @param {string} row 
     * @param {string} value 
     */
    _selectWhereLike(row,value){
        return this.table.filter(item=>(new RegExp(value,'i').test(item[row])));
    }
}

export const table=mainTable=>(new Table(mainTable));