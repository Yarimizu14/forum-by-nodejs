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

    var ress = resModel.createResDB();
    
    var q_data = {
        thread_id : thread_id
    };

    ress.getResByThread(q_data, function(results) {
        var data = {
            thread_id : thread_id,
            title     : results[0].title,
            results   : results
        };
       res.render('thread/thread', data);
    });
};

/*
 * スレッドに対するコメントを投稿
 *
 */
exports.res = function(req, res) {
    var thread_id = req.param('thread_id');
    var title     = req.param('title');
    var body      = req.param('body');

    console.log(title);
    console.log(thread_id);
    console.log(body);

    var ress = resModel.createResDB();

    var q_data = {
        user_id   : 1,
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
