var pay = require('node-weixin-pay');
module.exports = {
  init: function (config, data, cb) {
    pay.api.order.unified(config, data, function (error, data) {
      if(error) {
        cb(true, error);
        return;
      }
      var prepayId = data.prepay_id;
      var prepayData = pay.prepay(prepayId, app, merchant);
      cb(false, prepayData)
    });
  },
  notify: function (config, req, res, cb) {
    pay.callback.notify(config.app, config.merchant, req, res, cb);
  }
}
