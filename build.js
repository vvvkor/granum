const replace = require('replace-in-file');
const {name, version} = require('./package.json');
const csso = require('csso');
const fs = require('fs')
const UglifyJS = require("uglify-js");

// cleanup
['granum.min.css', 'granum-icons.min.css', 'granum-dropdown.min.css', 'granum.min.js', 'granum-edit.min.js']
.forEach(n => {
  try {
    fs.unlinkSync('./' + n)
    console.error('Remove ' + n)
  } catch (error) {
    console.error(error)
  }
});

// replace version

const replace_options = {
  files: [
    './*.css',
    './*.js',
    './*.html'
  ],
  from: /v\d+\.\d+\.\d+/g,
  to: 'v' + version,
};

try {
  const results = replace.sync(replace_options);
  console.log('Replacement (' + name +  ' v' + version + '):', results);
}
catch (error) {
  console.error('Error occurred:', error);
}

// minify css

['granum', 'granum-icons', 'granum-dropdown']
.forEach(n => {
  console.log('Minify ' + n + '.css...');
  const css = fs.readFileSync('./' + n + '.css', 'utf8');
  let min = csso.minify(css, {
    restructure: false,
  }).css;
  //min = '/*! ' + n + '.css v' + version + ' */\n' + min;
  fs.writeFileSync('./' + n + '.min.css', min);
});

// minify js

['granum', 'granum-edit']
.forEach(n => {
  console.log('Minify ' + n + '.js...');
  const js = fs.readFileSync('./' + n + '.js', 'utf8');
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
  fs.writeFileSync('./' + n + '.min.js', res.code);
  if (res.error) console.error('UglifyJS failed [' + n + '.js]: ' + res.error);
});
