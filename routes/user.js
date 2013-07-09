var userModel   = require('../model/users.js'),
    threadModel = require('../model/thread.js');
/*
 * GET users listing.
 */

exports.login = function(req, res) {
    console.log('/login');
    var name = req.param('name');
    var pw = req.param('pw');

    var users   = userModel.createUserDB();
    var threads = threadModel.createThreadDB();

    console.log(users);
    console.log(threads);

    users.authorizeUser("hoge", "hoge", function(user_info) {
        var data = {};
        data.user = user_info;
        var callback = function(threads_info) {
            data.threads = threads_info;
            console.log(data);
            res.render('thread/thread_list', data);
        };
        threads.getAllThreads(callback);
    });
/*
*/
};
