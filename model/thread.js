var db  = require('./database');
var escaperFactory = require('../util/escaper');

var escaper = escaperFactory.createEscaper();

// スレッドデータを扱うオブジェクト
function ThreadDB() {};

ThreadDB.prototype = db.createClient();

/*
 * getAllThreads 
 * 全てのスレッドを追加する関数 
 */
ThreadDB.prototype.getAllThreads = function(callback) {

    var q_str = "SELECT * FROM threads";
    this.query(q_str, void 0, function (err, results, fields) {
        if (err) {
            throw err;
            callback.error(results);
        } else {
            callback.success(results);
        }
   });
};

/*
 *  createThread 
 *  新しいスレッドを追加する関数 
 */
ThreadDB.prototype.createThread = function(q_data, callback) {

    var esc = escaper.escape(q_data.title);
    console.log(esc)
    var uesc = escaper.unescape(esc);
    console.log(uesc)

    var q_str = 'INSERT INTO threads (user_id, category_id, title, description, created, updated) VALUES (' + q_data.user_id + ',' + q_data.category_id + ',"' + q_data.title + '","' + q_data.description + '", now(), now());'
    this.query(q_str, void 0, function (err, results, fields) {
        if (err) {
            callback.error(results);
        } else {
            callback.success(results);
        };
   });
}

function createThreadDB() {
    return new ThreadDB();
};

exports.createThreadDB = createThreadDB;
