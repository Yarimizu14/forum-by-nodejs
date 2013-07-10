var db    = require('./database'),
    async = require('async');


// スレッドデータを扱うオブジェクト
function ResDB() {};

ResDB.prototype = db.createClient();
/*
 *  createRes 
 *  新しいレスを追加する関数 
 */
ResDB.prototype.createRes = function(q_data, callback) {
    var q_str = 'insert into res (user_id, thread_id, body, created) value (' + q_data.user_id + ', ' + q_data.thread_id + ', "' + q_data.body + '", now())';
    console.log(q_str);
    this.query(q_str, void 0, function (err, results, fields) {
        console.log(results);
        callback(results);
    });
}
/*
 * getAllRess 
 * 指定したスレッドの全てのコメントを取得する関数 
 */
ResDB.prototype.getResByThread = function(q_data, callback) {
   var q_str = 'select res.body, threads.title from threads, res where threads.thread_id=' + q_data.thread_id + ' AND res.thread_id='  + q_data.thread_id + ';'
   console.log(q_str);
    this.query(q_str, void 0, function (err, results, fields) {
        callback(results);
    });
};

function createResDB() {
    return new ResDB();
};

exports.createResDB = createResDB;
