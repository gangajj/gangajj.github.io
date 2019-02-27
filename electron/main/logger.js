var logger = require('electron-log');
var fs = require("fs");
logger.transports.file.appName = (isProduction) ? "Ganga.com" : "Ganga.com-dev" ;
logger.transports.file.maxSize = 1 * 1024 * 1024;
function getLogFileName(){
    var logFolder = appRoot + "/logs";
    var date = new Date(); 
    var curTimeStamp = date.getDate() + "_"
        + (date.getMonth()+1)  + "_"
        + date.getFullYear() + "_"
        + date.getHours() + "_"
        + date.getMinutes() + "_"
        + date.getSeconds();
        if (!fs.existsSync(logFolder)){
            fs.mkdirSync(logFolder);
        }
    return logFolder + "/log_"+curTimeStamp+".txt";
}
module.exports = {
    info : logger.info,
    debug : logger.debug,
    error : logger.error,
    warn : logger.warn,
    verbose : logger.verbose,
    silly : logger.silly,
    log : logger.warn
};