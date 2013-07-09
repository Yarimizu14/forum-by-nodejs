var db  = require('./database');

/*
 * Model access to api server 
 */


// ユーザーデータを扱うオブジェクト
function UserDB() {};

UserDB.prototype = db.createClient();
/*
 *  addUser 
 *  ユーザーを追加する関数 
 */
UserDB.prototype.addUser = function() {
    console.log("addUser");
}
/*
 *  authorizeUser
 *  パスワードを確認する関数
 */
UserDB.prototype.authorizeUser = function(name, pw, callback) {
    console.log("authorizeUser");
    var q_str = 'SELECT * FROM users where name="' + name + '";';
    this.query(q_str, void 0, function (err, results, fields) {
        console.log(results);
        if(results[0] !==  void 0 && results[0].pw === pw) {
            console.log("login successful!!");
            callback(results[0]);
        } else {
            console.log("login denied!!");
        };
    });

};

function createUserDB() {
    return new UserDB();
};

exports.createUserDB = createUserDB;
