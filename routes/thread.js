var userModel   = require('../model/users.js'),
    threadModel = require('../model/thread.js'),
    resModel    = require('../model/res.js');



var ress = resModel.createResDB();
var threads = threadModel.createThreadDB();

/*
 * スレッド一覧の表示.
 * GET /thread/thread_listc
 */
exports.showList = function(req, res){

    callback = function(threads_info) {
        var data = {};
        data.threads = threads_info;
        console.log(data);
        res.render('thread/thread_list', data);
    };
    threads.getAllThreads(callback);
};

/*
 * 各スレッドの表示
 * GET /thread/thread?thread_id=
 */
exports.showThread = function(req, res) {
    var thread_id = req.param('thread_id');

    var q_data = {
        thread_id : thread_id
    };

    ress.getResByThread(q_data, function(results) {
        console.log(results);
        res.render('thread/thread', results);
    });
};

/*
 * スレッドに対するコメントを投稿
 *
 */
exports.createRes = function(req, res) {
    var thread_id = req.param('thread_id');
    var title     = req.param('title');
    var body      = req.param('body');

    var q_data = {
        user_id   : req.session.user.user_id,
        thread_id : thread_id,
        body      : body,
    };

    ress.createRes(q_data, function(results) {
        var data = {
            thread_id : thread_id,
            results   : results
        };
       //res.render('thread/thread?thread_id=' + thread_id, data);
       res.redirect('thread/thread?thread_id=' + thread_id);
    });
};

/*
 * スレッドに対するコメントを削除
 *
 */
exports.deleteRes = function(req, res) {
    console.log("delete res");
    var res_id = req.param('res_id');

    var q_data = {
        res_id : res_id
    };

    ress.deleteRes(q_data, function(results) {
        res.contentType('json');
        //res.send({ response: JSON.stringify({resutls : results}) }); 
        res.send(JSON.stringify({response : results})); 
    });
};

