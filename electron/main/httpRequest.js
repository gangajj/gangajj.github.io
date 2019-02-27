var utils = require("./utils.js");
var config = require("../config.js");
var fetch = require("electron-fetch");
var _ = require('lodash');
//var log = utils.logToFile || function(){};
log("started logging httprequest..");
function sendUsingFetch(reqUrl, payload){
        fetch(reqUrl, {
            method: 'POST',
            body:   JSON.stringify(payload),
            headers: {
                "Authorization": bearerToken,
                "Content-Type": "application/json"
                //"Content-Length": Buffer.byteLength(serverPayload)
            }
        }).then(function(res){
            res.json().then(function(res){
                    log("###############before send###########"+JSON.stringify(res)+"\n");
                }, function (err) {
                    logger.error("sendPostsInTopic::error::11::"+JSON.stringify(err));
                });
        }).then(function(res){
            logger.error("sendPostsInTopic::finally::11::"+JSON.stringify(res));
        });
}
function doServiceCallGet(json, resolve, reject){
    return new Promise(function(resolve, reject){
        var reqUrl = json.reqUrl;
        var bearerToken = "bearer "+config.getAuthToken();
        fetch(reqUrl, {
              method: "GET",
              headers: {
                  "Authorization": bearerToken,
                  "Content-Type": "application/json"
              }
          }).then(function(res){
              res.json().then(resolve, reject);
          });
    });
}
function doServiceCallPost(json, resolve, reject){
    return new Promise(function(resolve, reject){
        var reqUrl = json.reqUrl, body = json.data;
        var bearerToken = "bearer "+config.getAuthToken();
        fetch(reqUrl, {
              method: "POST",
              headers: {
                  "Authorization": bearerToken,
                  "Content-Type": "application/json"
              },
              body: body
          }).then(function(res){
              res.json().then(resolve, reject);
          },function(res){
              res.json().then(reject, reject);
          });
    });
}
function doServiceCallPut(json, resolve, reject){
    return new Promise(function(resolve, reject){
        var reqUrl = json.reqUrl, body = json.data;
        var bearerToken = "bearer "+config.getAuthToken();
        fetch(reqUrl, {
              method: "PUT",
              headers: {
                  "Authorization": bearerToken,
                  "Content-Type": "application/json"
              },
              body: body
          }).then(function(res){
              res.json().then(resolve, reject);
          },function(res){
              logger.warn("doServiceCallPut:: response failed::",res);
              res.json().then(reject, reject);
          });
    });
}

module.exports = {
    sendUsingFetch : sendUsingFetch,
    doServiceCallGet : doServiceCallGet,
    doServiceCallPost : doServiceCallPost,
    doServiceCallPut : doServiceCallPut
};