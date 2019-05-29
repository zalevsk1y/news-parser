import React from 'react';
import {create} from 'react-test-renderer';
import {Indicator} from "../Indicator";


describe('Indicator',()=>{
    const component=create(<Indicator isAnimate={false}/>);
    const indicator=component.root.findByType('span');
    it('should  not show and animate indicator when isAnimate prop is false',()=>{
        expect(indicator.props.style).toEqual({"left": "-90%", "opacity": 0})
    });
    it ('should animate indicator when isAnimate prop is true',()=>{
        const instance=component.getInstance();
        var counter=0;
        var end=5;
        global.requestAnimationFrame=(fn)=>{
            if(counter<end){
                counter++;
                fn.call(instance)
            }
        };
        component.update(<Indicator isAnimate={true} step={0.5}/>)
        expect(indicator.props.style).toEqual({"left": "-87.5%", "opacity": 1})
    })
   
})