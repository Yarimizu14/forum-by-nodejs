var userModel       = require('../model/users.js'),
    threadModel     = require('../model/thread.js'),
    resModel        = require('../model/res.js'),
    favoriteModel   = require('../model/favorites.js');

var ress        = resModel.createResDB(),
    threads     = threadModel.createThreadDB(),
    favorites   = favoriteModel.createFavoriteDB();


/*
 * スレッド一覧の表示.
 * GET /thread/thread_listc
 */
exports.referThreadList = function(req, res){

    callback = function(threads_info) {
        var data = {};
        data.threads = threads_info;
        console.log(data);
        res.render('thread/thread_list', data);
    };
    threads.getAllThreads(callback);
};

/*
 * 新規スレッドの作成画面を表示.
 * GET /thread/create_thread
 */
exports.referThreadForm = function(req, res){
    console.log("スレッド作るよ!");
    console.log(req.session.user);
    if (!req.session.user) {
        res.render('user/user_login', { msg_exist : true, msg : "スレッド作成にはログインが必要です" });
    } else {
        res.render('thread/create_thread', {});
    }
};

/*
 * 新規スレッドを作成.
 * POST /thread/create_thread
 */
exports.createThread = function(req, res){
    var category_id = req.param("category_id");
    var title       = req.param("title");
    var description = req.param("description");

    var q_data = {
        user_id   : req.session.user.user_id,
        category_id : category_id,
        title   : title,
        description : description,
    };
    threads.createThread(q_data, function(results) {
       res.redirect('thread/list');
    });
};

/*
 * 各スレッドの表示
 * GET /thread/thread?thread_id=
 */
exports.referThread = function(req, res) {
    var thread_id = req.param('thread_id');
    var loginStatus = false;
    var user_id = null;

    if (!req.session.user) {
        loginStatus = false;
    } else {
        loginStatus = true;
        user_id = req.session.user.user_id;
    };

    var q_data = {
        user_id   : user_id,
        thread_id : thread_id
    };

    ress.getResByThread(q_data, function(results) {
        results.loginStatus = loginStatus;
        res.render('thread/thread', results);
    });
};

/*
 * スレッドに対するコメントを投稿
 * POST /thread/thread
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
 * DELETE /thread/delete_res_ajax
 */
exports.deleteRes = function(req, res) {
    console.log("delete res");
    var res_id = req.param('res_id');
    console.log(res_id);

    var q_data = {
        res_id : res_id
    };

    ress.deleteRes(q_data, function(results) {
        if(Object.keys(results).length) {
            res.contentType('json');
            //res.send({ response: JSON.stringify({resutls : results}) }); 
            res.send(JSON.stringify({response : results})); 
        } else {
            res.status('404').send('Error');
        };
    });
};


/*
 * レスにイイネをつける
 * POST /thread/create_favorite_ajax
 *
 */
exports.createFavorite = function(req, res) {
    var thread_id = req.param('thread_id');
    var res_id    = req.param('res_id');

    var q_data = {
        user_id   : req.session.user.user_id,
        thread_id : thread_id,
        res_id    : res_id
    };

    favorites.createFavorite(q_data, function(results) {
        if(Object.keys(results).length) {
            res.contentType('json');
            //res.send({ response: JSON.stringify({resutls : results}) }); 
            res.send(JSON.stringify({response : results})); 
        } else {
            res.status('404').send('Error');
        };
    });
};

/*
 * レスのイイネを取り消す
 * DELETE /thread/delete_favorite_ajax
 */
exports.deleteFavorite = function(req, res) {
    var thread_id = req.param('thread_id');
    var res_id    = req.param('res_id');

    var q_data = {
        user_id   : req.session.user.user_id,
        thread_id : thread_id,
        res_id    : res_id
    };

    favorites.deleteFavorite(q_data, function(results) {
        if(Object.keys(results).length) {
            res.contentType('json');
            //res.send({ response: JSON.stringify({resutls : results}) }); 
            res.send(JSON.stringify({response : results})); 
        } else {
            res.status('404').send('Error');
        };
    });
};

