
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var _ = require('lodash')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// dev
app.set('env','development');

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var fs        = require('fs')
  , Sequelize = require('sequelize')
  , sequelize = new Sequelize('sequelize', 'root', 'asdasd', {logging:console.log});

var User = sequelize.define('User', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

User.hasMany(User, {as: 'Friends',through: 'Friends'});

var joe = User.build({username: 'Joe',birthday:'2014-01-01'});
var jeb = User.build({username: 'Jeb',birthday:'2013-01-01'});
var abe = User.build({username: 'Abe',birthday:'2012-01-01'});

User.sync().success(function(){
    var chainer = new Sequelize.Utils.QueryChainer()
    _.each([joe,jeb,abe], function(i){
                chainer.add(i.save())
    });

    chainer.run().success(function(){
        joe.setFriends([jeb,abe]);
    }).error(function(errors){console.log(errors)});
});
