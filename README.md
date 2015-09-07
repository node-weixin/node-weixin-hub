#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Wexin Hub For Every Weixin Usage


## Install

```sh
$ npm install --save node-weixin-hub
```


## Usage

```js
var nodeWeixinHub = require('node-weixin-hub');

```

### Define config

```js
var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};
var merchant = {
  id: process.env.MERCHANT_ID,
  key: process.env.MERCHANT_KEY
};
var certificate = {
  pfx: 'sdfsf',
  pfxKey: 'sss'
};
var config = {
  app: app,
  merchant: merchant,
  certificate: certificate,
  urls: {
    success: 'http://success.com/'
  }
};
```

### Emit Events

```js
//Ack
nodeWeixinHub.emit('weixin-auth-ack', auth, config, req, res);

//JSSDK-Prepare
var url = "http://www.sina.com.cn/";
nodeWeixinHub.emit('weixin-jssdk-prepare', auth, config, url, function (error, preparedData) {
  //preparedData
});

//Oauth access and redirect
nodeWeixinHub.emit('weixin-oauth-access', config, {state: 'STATUE', scope: 0}, res);

//Oauth success 
nodeWeixinHub.emit('weixin-oauth-success', config, code, function (error, data) {
  //data.openid
  //data.access_token
  //data.refresh_token
});

//Pay init
nodeWeixinHub.emit('weixin-pay-init', config, data, function (error, prepayData) {
});

//Pay notify
nodeWeixinHub.emit('weixin-pay-notify', config, req, res, function (error, data) {
  //data.is_subscribe
  //data.trade_type
  //data.bank_type
  //data.total_fee
  //data.fee_type
  //data.transaction_id
  //data.out_trade_no
  //data.time_end
});
```


## License

MIT © [node-weixin](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/node-weixin-hub.svg
[npm-url]: https://npmjs.org/package/node-weixin-hub
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-hub.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-hub
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-hub.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-hub
