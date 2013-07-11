var db  = require('./database');

// ユーザーデータを扱うオブジェクト
function UserDB() {};

UserDB.prototype = db.createClient();

/*
 *  addUser 
 *  ユーザーを追加する関数 
 */
UserDB.prototype.createUser = function(name, pw, callback) {
    var q_str = 'INSERT INTO users (name, pw, created) VALUES ("' + name + '", "' + pw + '", now());';
    this.query(q_str, void 0, function (err, results, fields) {
        if (err) {
           throw err; 
            callback.error();
        } else {
            console.log(results);
            callback.success(results);
        };
    });
}
/*
 *  authorizeUser
 *  パスワードを確認する関数
 */
UserDB.prototype.authorizeUser = function(name, pw, callback) {
    var q_str = 'SELECT * FROM users WHERE name="' + name + '";';
    this.query(q_str, void 0, function (err, results, fields) {
        if (err) {
            throw err
            callback.error();
        } else {
            if(results[0] !==  void 0 && results[0].pw === pw) {
                console.log("login successful!!");
                callback.success(results[0]);
            } else {
                console.log("login denied!!");
                callback.error();
            };
        }
    });
};

function createUserDB() {
    return new UserDB();
};

exports.createUserDB = createUserDB;
