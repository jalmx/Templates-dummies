const gulp = require('gulp')
const pug = require('gulp-pug')
const watch = require('gulp-watch')
const browserSync = require('browser-sync')

const server = browserSync.create();

gulp.task('pug', () => {
    gulp.src('./src/**.pug').
        pipe(watch('./src/**.pug')).on('error', () => {
            console.log('fallo WATCH de PUG')
        }
        ).
        pipe(pug()).on('error', () => {
            console.log('fallo compilacion de PUG')
        }
        ).
        pipe(gulp.dest('./'))
});

gulp.task('reload', () => {
    server.reload();
})

gulp.task('css', () => {
    gulp.src('./src/style/**.css').
        pipe(gulp.dest('./style/')).
        pipe(server.stream({ match: '**/*.css' }))
});

gulp.task('default', ['pug', 'css'], () => {

    server.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/**.pug', ['pug', 'reload']);
    gulp.watch('./src/style/**.css', ['css','reload']);
});
