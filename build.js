const replace = require('replace-in-file');
const {name, version} = require('./package.json');
const csso = require('csso');
const fs = require('fs')
const UglifyJS = require("uglify-js");

// cleanup

console.log('\n# PREPARE\n');
['./dist/', './docs/']
.forEach(d => {
  console.log('Clear ' + d + '...')
  fs.readdirSync(d).forEach(n => {
    if (fs.existsSync(d + n)) {
      try {
        fs.unlinkSync(d + n)
      } catch (error) {
        console.error(error)
      }
    }
  });
});

// copy and bundle css

console.log('\n# CSS\n');
console.log('Bundle granum-full.css...');
['granum', 'granum-icons', 'granum-dropdown', 'granum-grid', 'granum-print', 'granum-basic']
.forEach((n, i) => {
  console.log('Copy ' + n + '.css...');
  //fs.copyFileSync('./src/' + n + '.css', './dist/' + n + '.css')
  const css = fs.readFileSync('./src/' + n + '.css', 'utf8');
  const v = '/*! ' + n + '.css v' + version + ' */\n\n';
  fs.writeFileSync('./dist/' + n + '.css', v + css, {flag: 'w'});
  if (n != 'granum-basic') {
    if (!i) fs.writeFileSync('./dist/granum-full.css', '/*! granum-full.css v' + version + ' */\n\n', {flag: 'as'});
    fs.writeFileSync('./dist/granum-full.css', css + '\n\n', {flag: 'as'});
  }
});

// minify css

['granum', 'granum-icons', 'granum-dropdown', 'granum-grid', 'granum-print', 'granum-full', 'granum-basic']
.forEach(n => {
  console.log('Minify ' + n + '.css...');
  const css = fs.readFileSync('./dist/' + n + '.css', 'utf8');
  let min = csso.minify(css, {
    restructure: false,
  }).css;
  //min = '/*! ' + n + '.css v' + version + ' */\n' + min;
  fs.writeFileSync('./dist/' + n + '.min.css', min);
});

// copy and bundle js

console.log('\n# JS\n');
console.log('Bundle granum-full.js...');
['granum', 'granum-dialog', 'granum-restore', 'granum-gallery', 'granum-lookup', 'granum-calendar', 'granum-edit', 'granum-drag', 'granum-util']
.forEach((n, i) => {
  console.log('Copy ' + n + '.js...');
  //fs.copyFileSync('./src/' + n + '.js', './dist/' + n + '.js')
  const js = fs.readFileSync('./src/' + n + '.js', 'utf8');
  const v = '/*! ' + n + '.js v' + version + ' */\n\n';
  fs.writeFileSync('./dist/' + n + '.js', v + js, {flag: 'w'});
  if (n != 'granum-util') {
    if (!i) fs.writeFileSync('./dist/granum-full.js', '/*! granum-full.js v' + version + ' */\n\n', {flag: 'as'});
    fs.writeFileSync('./dist/granum-full.js', (i ? ';' : '') + js + '\n\n', {flag: 'as'});
  }
});

// minify js

['granum', 'granum-dialog', 'granum-restore', 'granum-gallery', 'granum-lookup', 'granum-calendar', 'granum-edit', 'granum-drag', 'granum-full', 'granum-util']
.forEach(n => {
  console.log('Minify ' + n + '.js...');
  const js = fs.readFileSync('./dist/' + n + '.js', 'utf8');
  var res = UglifyJS.minify(js, {
    compress: {
      // arrows: false,
      // comparisons: false,
      // sequences: false,
      // conditionals: false,
      // reduce_vars: false
    },
    output: {
      //preamble: '/*! ' + n + '.js v' + version + ' */',
      comments: /^!/,
    }
  });
  fs.writeFileSync('./dist/' + n + '.min.js', res.code);
  if (res.error) console.error('UglifyJS failed [' + n + '.js]: ' + res.error);
});

// copy docs

console.log('\n# DOCS\n');

console.log('Copy docs...');
['index.html', 'basic.html', 'sample.html', 'docs.md']
.forEach(n => fs.copyFileSync('./src/' + n, './docs/' + n));

console.log('Copy assets...');
[
  'granum.css', 'granum-icons.css', 'granum-dropdown.css', 'granum-grid.css', 'granum-print.css', 'granum-basic.css',
  'granum.js', 'granum-dialog.js', 'granum-restore.js', 'granum-gallery.js',
  'granum-lookup.js', 'granum-calendar.js', 'granum-edit.js', 'granum-drag.js',
  'granum-util.js'
]
.forEach(n => fs.copyFileSync('./dist/' + n, './docs/' + n));

// replace version

const replace_options = {
  files: [
    // './docs/*.css',
    // './docs/*.js',
    './docs/*.md',
    './docs/*.html'
  ],
  from: /v\d+\.\d+\.\d+/g,
  to: 'v' + version,
};

try {
  const results = replace.sync(replace_options);
  console.log('Replace (' + name +  ' v' + version + '): \n', results);
}
catch (error) {
  console.error('Replace error:', error);
}
