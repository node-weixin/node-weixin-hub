var oauth = require('node-weixin-oauth');
module.exports = {
  access: function (config, data, res) {
    var url = oauth.createURL(config.app.id, config.urls.success,
      data.state, data.scope);
    res.redirect(url);
  },
  success: function (config, code, cb) {
    oauth.success(config.app, code, cb);
  }
};
