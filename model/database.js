var mysql   = require('mysql'),
    config  = require('./config');

/*
 * Model access to api server 
 */


// ユーザーデータを扱うオブジェクト
function Database() {
};

Database.prototype.dbAuth = config.databaseAuth;

Database.prototype._getClient = function() {
    if (this.client === void 0) {
        this.client = mysql.createConnection(this.dbAuth);
    }
    return this.client;
};

/*
 *  query
 *  クエリを実行する 
 */
Database.prototype.query = function(query, params, callback) {
    var client = this._getClient();
    console.log(query);
    return client.query(query, params, callback);
};

/*
 *  authorizeUser
 *  パスワードを確認する関数
 */
Database.prototype.end = function(callback) {
    if (this.client) {
        this.client.end(callback);
        delete this.client;
    };
};

function createClient() {
    return new Database();
};

exports.createClient = createClient;
