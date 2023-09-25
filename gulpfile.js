const gulp = require("gulp")
const concat = require("gulp-concat")
const autoPrefixer = require("gulp-autoprefixer")
const uglify = require("gulp-uglify")
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename")

gulp.task("taskHtml", async () => {
    return gulp.src("./src/index.html")
        .pipe(gulp.dest('./dist/'))
})

gulp.task("taskCSS", async () => {
    return gulp.src("./src/sass/main.sass")
        .pipe(sass({
            outputStyled: "nested"
        }))
        .pipe(autoPrefixer("last 2 versions"))
        .pipe(rename('dist.main.css'))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task("taskJS", async () => {
    return gulp.src("./src/js/*.js")
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
})

gulp.task("watch", gulp.series("taskCSS", "taskJS", "taskHtml", async () => {
    gulp.watch("./src/sass/**/*.sass", { delay: 500 }, gulp.series("taskCSS"))
    gulp.watch("./src/js/**/*.js", { delay: 500 }, gulp.series("taskJS"))
    gulp.watch("./src/index.html", { delay: 500 }, gulp.series("taskHtml"))
}))