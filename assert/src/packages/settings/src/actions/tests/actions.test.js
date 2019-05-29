import {
    types,
    generalPage,
    postPage,
    galleryPage,
    main
} from '../index';

import config from '@news-parser/config'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';



describe('Actions Settings',()=>{
    /**
     * general page
     */
    it('should create action to toggle add source switch at general page',()=>{
        const expectedAction={
            type:types.general.TOGGLE_ADDSOURCE,
        }
        expect(generalPage.toggleAddSource()).toEqual(expectedAction)
    })
    /**
     * post page
     */

    it('should create action to toggle parse pictures switch at post page',()=>{
        const expectedAction={
            type:types.post.TOGGLE_ADD_THUMBNAIL,
        }
        expect(postPage.addThumbnail()).toEqual(expectedAction)
    })
    it('should create action to toggle download switch at post page',()=>{
        const expectedAction={
            type:types.post.TOGGLE_PARSE_OTHER_PICTURES,
        }
        expect(postPage.parseOtherPictures()).toEqual(expectedAction)
    })
    it('should create action to add id or class of post body tag container',()=>{
        const expectedAction={
            type:types.post.TOGGLE_SHOW_PICTURES_DIALOG,
    
        }
        expect(postPage.showPicturesDialog(expectedAction.number)).toEqual(expectedAction)
    })
    it('should create action to add id or class of post body tag container',()=>{
        const expectedAction={
            type:types.post.CHANGE_MAX_PICTURES,
            number:5
        }
        expect(postPage.maxPictures(expectedAction.number)).toEqual(expectedAction)
    })
    /**
     * gallery page
     */
    
    it('should create action to toggle add gallery switch',()=>{
        const expectedAction={
            type:types.gallery.TOGGLE_ADD_GALLERY
        }
        expect(galleryPage.addGallery()).toEqual(expectedAction)
    })
    it('should create action to change gallery shortcode',()=>{
        const expectedAction={
            type:types.gallery.CHANGE_SHORTCODE,
            text:'my-gallery'
        }
        expect(galleryPage.shortCode(expectedAction.text)).toEqual(expectedAction)
    })
    it('should create action to change parameters name of gallery shortcode',()=>{
        const expectedAction={
            type:types.gallery.CHANGE_PARAMETER_NAME,
            text:'ids'
        }
        expect(galleryPage.parameterName(expectedAction.text)).toEqual(expectedAction)
    })
    /**
     * main page actions
     * async actions test
     */
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    it('should create RECEIVE_RESPONSE action when setting saved to server',()=>{
        const response={
            main:{
                err:0,
                msg:{
                    test:'saved',
                    status:'ok'
                }
            }
        };
        const nonce='testNonce';
        const expectedAction={
            type:types.main.RECEIVE_RESPONSE,
            data:response.main
        }
        fetchMock.once(
            config.settingsApi.saveSettings+'&_wpnonce='+nonce,
            response
        )
        const store=mockStore({settings:{}})
        
        store.dispatch(main.saveSettingsToServer(store.dispatch,{test:'test'},nonce)).then(()=>{
            expect(store.getActions().length).toEqual(2);
            expect(store.getActions()[1]).toEqual(expectedAction)
        })
        
    })
    it('should create SET_ALL_SETTINGS action when settings get from server',()=>{
        const response={
           settings:{ param1:true,
                      param2:false
           }
        }
        const nonce='testNonce';
        const expectedAction=[{
            type:types.main.SET_ALL_SETTINGS,
            settings:response.settings
        }]
        fetchMock.once(config.settingsApi.getSettings+'&_wpnonce='+nonce,
            response
            );
        const store=mockStore({settings:{}});
        store.dispatch(main.getSettingsFromServer(store.dispatch,nonce)).then(()=>{
            expect(store.getActions()).toEqual(expectedAction)
        })
    })
})