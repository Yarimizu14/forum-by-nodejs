var userModel   = require('../model/users.js'),
    threadModel = require('../model/thread.js'),
    resModel    = require('../model/res.js');

/*
 * スレッド一覧の表示.
 * GET /thread/thread_listc
 */
exports.list = function(req, res){
    var ress    = resModel.createResDB();
    var threads = threadModel.createThreadDB();

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
exports.each = function(req, res) {
    var thread_id = req.param('thread_id');
    var title = req.params.title;

    var ress = resModel.createResDB();

    ress.getResByThread(thread_id, function(results) {
        var data = {};
        console.log(results);
        data.title = results[0].title;
        data.results = results;
        res.render('thread/thread', data);
    });
};

/*
 * スレッドに対するコメントを投稿
 *
 */
exports.res = function(req, res) {
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
