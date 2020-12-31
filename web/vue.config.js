module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://backend:8000',
                ws: true,
                changeOrigin: true,
            }
        }
    }
}