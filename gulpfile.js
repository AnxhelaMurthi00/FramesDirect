const gulp = require('gulp');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps')
const argv = require('yargs').argv;
const sass = require('gulp-sass')(require('sass'));

// GET OPTION DEFINED ON PACKAGE.JSON
const arg = (argList => {

    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {
  
      thisOpt = argList[a].trim();
      opt = thisOpt.replace(/^\-+/, '');
  
      if (opt === thisOpt) {
  
        // argument value
        if (curOpt) arg[curOpt] = opt;
        curOpt = null;
  
      }
      else {
        // argument name
        curOpt = opt;
        arg[curOpt] = true;
  
      }
    }
  
    return arg;
  
  })(process.argv);

gulp.task('js',done => {
    return browserify({
        entries:[arg.file]
        
    },{ base: "." })
    .transform( babelify, {
        global: true,
        ignore: [/\/node_modules\/(?!@vizuaalog\/)/],
        presets: ["@babel/preset-env"],
        plugins: ["@babel/transform-runtime"]
    } )
    .bundle()
    .pipe( source(arg.file))
    .pipe(rename({extname:".min.js"}))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("./"))
   
    done()
});

gulp.task('css', done =>{
  return gulp.src('DesignSystem/style/**/*.scss') // Path to your SCSS files
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('DesignSystem/dist/css')); // Output directory for CSS files
});

const svgSprite = require('gulp-svg-sprite'),
config = {
  mode: {
    symbol: { // symbol mode to build the SVG
      render: {
        css: false, // CSS output option for icon sizing
        scss: false // SCSS output option for icon sizing
      },
      dest: './sprite', // destination folder
      prefix: '.svg--%s', // BEM-style prefix if styles rendered
      sprite: 'sprite.svg', //generated sprite name
      example: true // Build a sample page, please!
    }
  }
};

gulp.task('sprite',done => {
  gulp.src(`${arg.icons}/*.svg`)
    .pipe(svgSprite(config))
    .pipe(gulp.dest(`${arg.icons}`));
    done()
});
