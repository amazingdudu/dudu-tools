const gulp = require('gulp');
const postcss = require('gulp-postcss');
const less = require('gulp-less');
const babel = require('gulp-babel');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const ts = require('gulp-typescript');
const autoprefixer = require('autoprefixer');
const syntax = require('postcss-less');
const del = require('del');
const through2 = require('through2');

const getBabelConfig = require('./getBabelConfig');
const getWebpackConfig = require('./getWebpackConfig');
const { getProjectPath } = require('./utils/projectUtils');
const { cssInjection } = require('./utils/styleUtil');

const stylesSrc = getProjectPath('src/components/**/*.less');
const scriptsSrc = [
    getProjectPath('src/components/**/*.ts'),
    getProjectPath('src/components/**/*.tsx')
];
const distDir = getProjectPath('dist');
const esDir = getProjectPath('es');
const libDir = getProjectPath('lib');

function clean(dir) {
    return function clean() {
        return del(dir);
    };
}

function cleanAll() {
    return del([distDir, esDir, libDir]);
}

function compileScripts(modules) {
    return function compileScripts() {
        const babelConfig = getBabelConfig(modules);
        const destDir = modules !== false ? libDir : esDir;

        return gulp
            .src(scriptsSrc)
            .pipe(babel(babelConfig))
            .pipe(
                through2.obj(function replaceCss(file, encoding, next) {
                    this.push(file.clone());
                    if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
                        const content = file.contents.toString(encoding);
                        file.contents = Buffer.from(cssInjection(content));
                        file.path = file.path.replace(/index\.js/, 'css.js');
                        this.push(file);
                        next();
                    } else {
                        next();
                    }
                })
            )
            .pipe(gulp.dest(destDir));
    };
}

function compileStyles(dir) {
    return function compileStyles() {
        const plugins = [autoprefixer()];
        return gulp
            .src(stylesSrc)
            .pipe(less({ compress: false }))
            .pipe(postcss(plugins))
            .pipe(gulp.dest(dir))
            .pipe(gulp.src(stylesSrc))
            .pipe(postcss(plugins, { syntax }))
            .pipe(gulp.dest(dir));
    };
}

function tsc(dir) {
    return function tsc() {
        const tsProject = ts.createProject('tsconfig.json');
        return gulp.src(scriptsSrc).pipe(tsProject()).dts.pipe(gulp.dest(dir));
    };
}

function compileWithDist() {
    del.sync(distDir);
    const entry = getProjectPath('src/index.js');

    const options = {
        config: getWebpackConfig()
    };
    return gulp.src(entry).pipe(gulpWebpack(options, webpack)).pipe(gulp.dest(distDir));
}

const compileWithEs = gulp.series(
    clean(esDir),
    gulp.parallel(compileScripts(false), compileStyles(esDir), tsc(esDir))
);

const compileWithLib = gulp.series(
    clean(libDir),
    gulp.parallel(compileScripts(), compileStyles(libDir), tsc(libDir))
);

const compile = gulp.parallel(compileWithEs, compileWithLib, compileWithDist);

exports.clean = cleanAll;
exports.es = compileWithEs;
exports.lib = compileWithLib;
exports.dist = compileWithDist;
exports.compile = compile;
