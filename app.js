
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

//db
//    .sequelize
//    .sync({ force: true })
//    .complete(function(err) {
//        if (err) {
//            throw err
//        } else {
//            http.createServer(app).listen(app.get('port'), function(){
//                console.log('Express server listening on port ' + app.get('port'))
//            })
//        }
//    });

//var joe = db['User'].build({name: 'Joe'});
//var jeb = db['User'].build({name: 'Jeb'});
//var abe = db['User'].build({name: 'Abe'});
//_.each([joe,jeb,abe], function(i){ i.save(); });
//joe.setFriends([jeb, abe]).success(function() {
//  console.log('set');
//})
//joe.save();

var fs        = require('fs')
  , Sequelize = require('sequelize')
  , sequelize = new Sequelize('sequelize', 'root', 'asdasd', {logging:console.log})

var Series, Trainer, Video
 
// Series has a trainer_id=Trainer.id foreign reference key after we call Trainer.hasMany(series)
Series = sequelize.define('Series', {
    title:        Sequelize.STRING,
    sub_title:    Sequelize.STRING,
    description:  Sequelize.TEXT,

    // Set FK relationship (hasMany) with `Trainer`
    trainer_id: {
        type: Sequelize.INTEGER,
        references: "Trainer",
        referencesKey: "id"
        }
    },{
   tableName: 'Series'
});

Trainer = sequelize.define('Trainer', {
    first_name: Sequelize.STRING,
    last_name:  Sequelize.STRING
});

// Video has a series_id=Series.id foreign reference key after we call Series.hasOne(Video)...
Video = sequelize.define('Video', {
    title:        Sequelize.STRING,
    sequence:     Sequelize.INTEGER,
    description:  Sequelize.TEXT,

    // set relationship (hasOne) with `Series`
    series_id: {
        type: Sequelize.INTEGER,
        references: "Series",
        referencesKey: "id"
    }
});

//Trainer.hasMany(Series);
//Series.hasOne(Video);
Trainer.hasMany(Series);
Series.hasOne(Video);

//_.each([,jeb,abe], function(i){ i.save(); });
sequelize.sync({force:true});
//var s1 = Series.build({title: 'S1'});
//var t1 = Trainer.build({first_name: 'Jon T'});
//s1.save();
//t1.save();
//sequelize.sync();
//s1.setTrainer(t1);
