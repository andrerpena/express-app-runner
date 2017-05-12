var express = require('express');
var open = require('open');
var merge = require('merge');
var app = express();

var defaultRunOptions = {
    port: 3000,
    hostname: 'localhost',
    open: true,
    showListeningLog: true,
    listeningCallback: null
};

module.exports = {

    /**
     * Defines a index page to be provided by '/'.
     *
     * @param {string} filePath
     */
    setIndexFile: function (filePath) {
        app.get('/', function(req, res) {
            res.sendFile(filePath);
        });
    },

    /**
     * Makes the content of 'dirPath' directory available for the app
     * 
     * @param {string} dirPath 
     */
    setStaticDir: function (dirPath) {
        app.use(express.static(dirPath));
    },    

    /**
     * Runs the application.
     * 
     * @param {Object} [options]
     * @param {string} [options.port=3000] - Application port
     * @param {string} [options.hostname=localhost] - Application hostname
     * @param {string} [options.open=true] - Defines whether or not the application should be open
     * @param {string} [options.showListeningLog=true] - Defines whether or not it's to show a log after it successfully started listening to the app.
     * @param {string} [options.listeningCallback=null] - Callback function to be called after it successfully started listening to the app.
     * @returns {http.Server}
     */
    run: function (options) {

        options = options || {};
        options = merge(defaultRunOptions, options);

        var server = app.listen(options.port, options.hostname, function (err) {

            if (err) {
                console.error(err);
                return;
            }

            var address = 'http://' + options.hostname + ':' + options.port;

            if (options.showListeningLog)
                console.log('Listening to \'' + address + '\'');

            if (options.open)
                open(address);

            if (options.listeningCallback)
                options.listeningCallback(err);
        });

        return server;
    },

    app: app
};