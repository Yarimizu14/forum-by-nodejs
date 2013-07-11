var userModel   = require('../model/users.js'),
    threadModel = require('../model/thread.js');

var users   = userModel.createUserDB();
var threads = threadModel.createThreadDB();

/*
 * referLoginForm
 * ログイン画面を表示する
 * GET /login
 */
exports.referLoginForm = function(req, res) {
    res.render('user/user_login', { msg_exist : false, msg : "" });
}

/*
 * autorize
 * ユーザー名、パスワードの確認 
 * POST /login
 */
exports.authorize = function(req, res) {
    var type = req.param('submit');
    var name = req.param('name');
    var pw   = req.param('pw');

    //ログイン・新規ユーザー作成失敗時のコールバック
    var error_callback =  function() {
        res.render('user/user_login', { msg_exist : true, msg : "Failed, try again" });
    };

    //ログイン時のコールバック
    var auth_callback = {
        success : function(user_info) {
            //ユーザー情報を保持
            req.session.user = user_info;
            res.redirect('/thread/list');
        },
        error : error_callback
    };

    // 新規ユーザー作成時のコールバック
    var create_callback = {
        success : function(results) {
            users.authorizeUser(name, pw, auth_callback);
        },
        error : error_callback
    };

    if (type === "regist") {
        //新規ユーザー作成
        users.createUser(name, pw, create_callback);
    } else if (type === "login") {
        //認証処理
        users.authorizeUser(name, pw, auth_callback);
    }

};

/*
 * referMypage
 * マイページの表示
 * GET /mypage
 */
exports.referMypage = function(req, res) {
    if (!req.session.user) {   //ログインしていない場合
        loginStatus = false;
        res.render('user/user_login', { msg_exist : false, msg : "" });
    } else {     //ログインしている場合
        loginStatus = true;
        user_id = req.session.user.user_id;
        res.render('user/mypage', { });
    };
}

/*
 * logout
 * ユーザーのログアウト
 * POST /logout
 */
exports.logout = function(req, res) {
    req.session.user = void 0;
    res.redirect('/thread/list');
}
