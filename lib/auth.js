var errors = require("web-errors").errors;

module.exports = {
  ack: function (auth, config, req, res) {
    var data = auth.extract(req.body);
    if(!data) {
      res.send(errors.INPUT_INVALID);
      return;
    }
    auth.ack(config.app.token, data, function (error, data) {
      if(!error) {
        res.send(data);
        return;
      }
      switch(data) {
      case 2:
        res.send(errors.SIGNATURE_NOT_MATCH);
        break;
      default:
        res.send(errors.UNKNOWN_ERROR);
        break;
      }
    });
  }
};
