var db  = require('./database'),
    async = require('async'),
    escaperFactory = require('../util/escaper');

var escaper = escaperFactory.createEscaper();

function UserDB() {};

UserDB.prototype = db.createClient();

/*
 *  addUser 
 *  ユーザーを追加する関数 
 */
UserDB.prototype.createUser = function(q_data, callback) {
    var q_str = 'INSERT INTO users (name, pw, created) VALUES ( ?, ?, now());';
    this.query(q_str, q_data, function (err, results, fields) {
        if (err) {
           throw err; 
            callback.error();
        } else {
            escaper.unescapeObj(results);
            callback.success(results);
        };
    });
};

/*
 *  authorizeUser
 *  パスワードを確認する関数
 */
UserDB.prototype.authorizeUser = function(q_data, callback) {
    var q_str = 'SELECT * FROM users WHERE name = ? ;';
    this.query(q_str, q_data, function (err, results, fields) {
        if (err) {
            throw err
            callback.error();
        } else {
            callback.success(results);
        }
    });
};

/*
 * getMypage 
 * マイページを表示する関数 
 */
UserDB.prototype.getMypage = function(q_data, callback) {
    var self = this;
    async.parallel({
         getPostedRes : function(cbk) {
            var q_str = 'SELECT res.user_id, res.res_id, res.body, res.thread_id, DATE_FORMAT(res.created, "%Y-%m-%d %k:%i:%s"), threads.title FROM res INNER JOIN threads ON res.thread_id=threads.thread_id AND res.user_id=' + q_data.user_id + ' ORDER BY res.created DESC;';
            self.query(q_str, void 0, function (err, results, fields) {
                if (err) {
                    throw err;
                } else {
                    cbk(null, results);
                };
            });
         },
         getUserName : function(cbk) {
            var q_str = 'SELECT user_id, name FROM users WHERE user_id=' + q_data.user_id + ";";
            self.query(q_str, void 0, function (err, results, fields) {
                if (err) {
                    throw err;
                } else {
                    cbk(null, results);
                };
            });
         }
    }, function(err, results) {
        if (err) {
            throw err;
            callback.error(results);
        } else {
            escaper.unescapeObj(results);
            var data = {
                ownUser_id : q_data.ownUser_id,
                userName : results.getUserName[0],
                resList  : results.getPostedRes
            };
            callback.success(data);
        }
    });
}

function createUserDB() {
    return new UserDB();
};

exports.createUserDB = createUserDB;
