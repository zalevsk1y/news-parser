/**
 * Base class to extend by other classes.
 * 
 * @since 1.0.0
 */
export class BaseClass{
 /**
  * Check arguments for undefined
  * 
  * @param {object} args 
  * @returns {true|Error}
  */
    argsCheck(args){
        let argNames=Object.keys(args);
        argNames.forEach(name=>{
            if (args[name]===undefined) return new Error ('Argument ${name} is undefined.')
        })
        return true;
    }
}