'use strict';
// create an array of dependencies
var dependencies = [
'ui.router'
];

// instantiate the template app
var itsiTemplateApp = angular.module('itsiTemplate', dependencies);

// run the template app
itsiTemplateApp.filter('greet', function () {
    return function (name) {
        return 'Hello, ' + name + '!';
    };
});