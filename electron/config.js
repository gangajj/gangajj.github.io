var utils = require("./main/utils.js");
var path = require("path");
var authToken = null, userId = null, userObj = null, authObj = null, userKeys = null, teams = {};
function getAuthToken(){
    if(authObj){
        return authObj.accessToken;
    }
    return null;
}
function setAuthToken(token){
    return authToken = token;
}
function getUserId(){
    if(userObj){
        return userObj.id;
    }
}
function setUserId(id){
    return userId = id;
}
function getUserInfo(){
    if(userObj){
        return userObj;
    }
}
function setUserInfo(obj){
    return userObj = obj;
}
function getUserAuthInfo(){
    if(authObj){
        return authObj;
    }
}
function setUserAuthInfo(obj){
    return authObj = obj;
}
function setUserKeys(keys){
    return userKeys = keys;
}
function getUserKeys(){
    return userKeys;
}
function getApiUrl(){
    var url = null;
    appUrl = appUrl ? appUrl : "https://app.ganga.com";
    if(appUrl.indexOf("dev.ganga.com") > -1 || appUrl.indexOf("dev.ganga.ai") > -1){
        url = appUrl.substr(0, appUrl.indexOf("Ganga") - 1)+"/api/1.1/";
    }else{
        url = appUrl+"/api/1.1/";
    }
    return url;
}
function setTeamKey(teamId, keys){
    if(teams){
        teams[teamId] = keys;
    }
    return ;
}
function getTeamKey(teamId){
    if(teams){
        return teams[teamId];
    }
    return null;
}
function getTeamSecretKey(teamId){
    log("secretKey is not available for "+teamId);
    return null;
}
function getDefaultFileUploadPath(){
    var filePath = path.join(appRoot, 'uploads/');
    return filePath;
}
module.exports = {
    appUrl : "https://dev.ganga.com",
    setUserId : setUserId,
    setAuthToken : setAuthToken,
    getAuthToken : getAuthToken,
    setUserInfo : setUserInfo,
    getUserInfo : getUserInfo,
    setUserAuthInfo : setUserAuthInfo,
    getUserAuthInfo : getUserAuthInfo,
    getUserId : getUserId,
    setUserKeys : setUserKeys,
    getUserKeys : getUserKeys,
    getApiUrl : getApiUrl,
    setTeamKey : setTeamKey,
    getTeamKey : getTeamKey,
    getTeamSecretKey : getTeamSecretKey,
    getDefaultFileUploadPath : getDefaultFileUploadPath
};
