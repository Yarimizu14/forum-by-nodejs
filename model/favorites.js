var db  = require('./database');

// スレッドデータを扱うオブジェクト
function FavoriteDB() {};

FavoriteDB.prototype = db.createClient();

/*
 * getAllFavorites 
 * 全てのスレッドを追加する関数 
 */
FavoriteDB.prototype.getAllFavorites = function(callback) {
    var q_str = "SELECT * FROM favorites;";
    this.query(q_str, void 0, function (err, results, fields) {
        console.log(results);
        callback(results);
   });
};

/*
 *  createFavorite 
 *  新しいイイネを追加する関数 
 */
FavoriteDB.prototype.createFavorite = function(q_data, callback) {
    var q_str = 'INSERT INTO favorites (user_id, thread_id, res_id, created) VALUES (' + q_data.user_id + ',' + q_data.thread_id + ',' + q_data.res_id + ', now());';

    this.query(q_str, void 0, function (err, results, fields) {
        console.log(results);
        callback(results);
   });
}

/*
 *  deleteFavorite 
 *  イイネを削除する関数 
 */
FavoriteDB.prototype.deleteFavorite = function(q_data, callback) {
    var q_str = 'DELETE FROM favorites where user_id=' + q_data.user_id + ' AND thread_id=' + q_data.thread_id + ' AND res_id=' + q_data.res_id + ';';

    this.query(q_str, void 0, function (err, results, fields) {
        console.log(results);
        callback(results);
   });
}


function createFavoriteDB() {
    return new FavoriteDB();
};

exports.createFavoriteDB = createFavoriteDB;
