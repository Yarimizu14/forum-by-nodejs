var userModel   = require('../model/users.js'),
    resModel = require('../model/res.js');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.each = function(req, res) {
    var title = req.params.title;
    var ress = resModel.createResDB();

    ress.getResByThread(title, function(results) {
        var data = {};
        data.title = title;
        data.results = results;
        res.render('thread/thread', data);
    });
};

exports.create = function(req, res) {
    var title = req.param('title');
    var body = req.param('body');

    console.log(title);
    console.log(body);

    var ress = resModel.createResDB();

    ress.createRes(body, function(results) {
        var data = {};
        data.title = title;
        data.results = results;
        res.render('thread/thread', data);
    });
};
