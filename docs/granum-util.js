/*! granum-util.js v1.2.72 */

// find node
const q = (q, n) => (n || document).querySelector(q)

// find nodes
const qq = (q, n) => (n || document).querySelectorAll(q)

// create node
const i = (t, s, a={}) => {
  const d = document.createElement(t)
  Array.isArray(s) ? d.append(...s) : d.append(s)
  ;(typeof(a) === 'string')
    ? d.className = a
    : Object.entries(a).forEach(a => d.setAttribute(...a))
  return d
}

// emit event
const e = (n, t, detail) => {
  return (n || document).dispatchEvent(
    new CustomEvent(t, {bubbles: true, cancelable: true, detail})
  )
}

// event listener delegation
const h = (t, q, f, c=false) => {
  return (q ? document : window).addEventListener(t, e => {
    e.recv = q ? e.target.closest(q) : document
    f(e)
  }, c)
}

const d = (v, l=10, f='-') => (new Date((v || new Date()) - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, l).replace('T', ' ')
.replace(f == '.' ? /(\d+)-(\d+)-(\d+)(.*)/ : '!', '$3.$2.$1$4') 

// log
const l = (...a) => console.log(...a)