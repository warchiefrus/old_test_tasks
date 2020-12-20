const devMode = process.env.NODE_ENV === 'development';

module.exports = {
    publicPath: devMode
            ? `http://${process.env.VUE_DEV_SERVER_HOST}:${process.env.VUE_DEV_SERVER_PORT}/`
            : './',
    outputDir: './../web/vue/pages',
    assetsDir: '',
    devServer: {
        port: process.env.VUE_DEV_SERVER_PORT,
        host: process.env.VUE_DEV_SERVER_HOST,
        open: false,
        disableHostCheck: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    },
    filenameHashing: false,
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
    },
    css: {extract: false},
    pages: {
        'test-task': {
            entry: './src/pages/test-task/page_entry.js',
            template: 'public/index.html',
        },
    },
    productionSourceMap: false
}
