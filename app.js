
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(require('less-middleware')({ src: __dirname + '/vendor/bootstrap/less' }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/vendor/bootstrap/less'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

var pages= [ {id:"/", title:"Home"}
            ,{id:"/blog", title:"Blog"}
            ,{id:"/contact", title:"Contact"}              
           ];

var displayPage= function( res, viewName, pageName ) {
  res.render( viewName, {
    title: 'Express',
    pages: pages,
    currentPage: pageName
  });
}
// Routes
app.get('/', function(req, res){ 
  displayPage( res, "index", "/" );
});

app.get('/blog', function(req, res){
  displayPage( res, "blog", "/blog" );
});

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
