
/**
 * Module dependencies.
 */

var express = require('express')
  , MemoryStore = require('express').session.MemoryStore
  , routes = require('./routes')
  , user = require('./routes/user')
  , thread = require('./routes/thread')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat', store: new MemoryStore({ reapInterval: 60000 * 10})}));
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//ログイン画面
app.get('/login', user.login);
app.post('/login', user.authorize);

//スレッド一覧を表示
app.get('/thread/list', thread.list);

//各スレッドの表示・投稿
app.get('/thread/thread', thread.each);
app.post('/thread/thread', thread.res);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
