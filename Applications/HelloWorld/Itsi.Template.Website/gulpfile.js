var gulp = require('gulp');
var args = require('yargs').argv;

// reference gulp plugins
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var util = require('gulp-util');
var gulpPrint = require('gulp-print');
var gulpIf = require('gulp-if');
var config = require('./gulp.config')();
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var taskListing = require('gulp-task-listing');
var imagemin = require('gulp-imagemin');
var del = require('del');
var angularTemplateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var htmlify = require('gulp-angular-htmlify');
var plumber = require('gulp-plumber');
/*------------------------------------Start section (gulp-dev)------------------------------*/
gulp.task('vet', [], function () {
    /*********************************************************
    1) In the vet task, the src api will pick all the .js files 
    under the app folder and all the .js files at the project level.
    2) Next Pipe print, which will print all the js files that were picked
    up for this task. We will do this by using gulp-if plugin and 
    yargs. yargs will allow to get the conditions from command line.
    3) Pipe jscs, which will check the code standard.
    4) Pipe jshint, which will check the javascript code synatx.
    5) Let's pipe the jshint reporter called jshint-stylish, 
    where all the reports will be displayed nicely on the CI.
    PLEASE REMEMBER TO install -save-dev jshint-stylish
    6) Next, Let's pipe fail, so that the script will fail, if
    there are any jshint errors or jscs errors.
    ***********************************************************/
    log('*** analyzing source with jshint and jscs...');
    return gulp
        .src(config.alljs)
        .pipe(gulpIf(args.verbose, gulpPrint())) //gulp vet or gulp vet --verbose
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe(jshint.reporter('fail'));
});
gulp.task('bower-inject', function () {
    /*********************************************************
    Glup plugin wiredep is used here to inject bower js and css
    inot index.html. This gulp task is called in .bowerrc 
    post script run. This means that as soon as a bower
    package is installed, the js and css will be injected in 
    index.html.
    ***********************************************************/
    log('*** wire up bower css and js into html...');
    var options = config.getDefaultWireDepOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.app));
});
gulp.task('inject', ['bower-inject', 'templatecache'], function () {
    log('*** wire up custom css and js into html...');
    return gulp
        .src(config.index)
        .pipe(inject(gulp.src(config.js, { read: false }), { relative: true }))
        .pipe(inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.app));
});
gulp.task('serve-dev', ['inject'], function () {
    var isDev = true;

    return nodemon({
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': 3001,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.app]
    })
        .on('start', function () {
            log('*** nodemon started...');
            startBrowserSync();
        }).on('restart', ['vet'], function () {
            log('*** nodemon re-started...');
        });
});
gulp.task('dev', ['vet', 'serve-dev']);
/*------------------------------------Start section (gulp-build)----------------------------*/
gulp.task('help', taskListing);
gulp.task('fonts', function () {
    log('*** copying fonts to dist...');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});
gulp.task('images', function () {
    log('*** copying images to dist...');
    return gulp
        .src(config.images)
        .pipe(imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.build + 'images'));
});
gulp.task('clean', function () {
    log('*** cleaning build...');
    var files = [].concat([
        config.build + '**/*.*/',
        config.temp + '**/*.*/'
     ]);
    del(files);
});
gulp.task('clean-fonts', function () {
    log('*** cleaning fonts...');
    del([config.build + 'fonts/*.*']);
});
gulp.task('clean-images', function () {
    log('*** cleaning images...');
    del([config.build + 'images/*.*']);
});
gulp.task('clean-code', function () {
    log('*** cleaning code...');
    var files = [].concat([
        config.temp + '**/*.*',
        config.build + 'js/**/*.*',
        config.build + '**/*.html',
    ]);
    del(files);
});
gulp.task('templatecache', ['clean-code'], function () {
    log('***caching angular templates---');
    return gulp
        .src(config.htmlTemplates)
        .pipe(minifyHtml(config.minifyHtml.options))
        .pipe(angularTemplateCache(config.templateCache.fileName, config.templateCache.options))
        .pipe(gulp.dest(config.temp ));
});
gulp.task('optimize', ['inject'], function () {
    log('***optimizing the javascript, css and html...');
    var templatecaches = config.temp + config.templateCache.fileName;
    return gulp
        .src(config.index)
        .pipe(plumber())
        .pipe(inject(gulp
                        .src(templatecaches, { read: false }), {
                            relative: true, starttag: '<!-- inject:templates:js -->'
                        }))
        .pipe(htmlify())
        .pipe(gulp.dest(config.build));
});
/*------------------------------------Start section (private functions)---------------------*/
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}
function startBrowserSync() {
    // if the bowser sync is already active, then do not restart it
    // again, or else you will end up with multiple tabs of browser sync
    if (browserSync.active) {
        return;
    }
    log('*** starting browser sync');
    // create the browser sync options
    var options = {
        proxy: 'localhost:3000',
        port: 3001,
        files: [config.app + '**/*.*'],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000,
        browser: 'google chrome'
        //browser: ["google chrome", "firefox"]
    };
    browserSync(options);
}