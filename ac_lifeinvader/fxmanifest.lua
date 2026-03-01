fx_version 'cerulean'
game 'gta5'

shared_scripts {
    'config/config.lua',
    'config/languages.lua'
}

client_scripts {
    '@ac_core/client.lua',
    'client/client.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/server.lua',
    'config/webhooks.lua'
}

ui_page 'html/index.html'

files {
    'config/uiconfig.js',
    'html/css/*.css',
    'html/font/*.otf',
    'html/font/*.ttf',
    'html/js/*.js',
    'html/index.html',
    'html/img/*.*'
}

despencies {
    'ac_core',
    'es_extended',
    'oxmysql'
}
