var request = require('request'),
    mysql   = require('mysql');

/*
 * Model access to api server 
 */

function categoryDB() {};

/*
 *  createCategory 
 *  お気に入りを追加する関数 
 */
categoryDB.prototype.createFavorite = function(name) {
};

/*
 *  getAllPosts
 *  全ての掲示板を取得する関数
 */
categoryDB.prototype.getAllFavorites = function() {
};

/*
 *  getFavoriteByUser
 *  特定のユーザーのお気に入りの投稿を取得する関数
 */
categoryDB.prototype.getFavoriteByUser = function(user_id) {
};


function createCategoryDB() {
    return new categoryDB();
};

exports.createCategoryDB = createFavriteDB;
