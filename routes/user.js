var userModel   = require('../model/users.js'),
    threadModel = require('../model/thread.js');

/*
 * ログイン画面を表示する
 * GET /login
 */
exports.login = function(req, res) {
    res.render('user/user_login', { title: 'Login Form'});
}

/*
 * ユーザー名、パスワードの確認 
 * POST /login
 */
exports.authorize = function(req, res) {
    var name = req.param('name');
    var pw = req.param('pw');

    //モデルをインスタンス化
    var users   = userModel.createUserDB();
    var threads = threadModel.createThreadDB();

    //ログイン成功・失敗時のコールバック
    var callback = {
        success : function(user_info) {
            var data = {};
            data.user = user_info;
            var cbk = function(threads_info) {
                data.threads = threads_info;
                console.log(data);
                res.render('thread/thread_list', data);
            };
            threads.getAllThreads(cbk);
        },
        error : function() {
            res.render('user/user_login_fail', {});
        }
    };
    
    //認証処理
    users.authorizeUser(name, pw, callback);
};
