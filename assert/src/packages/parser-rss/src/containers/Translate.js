import Translate from '@news-parser/translate';
import parser from '../lang/parser.json';
import {connect} from 'react-redux';
import {getLanguage} from '@news-parser/helpers';

function mapStateToProps (state){
    return {
        lang:getLanguage(),
        dict:parser
    }
}

export default connect(mapStateToProps)(Translate);