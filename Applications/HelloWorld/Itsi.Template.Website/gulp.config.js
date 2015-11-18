'use strict';

module.exports = function () {
    var app = './app/';
    var appName = 'itsiTemplate';
    var config = {
        alljs: ['./app/**/*.js', './*.js'],
        app: app,
        appName: appName,
        build: './dist/',
        css: app + '**/*.css', // inject all the css files
        fonts: './bower_components/font-awesome/fonts/*.*',
        htmlTemplates: [app + '**/*.html', '!' + app + '**/index.html'],
        images: app + 'images/**/*.*',
        index: app + 'index.html',
        js: [
           app + '*.js', // inject reference to app.js first
           app + '**/*.module.js', // after injecting app.js, inject all the modules
           app + '**/*.service.js', // after injecting app.js and all the modules, inject all services
           app + '**/*.directive.js', // after injecting app.js,all the module and all services, inject all directives
           // after injecting app.js,all the module, all services, all directives, inject all controllers,
           app + '**/*.controller.js',
           app + '**/*.js', // now inject the rest
            '!' + app + '**/*.spec.js', // do not inject unit test files
        ],
        minifyHtml: {
            options: { empty: true }
        },
        nodeServer: 'server.js',
        temp: './temp/',
        templateCache: {
            fileName: 'templates.js',
            options: {
                module: appName,
                standAlone: false,
                root: app
            }
        }
    };
    config.getDefaultWireDepOptions = function () {
        var option = {
            bowerjson: require('./bower.json'),
            directory: './bower_components',
            ignorePath: '../..'
        };
        return option;
    };

    return config;
};