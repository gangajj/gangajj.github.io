'use strict';
var menu = require('./main/menu/menu.js');
var {app, BrowserWindow, ipcMain, Tray, Menu} = require('electron');
app.commandLine.appendSwitch("--ignore-certificate-errors"); // To ignore if any certificate errors on dev environment ex: https://dev.ganga.com (Self signed certificate)
global.isProduction = true;
var path = require('path');
global.appRoot = path.resolve(__dirname);
appRoot = (appRoot.indexOf("resources") > -1) ? appRoot.substring(0,appRoot.indexOf("resources")) : appRoot;
global.logger = require('./main/logger.js');
global.log = logger.log;
var fs = require('fs');
var config = require('./config.js');
var iconPath = path.join(__dirname, 'assets/icon/logo.png');
var utils = require("./main/utils.js");
//var log = utils.logToFile || function(){};
logger.info("Started logging - logger.info");
require('electron-debug')();
global.appUrl = null;
var mainWindow, callWindow, contextMenu, configFile="./config.txt";
var appIcon = null;
app.on('window-all-closed', function(e) {
    e.preventDefault();
    if (process.platform !== 'darwin') {
        if(mainWindow){
            mainWindow.hide();
            return mainWindow.setSkipTaskbar(true);
        }
    }
});
app.on('ready', function() {
    if(isProduction){
        appUrl = config.appUrl;
        mainWindow = createMainWindow();
        menu.init();
        contextMenu = createTray();
    }else{
        fs.readFile(configFile, function(err, data) {
            if (err) throw err;
            appUrl = data.toString();
            mainWindow = createMainWindow();
            menu.init(appRelaunch);
            contextMenu = createTray();
        });
    }
});
ipcMain.on('open-call-window', function(event, args) {
    log("open-call-window::"+args);
    callWindow = openSecondWindow(event, args);
});
ipcMain.on("gsmp-child-to-parent", function(event, args) {
    log("gsmp-child-to-parent",args.toString());
    if (mainWindow) {
        sendToMainWindow("gsmp", args);
    } else {
        log("mainWindow doesn't exist");
    }
});
ipcMain.on('showBadge', function (event, args) {
    if (args) {
        var argments = JSON.parse(JSON.stringify(args));
        if (argments.img && mainWindow) {
            var electron = require('electron'), nativeImage = electron.nativeImage;
            nativeImage = electron.nativeImage;
            var img = nativeImage.createFromDataURL(argments.img);
            log("Enabling badge !!!");
            mainWindow.setOverlayIcon(img, '1');
        } else if (!(argments.img) && mainWindow) {
            log("Disabling badge !!!");
            mainWindow.setOverlayIcon(null, '0');
        }
    }
});
ipcMain.on("gsmp-parent-to-child", function(event, args) {
    log("gsmp-parent-to-child",JSON.stringify(args));
    if (callWindow && callWindow.webContents && callWindow.webContents.send) {
        callWindow.webContents.send("gsmp", args);
    } else {
        log("mainWindow doesn't exist");
    }
});
function sendToMainWindow(name,args){
    log("sendToMainWindow::"+name+"::"+JSON.stringify(args));
    if(mainWindow && mainWindow.webContents && mainWindow.webContents.send){
        mainWindow.webContents.send(name,args);
    }
}
function logToBrowser(msg, p){
    var priority = p || "info";
    sendToMainWindow("electron-log", {"msg" : msg, "priority" : priority});
}
function createMainWindow() {
    var win = new BrowserWindow({
        minWidth: 700,
        minHeight: 600,
        icon: 'assets/icon/logo.png',
        show: false
    });
    win.maximize();
    log("createMainWindow::appUrl::::"+appUrl);
    win.loadURL(appUrl);
    win.once('ready-to-show', function() {
      win.show();
    });
    if(!isProduction){
        win.webContents.openDevTools();
    }
    win.onbeforeunload = function(e) {
      log('I do not want to be closed')
      e.returnValue = false
    };
    win.on('close', function(e){
        e.preventDefault();
        win.hide();
        return win.setSkipTaskbar(true);
    });
    return win;
}

var isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) 
        mainWindow.restore();
    mainWindow.focus();
  }
});

if (isSecondInstance && process.platform !== "linux") {
  app.quit();
}

function openSecondWindow(event, args) {
    var childWindow = new BrowserWindow({
        minWidth: 700,
        minHeight: 600,
        icon: 'assets/icon/logo.png'
    });
    log(JSON.stringify(args));
    if (args.sessionId) {
        var sId = args.sessionId;
        var isVideo = args.isVideo || 0;
        var isCaller = args.isCaller || 1;
        childWindow.loadURL(appUrl + '/static/homegrown/index.html?sId=' + sId + '&vdo=' + isVideo + '&isCaller=' + isCaller);
        childWindow.maximize();
        childWindow.webContents.openDevTools();
        childWindow.on('closed', function(args) {
            mainWindow.webContents.send("gsmp", {
                "sessionId": sId,
                name: "endCall"
            });
        });
        return childWindow;
    }
    return null;
}
function createTray(){
    appIcon = new Tray(iconPath);
    var cntxtMenu = Menu.buildFromTemplate([{
        label: 'Open',
        accelerator: 'Ctrl+O',
        click: function() {
            if(mainWindow && !mainWindow.isDestroyed()){
                mainWindow.show();
                return mainWindow.setSkipTaskbar(false);
            }
        }
    },{
        label: 'Quit',
        accelerator: 'Command+Q',
        selector: 'terminate:',
        click: function(){
            app.exit();
        }
    }]);
    appIcon.setContextMenu(cntxtMenu);
    return cntxtMenu;
}
function appRelaunch(url){
    log("App is relaunching with the url::"+url);
    appUrl = url;
    fs.writeFile(configFile, appUrl.toString(), function (err) {
        log(err);
    });
    app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])});
    app.exit(0);
}
