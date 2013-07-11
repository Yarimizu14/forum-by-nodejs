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
    this.query(q_str, void 0, function (err, results, fields) {
        callback(results);
    });
}

/*
 * deleteRes 
 * 指定したレスを削除する 
 * */ 

ResDB.prototype.deleteRes = function(q_data, callback) {
    var self = this;
    async.parallel({
         deleteRes : function(cbk) {
            var q_str = 'DELETE FROM res WHERE res_id=' + q_data.res_id + ";";
            self.query(q_str, void 0, function (err, results, fields) {
                if (err) {
                    throw err;
                } else {
                    cbk(null, results);
                };
            });
         },
         deleteFav : function(cbk) {
            var q_str = 'DELETE FROM favorites WHERE res_id=' + q_data.res_id + ";";
            self.query(q_str, void 0, function (err, results, fields) {
                if (err) {
                    throw err;
                } else {
                    cbk(null, results);
                };
            });
         }
    }, function(err, results) {
        callback(results);
    });
}

/*
 * getResByThread
 * 指定したスレッドの全てのコメントを取得する関数 
 */ 
ResDB.prototype.getResByThread = function(q_data, callback) {
    var self = this;
    async.parallel({
        //スレッドの情報を取得
        getThreadInfo : function(cbk) {
            var q_str = 'SELECT threads.title, threads.description FROM threads WHERE threads.thread_id=' + q_data.thread_id + ';'

            self.query(q_str, void 0, function (err, results, fields) {
                if (err) {
                    throw err;
                } else {
                    cbk(null, results);
                };
            });
        },
        //各レスの内容、レスしたユーザー名を取得
        getResInfo   : function(cbk) {
            var q_str = 'SELECT users.name, users.user_id, res.res_id, res.body FROM res INNER JOIN users ON res.user_id=users.user_id AND res.thread_id=' + q_data.thread_id + ' ORDER BY res.created;';
            self.query(q_str, void 0, function (err, results, fields) {
                if (err) {
                    throw err;
                } else {
                    cbk(null, results);
                };
            });
        },
        //自分がイイネしたレスを取得
        getFavoriteInfo  : function(cbk) {
            if (q_data.user_id) {   //ユーザーがログインしている場合
                var q_str = 'SELECT res_id FROM favorites WHERE user_id=' + q_data.user_id + ' AND thread_id=' + q_data.thread_id + ';';
                self.query(q_str, void 0, function (err, results, fields) {
                    console.log("favorite res in this thread");
                    console.log(results);
                    if (err) {
                        throw err;
                    } else {
                        cbk(null, results);
                    };
                });
            } else {   //ユーザーがログインしていない場合
                cbk(null, []);
            };
        },
        //各レスについているイイネの数を取得
        getFavoriteNum  : function(cbk) {
            var q_str = 'SELECT res_id, count(res_id) FROM favorites WHERE thread_id=' + q_data.thread_id + ' GROUP BY res_id;';
            self.query(q_str, void 0, function (err, results, fields) {
                console.log("favorite num in this thread");
                console.log(results);
                if (err) {
                    throw err;
                } else {
                    cbk(null, results);
                };
            });
        }

    }, function(err, results) {
        /*
         * ここでエラー処理をする
         */
       var resList      = results.getResInfo,
           favoriteList = results.getFavoriteInfo;
           favoriteNum  = results.getFavoriteNum;
        for(var i=0, len_i=resList.length; i<len_i; i++) {
            resList[i].favorite = false;
            for(var j=0, len_j=favoriteList.length; j<len_j; j++) {
                if(favoriteList[j].res_id === resList[i].res_id) {
                    resList[i].favorite = true;
                };
            };
            resList[i].favoriteNum = 0;
            for(var k=0, len_k=favoriteNum.length; k<len_k; k++) {
                if(favoriteNum[k].res_id === resList[i].res_id) {
                    resList[i].favoriteNum = favoriteNum[k]["count(res_id)"];
                };
            }
        };
        callback({
            user_id    : q_data.user_id,
            thread_id  : q_data.thread_id,
            title      : results.getThreadInfo[0].title,
            description: results.getThreadInfo[0].description,
            res        : resList
        });
    });
};

function createResDB() {
    return new ResDB();
};

exports.createResDB = createResDB;
