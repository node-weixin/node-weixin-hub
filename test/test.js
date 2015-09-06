'use strict';
var assert = require('assert');
var nodeWeixinHub = require('../');
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
var auth = require("node-weixin-auth");

describe('node-weixin-hub node module', function () {
  it('should be able to ack', function (done) {
    var time = new Date().getTime();
    var nonce = 'nonce';
    var signature = auth.generateSignature(app.token, time,
      nonce);
    var echostr = 'Hello world!';
    var data = {
      signature: signature,
      timestamp: time,
      nonce: nonce,
      echostr: echostr
    };
    nodeWeixinHub.emit('weixin-auth-ack', auth, config, {body: data}, {
      send: function (data) {
        assert.equal(true, data === echostr);
        done();
      }
    });
  });
  it('should be able to prepare', function (done) {
    var url = "http://www.sina.com.cn/";
    nodeWeixinHub.emit('weixin-jssdk-prepare', auth, config, url, function (error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.appId === app.id);
      assert.equal(true, typeof data.signature === 'string');
      assert.equal(true, typeof data.nonceStr === 'string');
      assert.equal(true, typeof data.timestamp === 'string');
      done();
    });
  });

  it('should have able to get access', function (done) {
    nodeWeixinHub.emit('weixin-oauth-access', config, {state: 'STATUE', scope: 0}, {
      redirect: function (url) {
        assert.equal(true, url === 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0201661ce8fb3e11&redirect_uri=http%3A%2F%2Fsuccess.com%2F&response_type=code&scope=snsapi_base&state=STATUE#wechat_redirect');
        done();
      }
    });
  });

  it('should have able to handle success', function (done) {
    var code = 'aaa';
    var nock = require('nock');
    var params = {
      appid: app.id,
      secret: app.secret,
      grant_type: 'authorization_code',
      code: code,
      access_token: app.token
    };
    var url = 'https://api.weixin.qq.com';
    var reply = {
      openid: 'sofdso',
      access_token: 'sossoso',
      refresh_token: 'refresh_token'
    };

    nock(url)
      .post('/sns/oauth2/access_token')
      .query(params)
      .reply(200, reply);
    nodeWeixinHub.emit('weixin-oauth-success', config, code, function (error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.openid === reply.openid);
      assert.equal(true, data.access_token === reply.access_token);
      assert.equal(true, data.refresh_token === reply.refresh_token);
      done();
    });
  });

  it('should have able to handle success', function (done) {
    var code = 'aaa';
    var nock = require('nock');
    var params = {
      appid: app.id,
      secret: app.secret,
      grant_type: 'authorization_code',
      code: code,
      access_token: app.token
    };
    var url = 'https://api.weixin.qq.com';
    var reply = {
      openid: 'sofdso',
      access_token: 'sossoso',
      refresh_token: 'refresh_token'
    };

    nock(url)
      .post('/sns/oauth2/access_token')
      .query(params)
      .reply(200, reply);
    nodeWeixinHub.emit('weixin-oauth-success', config, code, function (error, data) {
      assert.equal(true, !error);
      assert.equal(true, data.openid === reply.openid);
      assert.equal(true, data.access_token === reply.access_token);
      assert.equal(true, data.refresh_token === reply.refresh_token);
      done();
    });
  });

  it('should be abel to handle callback', function (done) {
    var xml = ' <xml><appid><![CDATA[' +
      app.id + ']]></appid> <bank_type><![CDATA[CMB_CREDIT]]></bank_type> <cash_fee><![CDATA[1]]></cash_fee> <fee_type><![CDATA[CNY]]></fee_type> <is_subscribe><![CDATA[Y]]></is_subscribe> <mch_id><![CDATA[' +
      merchant.id + ']]></mch_id> <nonce_str><![CDATA[3UvYKTNeBfugpPC1wnIjAfl3NuG2Y0qD]]></nonce_str> <openid><![CDATA[oonTrs-hfXi6lZU2RbHMyXZJZqgk]]></openid> <out_trade_no><![CDATA[1440529715283]]></out_trade_no> <result_code><![CDATA[SUCCESS]]></result_code> <return_code><![CDATA[SUCCESS]]></return_code> <sign><![CDATA[73106901DDB8622648FFD4B67F1F7EDD]]></sign> <time_end><![CDATA[20150826030843]]></time_end> <total_fee>1</total_fee> <trade_type><![CDATA[JSAPI]]></trade_type> <transaction_id><![CDATA[1010080207201508260709669960]]></transaction_id> </xml>';
    var req = {rawBody: xml};
    var res = {
      json: function () {

      }
    };
    nodeWeixinHub.emit('weixin-pay-notify', config, req, res, function (error, data) {
      assert.equal(true, error !== true);
      assert.equal(true, data.is_subscribe === 'Y');
      assert.equal(true, data.trade_type === 'JSAPI');
      assert.equal(true, data.bank_type === 'CMB_CREDIT');
      assert.equal(true, data.total_fee === '1');
      assert.equal(true, data.fee_type === 'CNY');
      assert.equal(true, data.transaction_id === '1010080207201508260709669960');
      assert.equal(true, data.out_trade_no === '1440529715283');
      assert.equal(true, data.time_end === '20150826030843');
      done();
    });
  });
});

