var db  = require('./database');


// スレッドデータを扱うオブジェクト
function ThreadDB() {};

ThreadDB.prototype = db.createClient();
/*
 *  createThread 
 *  新しいスレッドを追加する関数 
 */
ThreadDB.prototype.createThread = function() {
    console.log("addThread");
}
/*
 * getAllThreads 
 * 全てのスレッドを追加する関数 
 */
ThreadDB.prototype.getAllThreads = function(callback) {
    var q_str = "SELECT * FROM threads";
    this.query(q_str, void 0, function (err, results, fields) {
        console.log(results);
        callback(results);
   });


};

function createThreadDB() {
    return new ThreadDB();
};

exports.createThreadDB = createThreadDB;
