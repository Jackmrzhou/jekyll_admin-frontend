module.exports = {
    proxy: {
      '/api': { 
        target: 'http://192.168.123.135:8081', 
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' 
        }
      }
    }
  }