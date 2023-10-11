/**
 * Class for extends by other classes, provide extended array methods. 
 */
class ArrayExtendedMethods{
    /**
     * Call callback function on every array element and break if callback returns anything but false.
     * arguments passed to callback [element],[index],[array]
     * 
     * @param {array} arr 
     * @param {function} callback 
     * 
     * @return {any}
     */
    forEachWithBreak<Input,Output>(arr:Array<Input>,callback:(item:Input,index:number,arr:Array<Input>)=>false|Output):false|Output{
        let result:false|Output=false;
        for(let i=0,end=arr.length;i<end;i++){
            result=callback.call(this,arr[i],i,arr);
            if(result!==false) break;
        }
        return result
    }

    /**
     * Call every callback from array of callbacks and pass then elements of args array as arguments,
     * if callback return anything but false then break and return that value.
     * 
     * @param {*} callbackArr Array of callback functions
     * @param {*} args Array of arguments that will be passed to every callback function
     * 
     * @returns {any}
     */
    reduceWithBreak<Input,Output>(callbackArr:Array<(arg:Array<Input>)=>Output|false>,args:Array<Input>):false|Output{
        if(!Array.isArray(callbackArr)) return false;
        let result:false|Output=false;
        for(let i=0,end=callbackArr.length;i<end;i++){
            result=callbackArr[i].apply(this,[args]);
            if(result!==false) break;
        }
        return result;
    }
}

export default ArrayExtendedMethods;