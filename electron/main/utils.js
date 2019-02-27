var fs = require("fs");
var opn = require('opn');
var debug = require('electron-debug');
var logFileName = appRoot + "\\logs\\log.txt";
var arrAudio = ['m4a', 'amr', 'wav', 'aac', 'mp3'], arrVideo = ['mp4', 'mov', '3gp', 'flv'], arrImage = ['png', 'jpg', 'jpeg'];
function getCurrentTimeStamp(){
    var date = new Date(); 
    var curTimeStamp = date.getDate() + "/"
        + (date.getMonth()+1)  + "/"
        + date.getFullYear() + " @ "
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();
    return curTimeStamp;
}
function setLogFileName(){
    var date = new Date(); 
    var curTimeStamp = date.getDate() + "_"
        + (date.getMonth()+1)  + "_"
        + date.getFullYear() + "_"
        + date.getHours() + "_"
        + date.getMinutes() + "_"
        + date.getSeconds();
    logFileName = appRoot + "\\logs\\log_"+curTimeStamp+".txt";
    console.log(logFileName);
}
function logToFile(msg){
    return ;
    if(getDataType(msg) === "object"){
        msg = JSON.parse(msg);
    }
    try{
        if (!fs.existsSync("./logs")){
            fs.mkdirSync("logs");
        }
        if(fs.existsSync(logFileName)){
            fs.appendFile(logFileName, "\n"+getCurrentTimeStamp()+" :: "+msg, function (err) {
                console.log(err);
            });
        }else{
            fs.writeFile(logFileName, "\n"+getCurrentTimeStamp()+" :: "+msg, function (err) {
                console.log(err);
            });
        }
    }catch(err){
        console.log(err);
    }
}
function getDataType(p) {
    if (p === null) return null;
    else if (p === undefined) return undefined;
    else if (Array.isArray(p)) return 'array';
    else if (typeof p === 'string') return 'string';
    else if (p !== null && typeof p === 'object') return 'object';
    else return undefined;
}
function getFilesizeInMb(filename){
    var bytes = getFilesizeInBytes(filename);
    if(bytes){
        return bytes / 1000000.0;
    }
    return 0;
}
function getFilesizeInBytes(filename){
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes;
}
function openLink(url) {
    opn(url);
}
function getComponentType(extension){
    extension = extension.toLowerCase();
    if ((arrImage.indexOf(extension) > -1)) {
        return "image";
    } else if ((arrVideo.indexOf(extension) > -1)) {
        return "video";
    } else if ((arrAudio.indexOf(extension) > -1)) {
        return "audio";
    } else {
        return "attachment";
    }
};
function showAlertMsg(type, title, detail, msg){
    var dialog = require('electron').dialog;
    dialog.showMessageBox({
        type   : type || "warning",
        title  : title || "info",
        detail : detail || "error",
        message: msg || "error"
    });
}
//setLogFileName();
module.exports = {
    getCurrentTimeStamp : getCurrentTimeStamp,
    logToFile : logToFile,
    getDataType : getDataType,
    getComponentType : getComponentType,
    getFilesizeInMb : getFilesizeInMb,
    getFilesizeInBytes : getFilesizeInBytes,
    openLink : openLink,
    showAlertMsg : showAlertMsg
};