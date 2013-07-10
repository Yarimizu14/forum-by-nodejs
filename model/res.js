var db    = require('./database'),
    async = require('async');


// スレッドデータを扱うオブジェクト
function ResDB() {};

ResDB.prototype = db.createClient();
/*
 *  createRes 
 *  新しいレスを追加する関数 
 */
ResDB.prototype.createRes = function(body, callback) {
    var q_str = 'insert into res (user_id, thread_id, body, created) values (2, 1, "' + body + '", now());';
    this.query(q_str, void 0, function (err, results, fields) {
        console.log(results);
        callback(results);
    });
}
/*
 * getAllRess 
 * 指定したスレッドの全てのコメントを取得する関数 
 */
ResDB.prototype.getResByThread = function(thread_id, callback) {
    var q_str = 'select threads.title, res.body from threads,res where threads.forum_id=' + thread_id + ';';
    this.query(q_str, void 0, function (err, results, fields) {
        callback(results);
    });
};

function createResDB() {
    return new ResDB();
};

exports.createResDB = createResDB;
