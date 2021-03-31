module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://backend:8000',
                ws: true,
                changeOrigin: true,
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Ichnaea';
                return args;
            })
    }
}