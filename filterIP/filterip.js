'use strict'
var fs = require('fs');

var filterIP = function(req, res, next) {
    var ip = req.ip;
    var blackListIP = [];
    fs.readFileSync(__dirname + '/blacklistip.txt').toString().split('\n').forEach(function(_ip) {
        blackListIP.push(_ip);
    });
    var i, err = false;
    var length = blackListIP.length;
    for (i = 0; i < length; i++){
    	if (blackListIP[i] == ip) {
            err = true;
            break;
        }
    };
    
    if(err){
    	return res.status(403).end('forbidden');
    }else{
    	next();
    }
}

module.exports = filterIP;