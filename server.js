// server.js
    // set up ========================
      var express  = require('express');
      var app      = express();                               // create our app w/ express
      var morgan = require('morgan');             // log requests to the console (express4)
      var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
      var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

      app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
      app.use(morgan('dev'));                                         // log every request to the console
      app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
      app.use(bodyParser.json());                                     // parse application/json
      app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
      app.use(methodOverride());

      // listen (start app with node server.js) ======================================
      app.listen(8080);
      console.log("App listening on port 8080");

    // routes ======================================================================

        // api ---------------------------------------------------------------------
        // get all records
        app.get('/api/records', function(req, res) {

          var http = require("http");
          var url_begin = "http://reports.mantidproject.org/api/feature?page=";
          var url_end = "&format=json";

          var records = [];

          function attempt(page) { http.get(url_begin+page.toString()+url_end, function (response) {

            console.log("Getting data from page "+page.toString())

            // data is streamed in chunks from the server
            // so we have to handle the "data" event
            var buffer = "",
                data,
                route;

            response.on("data", function (chunk) {
                buffer += chunk;
            });

            response.on("end", function (err) {
              if (buffer=='{"detail": "Not found"}') {
                res.json(records)
                console.log("Reached end of pages");
              } else {
              var record_obj = JSON.parse(buffer)
              records = records.concat(record_obj['results'])
              // Get next page of data
              attempt(page+1)
            }
            });

            response.on("error", function (err) {
              console.log("Error collecting data from remote server")
            });

            //res.json(records['results'])
          });
        }
          attempt(1);

        });

    // application -------------------------------------------------------------
        app.get('*', function(req, res) {
          res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        });
