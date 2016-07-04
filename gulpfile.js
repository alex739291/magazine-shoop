//------------------------------------------------------

// Pluings

//------------------------------------------------------

var gulp             = require('gulp'),
    sass             = require('gulp-sass'),
    jade             = require('gulp-jade'),
    concat           = require('gulp-concat'),
    watch            = require('gulp-watch'),
    plumber          = require('gulp-plumber'),
    sourcemaps       = require('gulp-sourcemaps'),
    imagemin         = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    browserSync      = require('browser-sync'),
    cleanCSS         = require('gulp-clean-css'),
    autoprefixer     = require('gulp-autoprefixer');

//---------------------------------------------------------

// Plumber Error

var onError = function(err){
    console.log(err);
    this.emit('end');
};

//---------------------------------------------------------

//------------------------------------------------------

// SASS to CSS

//------------------------------------------------------

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.css'))
        .pipe(autoprefixer("last 5 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

//------------------------------------------------------

// JADE to HTML

//------------------------------------------------------
gulp.task('jade', function() {
    return gulp.src('src/jade/*.jade')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jade({
            pretty: true

        }))

        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});

// ------------------------------------------------------------

// IMG

gulp.task('img', function(){
    return gulp.src('./src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [imageminPngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

// ----------------------------------------------------------------
gulp.task('minify-css', function() {
    return gulp.src('dist/css/style.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'));
});
// ----------------------------------------------------------------

// Compile JS
gulp.task('js', function(){

    return gulp.src('./src/js/*js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}));
});

// ------------------------------------------------------------
gulp.task('minify-css', function() {
    return gulp.src('dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});
//------------------------------------------------------

// WATCh

//------------------------------------------------------
gulp.task('watch',function() {
    browserSync.init({
        server: 'dist'
    });
    gulp.watch('./src/jade/**/*.jade', ['jade']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['js']);
    gulp.watch('./src/img/*', ['img']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

//--------------------------------------------------------------

//default task
gulp.task('default', ['watch','img','jade','sass','js']);