module.exports = {
    proxy: {
      '/api': { 
        target: 'http://192.168.123.66:8080', 
        changeOrigin: false
      }
    }
  }