// run: node ./build.js
// run: npm publish

const dir = './src/'
const src = './src/asset/granum.css'
const dist = './dist/'
const docs = './docs/'
const distMinCss = './dist/granum.min.css'
const distMinJs = './dist/granum.min.js'

const replace = require('replace-in-file')
const {name, version} = require('./package.json')
// const csso = require('csso')
var CleanCSS = require('clean-css')
const UglifyJS = require("uglify-js")
const fs = require('fs') 
const iconPaths = require(dir + 'asset/icon-paths.js')
const synonyms = require(dir + 'asset/icon-synonyms.js')
const acts = require(dir + 'asset/icon-acts.js')

// tools

function encodeSvg(svg) {
  return svg.replace('<svg', (~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))
    .replace(/"/g, '\'')
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/\{/g, '%7B')
    .replace(/\}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
}
function svgIcon (w, p) {
  return '<svg xmlns="http://www.w3.org/2000/svg"' + ' viewBox="0 0 ' + w + ' ' + w + '"><path d="' + p + '"/></svg>'
}
function cssMaskIcon (w, p, n, s, a) {
  const names = [n, ...s]
  const sel = names.map(v => '.icon-' + v).join(', ')
    + (a && a.length ? a.map(v => `, .icon-${v}.check:has(:checked), [open]>.icon-${v}, .icon-${v}[href^="#"]:has(+:target), .icon-${v}.act`).join('') : '')
    //.icon-menu.check:has(:checked), [open]>.icon-menu, .icon-menu[href^="#"]:has(+:target), .icon-menu.act
  return `${sel} {--i:url("data:image/svg+xml;utf8,${encodeSvg(svgIcon(w, p))}");}`
}

// build src/icon-shapes.css

const icons = []
Object.entries(iconPaths).forEach(([n, [w, p]]) => {
  const syn = Object.entries(synonyms).filter(([s, orig]) => orig == n).map(([s]) => s)
  const act = Object.entries(acts).filter(([a, b]) => b == n || syn.includes(b)).map(([a]) => a)
  icons.push(cssMaskIcon(w, p, n, syn, act))
})
fs.writeFileSync('./src/asset/icon-shapes.css', icons.join('\n'), {flag: 'w'})

// cleanup

;[/*dist + 'svg/', docs + 'svg/',*/ dist, docs].forEach(d => {
  console.log('Clear ' + d + '...')
  fs.readdirSync(d).forEach(n => {
    if (fs.existsSync(d + n) && fs.lstatSync(d + n).isFile()) {
      try {
        fs.unlinkSync(d + n)
      } catch (error) {
        console.error(error)
      }
    }
  })
}) 

// build css

const options = {
  // keepSpecialComments: '*',
}
;[
'var',
'reset',
'typo',
'space',
'display',
'table',
'table-fixed',
'color',
//'icon-path',
'icon-mask',
'icon-shapes',
'icon-animate',
'form',
'input',
//'custom-box',
'switch',
'dropzone',
'layout',
'toggle',
'transition',
'slider',
'print'
].forEach(n => {
  console.log('Minify ' + n + '.css...')
  const css = fs.readFileSync(dir + 'asset/' + n + '.css', 'utf8')
  
  //let min = csso.minify(css, { restructure: false }).css // no support for media ranges
  let min = (new CleanCSS(options).minify(css)).styles

  min = '/*! ' + n + '.css */\n' + min // + 'v' + version + ' */\n' + min
  fs.writeFileSync(distMinCss, min + '\n\n', {flag: 'as'})
})


// minify js

;['granum']
.forEach(n => {
  console.log('Minify ' + n + '.js...')
  const js = fs.readFileSync(dir + 'asset/' + n + '.js', 'utf8')
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
  })
  fs.writeFileSync(distMinJs, res.code)
  if (res.error) console.error('UglifyJS failed [' + n + '.js]: ' + res.error)
})

// copy demo html

fs.copyFileSync(dir + 'asset/customize.js', docs + 'customize.js')
fs.copyFileSync(dir + 'asset/icon-paths.js', docs + 'icon-paths.js')
fs.copyFileSync(distMinCss, docs + 'granum.min.css')
fs.copyFileSync(distMinJs, docs + 'granum.min.js')
fs.copyFileSync(dir + 'index.html', docs + 'index.html')
fs.copyFileSync(dir + 'docs.html', docs + 'docs.html')
fs.copyFileSync(dir + 'docs.md', docs + 'docs.md')
const replace_options = {
  files: [
    docs + 'index.html',
    docs + 'docs.html',
  ],
  from: [
    /asset\/granum\./g,
    /asset\/customize\./g,
    /asset\/icon-paths\./g,
  ],
  to: [
    'granum.min.', // + version,
    'customize.',
    'icon-paths.',
  ],
}

try {
  const results = replace.sync(replace_options)
  console.log('Replace: \n', results)
}
catch (error) {
  console.error('Replace error:', error)
}

//require('./build-icons.js')