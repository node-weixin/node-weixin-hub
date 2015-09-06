var Emitter = require('events').EventEmitter;
var oauth = require('./lib/oauth');
var jssdk = require('./lib/jssdk');
var pay = require('./lib/pay');
var auth = require('./lib/auth');

var emitter = new Emitter();
emitter.on('weixin-auth-ack', auth.ack);
emitter.on("weixin-jssdk-prepare", jssdk.prepare);
emitter.on("weixin-oauth-access", oauth.access);
emitter.on("weixin-oauth-success", oauth.success);
emitter.on("weixin-pay-init", pay.init);
emitter.on("weixin-pay-notify", pay.notify);
module.exports = emitter;
