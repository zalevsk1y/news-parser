import {connect} from 'react-redux';
import Translate from '@news-parser/translate';
import * as settings from '../lang/settings.json';
import {getLanguage} from '@news-parser/helpers';
function mapStateToProps(state){
return {
    lang:getLanguage(),
    dict:settings
}
}

export default connect(mapStateToProps)(Translate);