import settingsReducer from '../index';
import {defaultState} from '../defaultState';
import {types} from '../../actions';


describe ('reducers',()=>{
    it('should return default state',()=>{
        expect(settingsReducer(undefined,{})).toEqual(defaultState)
    })
    /**
     * testing global section actions
     */
    it('should handle SAVE_SETTINGS',()=>{
        const action={
            type:types.main.SET_ALL_SETTINGS,
            settings:defaultState.settings
        }
        expect(settingsReducer({},action)).toEqual(defaultState)
    })

      /**
     * testing main section actions
     */
    it('should handle SEND_REQUEST',()=>{
        const action={
            type:types.main.SEND_REQUEST
        }
        expect(settingsReducer(defaultState,action).main.isFetching).toEqual(true)
    })
    it('should handle RECEIVE_RESPONSE',()=>{
        const action={
            type:types.main.RECEIVE_RESPONSE,
            data:{
                err:0,
                msg:{
                    status:'success',
                    text:'ok'
                }
            }
        }
        expect(settingsReducer(defaultState,action)).toEqual(
            {...defaultState,
                main:{
                    isFetching:false,
                    error:action.data.err,
                    message:action.data.msg}
            }
        )
    })
    /**
     * testing general page actions
     */
    it('should  handle TOGGLE_ADDSOURCE action.Change switch state.',()=>{
        const action={
            type:types.general.TOGGLE_ADDSOURCE,
        }
        expect(settingsReducer(defaultState,action).settings.general.addSource).not.toBe(defaultState.settings.general.addSource)
    })
    /**
     * testing post page actions
     */
    it('should handle TOGGLE_ADD_THUMBNAIL',()=>{
        const action={
            type:types.post.TOGGLE_ADD_THUMBNAIL,
        }
        expect(settingsReducer(defaultState,action).settings.post.addThumbnail).not.toBe(defaultState.settings.post.addThumbnail)
    })
    it('should handle TOGGLE_PARSE_OTHER_PICTURES',()=>{
        const action={
            type:types.post.TOGGLE_PARSE_OTHER_PICTURES,
        }
        expect(settingsReducer(defaultState,action).settings.post.parseOtherPictures).not.toBe(defaultState.settings.post.parseOtherPictures)
    })
    it('should handle TOGGLE_SHOW_PICTURES_DIALOG',()=>{
        const action={
            type:types.post.TOGGLE_SHOW_PICTURES_DIALOG,
        }
        expect(settingsReducer(defaultState,action).settings.post.showPicturesDialog).not.toBe(defaultState.settings.post.showPicturesDialog)
    })
    it('should handle CHANGE_MAX_PICTURES',()=>{
        const action={
            type:types.post.CHANGE_MAX_PICTURES,
            number:5
        }
        expect(settingsReducer(defaultState,action).settings.post.maxPictures).toBe(action.number)
    })
       /**
     * testing gallery page actions
     */
    it('should handle TOGGLE_ADD_GALLERY',()=>{
        const action={
            type:types.gallery.TOGGLE_ADD_GALLERY
        }
        expect(settingsReducer(defaultState,action).settings.gallery.addGallery).not.toBe(defaultState.settings.gallery.addGallery)
    })
    it('should handle CHANGE_SHORTCODE',()=>{
        const action={
            type:types.gallery.CHANGE_SHORTCODE,
            text:'my-gallery'
        }
        expect(settingsReducer(defaultState,action).settings.gallery.shortCode).toBe(action.text)
    })
    it('should handle CHANGE_PARAMETER_NAME',()=>{
        const action={
            type:types.gallery.CHANGE_PARAMETER_NAME,
            text:'ids'
        }
        expect(settingsReducer(defaultState,action).settings.gallery.parameterName).toBe(action.text)
    })
})