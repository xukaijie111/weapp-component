const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const srcPath = path.join(__dirname,'src')
const dist = path.join(__dirname,'dist')
const copyPath = ['iconfont','wxs']


// 删除目录
const cleaner = (path) =>
  function clean() {
    return exec(`npx rimraf ${path}`);
};


// 编译less
gulp.task('less',function(){
  return gulp.src(`${srcPath}/**/*.less`)
      .pipe(less())
      .pipe(rename({extname:'.wxss'}))
      .pipe(gulp.dest(dist))
})


// 编译js
gulp.task('js',function(){
  return gulp.src([`${srcPath}/**/*.js`,`!${srcPath}/iconfont/*.js`])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest(dist))
})


// 拷贝json文件
gulp.task('json',function(){
  return gulp.src([`${srcPath}/**/*.json`,`!${srcPath}/iconfont/*.json`])
  .pipe(gulp.dest(dist))
})


// 拷贝wxml文件
gulp.task('wxml',function(){
  return gulp.src(`${srcPath}/**/*.wxml`)
  .pipe(gulp.dest(dist))
})


/**
 * 拷贝文件
 */
function copy(copyFileList) {
  if (!copyFileList.length) return false

  return gulp.src(copyFileList, {cwd: srcPath,base: srcPath})
    .pipe(gulp.dest(dist))
}

// 拷贝其他静态资源
gulp.task('copy', gulp.parallel(done => {
  const copyList = copyPath
  const copyFileList = copyList.map(copyFilePath => {
    try {
      if (fs.statSync(path.join(srcPath, copyFilePath)).isDirectory()) {
        return path.join(copyFilePath, '**/*')
      } else {
        return copyFilePath
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      return null
    }
  }).filter(copyFilePath => !!copyFilePath)

  if (copyFileList.length) return copy(copyFileList)

  return done()
}))

gulp.task('default',
            gulp.series(
              gulp.parallel(['less','js','json','wxml','copy'])
            )
          )