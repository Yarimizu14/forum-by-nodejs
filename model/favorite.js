var request = require('request'),
    mysql   = require('mysql');

/*
 * Model access to api server 
 */

var base_url = 'http://49.212.141.115:3000';

function favoriteDB() {};

/*
 *  createFavorite 
 *  お気に入りを追加する関数 
 */
favoriteDB.prototype.createFavorite = function(post_id, user_id) {
};

/*
 *  getAllPosts
 *  全ての掲示板を取得する関数
 */
favoriteDB.prototype.getAllFavorites = function() {
};

/*
 *  getFavoriteByUser
 *  特定のユーザーのお気に入りの投稿を取得する関数
 */
favoriteDB.prototype.getFavoriteByUser = function(user_id) {
};


function createFavoriteDB() {
    return new favoriteDB();
};

exports.createFavoriteDB = createFavriteDB;
