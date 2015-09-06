var jssdk = require('node-weixin-jssdk');
module.exports = {
  prepare: function (auth, config, url, next) {
    jssdk.prepare(auth, config.app, url, next);
  }
};
