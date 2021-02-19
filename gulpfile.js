'use strict';

let gulp = require('gulp'),
   browserSync = require('browser-sync').create(),
   sass = require('gulp-sass'),
   purify = require('gulp-purify-css'),
   autoprefixer = require('gulp-autoprefixer'),
   rename = require("gulp-rename"),
   sourcemaps = require('gulp-sourcemaps'),
   clean = require('gulp-clean'),
   rigger = require('gulp-rigger'),
   uglify = require('gulp-uglify-es').default,
   imagemin = require('gulp-imagemin'),
   imgCompress = require('imagemin-jpeg-recompress');

gulp.task('html', function () {
   return gulp.src("src/*.html")
      .pipe(rigger())
      .pipe(gulp.dest("dist"))
      .pipe(browserSync.stream());
});

gulp.task('favicon', function () {
   return gulp.src("src/favicon.*")
      .pipe(gulp.dest("dist"))
});

gulp.task('clean', function () {
   return gulp.src("dist", {
      read: false,
      allowEmpty: true
   })
      .pipe(clean({
         force: true
      }));
});

gulp.task('js', function () {
   return gulp.src(['src/js/main.js'])
      .pipe(rigger())
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({
         suffix: ".min",
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
});

gulp.task('images', function () {
   return gulp.src('src/img/**/*.*')
      .pipe(imagemin([
         imgCompress({
            loops: 4,
            min: 70,
            max: 80,
            quality: 'high'
         }),
         imagemin.gifsicle(),
         imagemin.optipng(),
         imagemin.svgo()
      ]))
      .pipe(gulp.dest('dist/img'))
      .pipe(browserSync.stream());
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
   return gulp.src("src/scss/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
      .pipe(autoprefixer({
         cascade: false
      }))
      .pipe(rename({
         suffix: ".min"
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});

gulp.task('clean-css', function () {
   return gulp.src('dist/css/main.min.css')
      .pipe(purify(['dist/main.min.js', 'dist/index.html']))
      .pipe(gulp.dest('dist/css'));
});

// gulp.task('uncss-go', function () {
//    return gulp.src('dist/css/main.min.css')
//       .pipe(uncss({
//          html: ['dist/index.html']
//       }))
//       .pipe(gulp.dest('dist/css'));
// });

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('html', 'favicon', 'sass', 'js', function () {

   browserSync.init({
      server: "./dist"
   });

   gulp.watch("src/scss/**/*.scss", gulp.parallel('sass'));
   gulp.watch("src/js/**/*.js", gulp.parallel('js'));
   gulp.watch("src/partials/*.html", gulp.parallel('html'));
   gulp.watch("src/*.html", gulp.parallel('html'));
}));

gulp.task('default', gulp.series('images', 'serve'));