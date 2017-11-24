var app = require('express')();
var request = require('request');

var apis = process.env.API_DEF || "./api-def.json";
var port = process.env.PORT || 3000;

// providing the mappings
var mappings = [];
mappings = mappings.concat(require(apis));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// offers the function for registering a route and redirecting it to the provided server
var appMethod = function(host, port, path, method, headers){
    app.all(path, function(req, res, next){
        console.log("[INFO] API request on %s:%s%s send to %s:%s%s", server.address().address, server.address().port, req.originalUrl, host, port, req.originalUrl);
        var rreq = null;        
        
        if(host.indexOf("http://") <= -1 && host.indexOf("https://") <= -1){
            host = "http://"+host;
        }
        
        var url = host+":"+port+req.originalUrl;
        
        if(method.toUpperCase() === "POST" || method.toUpperCase() == "PUT"){
            rreq = request.post({uri: url, json: req.body, headers: headers});
        } 
        else {
            rreq = request( { uri: url, headers: headers } );
        }
        
        req.pipe(rreq).pipe(res);
    });
}

// stores the registered routes
var storedFunction = [];

// registers a route for each request
for(var i = 0; i < mappings.length; i++){
	for(var j = 0; j < mappings[i].redirects.length; j++){
        var method = mappings[i].redirects[j].method === undefined?"GET":mappings[i].redirects[j].method;
		var headers = mappings[i].headers;
        storedFunction.push(appMethod(mappings[i].host, mappings[i].port, mappings[i].redirects[j].path, method, headers));
        console.log("[INIT] Created route to %s %s:%s%s ", method.toUpperCase(),mappings[i].host, mappings[i].port, mappings[i].redirects[j].path);
	}
}

// starts the server
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('[INFO] listening at http://%s:%s', host, port);
});

module.exports = app;

