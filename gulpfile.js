//------------------------------------------------------

// Pluings

//------------------------------------------------------

var gulp             = require('gulp'),
    sass             = require('gulp-sass'),
    jade             = require('gulp-jade'),
    concat           = require('gulp-concat'),
    watch            = require('gulp-watch'),
    plumber          = require('gulp-plumber'),
    uglifycss        = require('gulp-uglifycss'),
    uglify           = require('gulp-uglify'),
    sourcemaps       = require('gulp-sourcemaps'),
    imagemin         = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    browserSync      = require('browser-sync'),
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
        .pipe(concat('style.css'))
        .pipe(autoprefixer("last 2 version", "> 1%", "ie 8", "ie 7"))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

//MIN CSS
gulp.task('min-css', function () {
    gulp.src('dist/css/style.css')
        .pipe(uglify())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
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

gulp.task('images', function(){
    return gulp.src('./src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [imageminPngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

// ----------------------------------------------------------------

// ----------------------------------------------------------------

// Compile JS
gulp.task('js', function(){

    return gulp.src('./src/js/*js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}));
});

// ------------------------------------------------------------

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
    gulp.watch('./src/images/*', ['images']);
    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

//--------------------------------------------------------------

//default task
gulp.task('default', ['watch','images','jade','sass','js']);