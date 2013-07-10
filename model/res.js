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


ResDB.prototype.deleteRes = function(q_data, callback) {
     var q_str = 'delete from res where res_id=' + q_data.res_id + ";";
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
    var self = this;
    async.parallel({
        getThreadInfo : function(cbk) {
            var q_str = 'select threads.title, threads.description from threads where threads.thread_id=' + q_data.thread_id + ';'
            self.query(q_str, void 0, function (err, results, fields) {
                cbk(null, results);
            });
        },
        getResInfo   : function(cbk) {
            var q_str = 'select res.res_id, res.body from res where res.thread_id=' + q_data.thread_id + ';'
            self.query(q_str, void 0, function (err, results, fields) {
                cbk(null, results);
            });
        }
    }, function(err, results) {
        console.log(results);
        callback({
            thread_id  : q_data.thread_id,
            title      : results.getThreadInfo[0].title,
            description: results.getThreadInfo[0].description,
            res        : results.getResInfo
        });
    });
};

function createResDB() {
    return new ResDB();
};

exports.createResDB = createResDB;
