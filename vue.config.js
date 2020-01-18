module.exports = {
  devServer: {
    disableHostCheck: true,
    useLocalIp: false,
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    }
  }
};
