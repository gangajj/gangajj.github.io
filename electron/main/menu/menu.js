/*Menu Code*/
var electron = require('electron');
var Menu = electron.Menu, BrowserWindow = electron.BrowserWindow;
var menu = null;
function init(appRelaunch){
    var templateQA = [{
        label: 'Environment',
        submenu : [
            {
                label: 'dev.ganga.com',
                click: function() {
                    appRelaunch("https://dev.ganga.com/Ganga");
                }
            },
            {
                label: 'qa.ganga.ai',
                click: function(){
                    appRelaunch("https://qa.ganga.ai");
                }
            },
            {
                label: 'qa1.ganga.com',
                click: function(){
                    appRelaunch("https://qa1.ganga.com");
                }
            }
        ]
    },
    {
        label: 'Ganga.com',
        submenu: [{
                label: 'About Ganga.com',
                click: function() {
                    var win = new BrowserWindow({
                        height: 190,
                        width: 420,
                        titleBarStyle: 'customButtonsOnHover',
                        autoHideMenuBar: true,
                        center: true,
                        resizable: false,
                        movable: true,
                        title: 'About Ganga.com',
                        backgroundColor: '#f9f9f9',
                        frame: false
                    });
                    win.loadURL('file://' + __dirname + '/menu.html');
                }
            },
            {
                role: 'quit'
            }
        ]
    },
    {
        label: 'View',
        submenu: [{
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'reload'
            }
        ]
    },
    {
        role: 'help',
        submenu: [{
                label: 'Help Center',
                click: function() {
                    electron.shell.openExternal('https://support.ganga.com/hc/en-us');
                }
            },
            {
                label: 'Keyboard shortcuts Commands',
                click: function() {
                    electron.shell.openExternal('https://support.ganga.com/hc/en-us/articles/215243318-Keyboard-Shortcut-Commands');
                }
            }
        ]
    }];
    var template = [
        {
            label: 'Ganga.com',
            submenu: [{
                    label: 'About Ganga.com',
                    click: function() {
                        var win = new BrowserWindow({
                            height: 190,
                            width: 420,
                            titleBarStyle: 'customButtonsOnHover',
                            autoHideMenuBar: true,
                            center: true,
                            resizable: false,
                            movable: true,
                            title: 'About Ganga.com',
                            backgroundColor: '#f9f9f9',
                            frame: false
                        });
                        win.loadURL('file://' + __dirname + '/menu.html');
                    }
                },
                {
                    role: 'quit'
                }
            ]
        },
        {
            label: 'View',
            submenu: [{
                    role: 'zoomin'
                },
                {
                    role: 'zoomout'
                },
                {
                    role: 'resetzoom'
                },
                {
                    role: 'reload'
                }
            ]
        },
        {
            role: 'help',
            submenu: [{
                    label: 'Help Center',
                    click: function() {
                        electron.shell.openExternal('https://app.ganga.com/help');
                    }
                },
                {
                    label: 'Keyboard shortcuts Commands',
                    click: function() {
                        electron.shell.openExternal('https://support.ganga.com/articles/keyboardShortcutCommands');
                    }
                }
            ]
        }
    ];
    if(isProduction){
        menu = Menu.buildFromTemplate(template);
    }else{
        menu = Menu.buildFromTemplate(templateQA);
    }
    Menu.setApplicationMenu(menu);
}
module.exports = {
    init:init
};