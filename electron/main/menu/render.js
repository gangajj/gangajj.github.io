function openAck() {
    var shell = require('electron').shell;
    event.preventDefault();
    shell.openExternal('https://ganga.ai/libs-desktop');
}
function openPrivacy() {
    var shell = require('electron').shell;
    event.preventDefault();
    shell.openExternal('https://ganga.ai/privacy-policy');
}
function openUse() {
    var shell = require('electron').shell;
    event.preventDefault();
    shell.openExternal('https://ganga.ai/terms-of-service');
}
function closePopup(){
	window.close();
}