const config={
    mode:'production',
    root:'?page=news-parser-main-menu',
    emulateJSON:true,
    settingsApi:{
        getSettings:'admin-ajax.php?action=news_parser_settings_api&status=get',
        getDefaultSettings:'admin-ajax.php?action=news_parser_settings_api&status=default',
        saveSettings:'admin-ajax.php?action=news_parser_settings_api&status=save'
    },
    parsingApi:{
        list:'admin-ajax.php?action=news_parser_parsing_api&status=list&url=',
        single:'admin-ajax.php?action=news_parser_parsing_api&status=single&url='
    },
    defaultImage:'/images/Grey-Gradient.png',
    nonce:{
        id:{
            parse:'parsing-app',
            settings:'settings-app'
            },
        dataset:{
            parse:{
                get:'nonce'
            },
            settings:{
                get:'nonceSettingsGet',
                save:'nonceSettingsSave'
            }
        }
    },
    amedia:{
        phone:782
    },
    lang:{
        class:'wrap'
    }
} 


export default config;