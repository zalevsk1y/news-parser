/**
 * Class join state objects like DB tables.
 * 
 * @since 1.0.0 
 *  
 */
class Table{
    protected table:Array<object>

    /**
     * Init function.
     * 
     * @param {array} table 
     */
    constructor(table:Array<object>){
        this.table=[...table];
    }

    /**
     * Add to this.table array items properties from joinTables objects.
     * joinTables - should have objects with index of this.table array as a property name.
     * 
     * @param {object} joinTables 
     * @returns {array}
     */
    public join(joinTables:Record<string,Record<string,boolean>>){
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
    joinOnce(mainTable:Array<any>,joinTable:Record<string,boolean>,propName:string){
        return mainTable.map((data,index)=>({...data,[propName]:(joinTable[index]!==undefined&&joinTable[index])}));
    }
}

export const table=(mainTable:Array<object>)=>(new Table(mainTable));