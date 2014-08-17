var gulp = require('gulp'),
    gutil = require('gulp-util'),
    path = require('path'),
    argv = require('yargs')
       .alias('p', 'port')
       .alias('s', 'server')
       .argv;

var devServer = {
  port: argv.port || Math.round(31337 + Math.random() * 1000),
  server: argv.server || '0.0.0.0',
  livereload: 35000 + Math.round((Math.random() * 1000)),
  root: './dist'
};

var paths = {
  scripts: ['src/**/*.*', '!node_modules/**'],
  markup: ['src/*.html'],
  styles: { paths: [ path.join(__dirname, 'src/styles') ] }
};

gulp.task('default', ['build', 'startStaticServer', 'watchChanges']);
gulp.task('build', ['makeDist', 'runBrowserify', 'copyDist', 'compileLess']);

gulp.task('runBrowserify', runBrowserify);
gulp.task('compileLess', compileLess);
gulp.task('makeDist', makeDist);
gulp.task('copyDist', copyDist);
gulp.task('watchChanges', watchChanges);
gulp.task('startStaticServer', startStaticServer);

function runBrowserify() {
  var fs = require('fs');

  var bundle = require('browserify')().add('./src/scripts/index.js');

  if (process.env.PROD_BUILD) {
    // for prod build we need to replace github oauth token with prod token:
    var aliasify = require('aliasify').configure({
          aliases: { './githubOauthLocal': { relative: "./githubOauthProd.js" } },
          verbose: false
      });

    bundle.transform(aliasify);
  }

  bundle
    .bundle()
    .on('error', function (err) {
      gutil.log(gutil.colors.red('Failed to browserify'), gutil.colors.yellow(err.message));
    })
    .pipe(fs.createWriteStream(path.join(__dirname + '/dist/bundle.js')));

  var perfBundle = require('browserify')().add('./src/scripts/performance/index.js');
  perfBundle
    .bundle({
      standalone: 'runSuite'
    })
    .on('error', function (err) {
      gutil.log(gutil.colors.red('Failed to browserify'), gutil.colors.yellow(err.message));
    })
    .pipe(fs.createWriteStream(path.join(__dirname + '/dist/performance/runSuite.js')));
}

function compileLess() {
  var less = require('gulp-less')(paths.styles);
  less.on('error', function (err) {
    gutil.log(gutil.colors.red('Failed to compile less: '), gutil.colors.yellow(err.message));
  });

	gulp.src('src/styles/style.less')
		.pipe(less)
		.pipe(gulp.dest('dist/styles'));
}

function makeDist() {
  var fs = require('fs');
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist');
  }
  if (!fs.existsSync('./dist/performance')) {
    fs.mkdirSync('./dist/performance');
  }
}

function copyDist() {
  var concat = require('gulp-concat');

  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'));

  gulp.src([
    './node_modules/angular/lib/angular.min.js',
    './src/external/angular-route.js'
  ])
      .pipe(concat('external.min.js'))
      .pipe(gulp.dest('./dist'));

  gulp.src([
    './node_modules/twitter-bootstrap-3.0.0/fonts/*',
    './node_modules/font-awesome/fonts/*'])
      .pipe(gulp.dest('./dist/fonts/'));

  gulp.src(['./src/scripts/examples/**', '!src/scripts/examples/**/node_modules/**'])
      .pipe(gulp.dest('./dist/examples/'));
}

function watchChanges() {
  gulp.watch(paths.scripts, ['runBrowserify', 'copyDist']);
  gulp.watch('src/styles/*.less', ['compileLess']);
  gulp.watch(paths.markup, ['copyDist']);
  gulp.watch(['dist/**', '!dist/**/node_modules/**']).on('change', notifyLivereload);
}

var lr;
function startStaticServer() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: devServer.livereload }));
  app.use(express.static(devServer.root));
  app.listen(devServer.port, devServer.server, function () {
    gutil.log("opened server on http://" + devServer.server + ":" + devServer.port);
  });

  lr = require('tiny-lr')();
  lr.listen(devServer.livereload);
}

function notifyLivereload(event) {
  var fileName = require('path').relative(devServer.root, event.path);
  lr.changed({ body: { files: [fileName] } });
}
