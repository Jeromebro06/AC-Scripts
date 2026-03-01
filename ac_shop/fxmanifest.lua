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
    'server/server.lua'
}

ui_page 'html/index.html'

files {
    'config/uiconfig.js',
    'html/css/*.css',
    'html/font/*.otf',
    'html/font/*.ttf',
    'html/js/*.js',
    'html/index.html',
    'item_images/*.png',
    'html/img/*.*'
}

despencies {
    'es_extended',
    'ac_core'
}
