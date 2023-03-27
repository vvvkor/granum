// dist file exists: css, js, 
// docs file exists: css, js, html
// correct version

const fs = require('fs');
const {name, version} = require('../package.json');

const files = {
  dist: [
    'granum-basic.css',
    'granum-basic.min.css',
    'granum-calendar.js',
    'granum-calendar.min.js',
    'granum-dialog.js',
    'granum-dialog.min.js',
    'granum-drag.js',
    'granum-drag.min.js',
    'granum-dropdown.css',
    'granum-dropdown.min.css',
    'granum-edit.js',
    'granum-edit.min.js',
    'granum-ext.css',
    'granum-ext.js',
    'granum-ext.min.css',
    'granum-ext.min.js',
    'granum-full.css',
    'granum-full.js',
    'granum-full.min.css',
    'granum-full.min.js',
    'granum-gallery.js',
    'granum-gallery.min.js',
    'granum-grid.css',
    'granum-grid.min.css',
    'granum-icons-ext.css',
    'granum-icons-ext.min.css',
    'granum-icons.css',
    'granum-icons.min.css',
    'granum-lookup.js',
    'granum-lookup.min.js',
    'granum-print.css',
    'granum-print.min.css',
    'granum-restore.js',
    'granum-restore.min.js',
    'granum-split.js',
    'granum-split.min.js',
    'granum-util.js',
    'granum-util.min.js',
    'granum.css',
    'granum.js',
    'granum.min.css',
    'granum.min.js'
  ],
  docs: [
    'basic.html',
    'docs.md',
    'granum-basic.css',
    'granum-calendar.js',
    'granum-dialog.js',
    'granum-drag.js',
    'granum-dropdown.css',
    'granum-edit.js',
    'granum-gallery.js',
    'granum-grid.css',
    'granum-icons-ext.css',
    'granum-icons.css',
    'granum-lookup.js',
    'granum-print.css',
    'granum-restore.js',
    'granum-split.js',
    'granum-util.js',
    'granum.css',
    'granum.js',
    'index.html',
    'sample.html'
  ]
}

// test('adds 1 + 2 to equal 3', () => { expect(1 + 2).toBe(3); });
describe('Files exist', () => {
  Object.entries(files).forEach(([dir, list]) => {
    list.forEach(file => {
      const fn = './' + dir + '/' + file;
      test('File exists: ' + fn, () => {
        expect(fs.accessSync(fn)).toBe(undefined);
      });
    })
  })
});

describe('Files version', () => {
  Object.entries(files).forEach(([dir, list]) => {
    list.filter(file => file.match(/\.(js|css)$/)).forEach(file => {
      const fn = './' + dir + '/' + file;
      test('File version is ' + version + ': ' + fn, () => {
        expect(fs.readFileSync(fn, {encoding: 'utf-8'}).slice(0, 100)).toMatch('v' + version);
      });
    })
  })
})