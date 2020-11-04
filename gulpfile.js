const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
const path = require("path");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");
const babel = require("gulp-babel");

const sass = require("gulp-sass");
sass.compiler = require("dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const config = {
    scss: {
        watchSource: "./src/scss/**/*.scss",
        files: {
            "./src/scss/iframe-single-opt-in.scss": "./dist/css/",
        },
    },
    ts: {
        watchSource: "./src/ts/**/*.ts",
        files: {
            "./src/ts/iframe-single-opt-in-init.ts": "./dist/js/",
            "./src/ts/iframe-single-opt-in.ts": "./dist/js/",
        },
    },
};

gulp.task("scss", function () {
    let mergedStreams = require("merge-stream")();
    let scssPlugins = [autoprefixer()];

    for (let key in config.scss.files) {
        console.log(plugins.color("scss -> css: ", "BLUE") + plugins.color(key, "CYAN"));
        console.log(
            plugins.color("         to: ", "BLUE") + plugins.color(config.scss.files[key], "CYAN")
        );

        var stream = gulp
            .src(key)
            .pipe(
                plugins
                    .sass({ sourceMap: false, outputStyle: "compressed" })
                    .on("error", sass.logError)
            )
            .pipe(postcss(scssPlugins))
            .pipe(gulp.dest(config.scss.files[key]));

        mergedStreams.add(stream);
    }

    return mergedStreams.isEmpty() ? null : mergedStreams;
});

gulp.task("watch_scss", () => {
    console.log("watch: " + plugins.color(config.scss.watchSource, "CYAN"));
    return gulp.watch(config.scss.watchSource, gulp.series("scss"));
});

gulp.task("ts", function () {
    var mergedStreams = require("merge-stream")();

    for (var key in config.ts.files) {
        // create target filename
        let pathParts = key.split("/");
        let targetFilename = pathParts[pathParts.length - 1].replace(".ts", ".js");

        // inform the user
        console.log(plugins.color("ts -> bundle -> uglify: ", "BLUE") + plugins.color(key, "CYAN"));
        console.log(
            plugins.color("                    to: ", "BLUE") +
                plugins.color(config.ts.files[key] + targetFilename, "CYAN")
        );

        var stream = browserify()
            .add(key)
            .plugin(tsify)
            .bundle()
            .on("error", function (error) {
                console.error(error.toString());
            })
            .pipe(source(targetFilename))
            .pipe(buffer())
            .pipe(babel(config.babel))
            .pipe(plugins.uglify())
            .pipe(gulp.dest(config.ts.files[key]));

        mergedStreams.add(stream);
    }

    return mergedStreams.isEmpty() ? null : mergedStreams;
});

gulp.task("watch_ts", function () {
    console.log("watch: " + plugins.color(config.ts.watchSource, "CYAN"));
    return gulp.watch([config.ts.watchSource], gulp.series("ts"));
});

gulp.task("default", gulp.series("ts", "scss"));

// task to watch js, ts and scss
gulp.task("watch", gulp.parallel("watch_ts", "watch_scss"));
