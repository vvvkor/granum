/*! granum-util.js v1.2.124 */

/*
(() => {
*/

const typeOf = v => Object.prototype.toString.call(v).slice(8, -1).toLowerCase()

// find element
const q = (q, n) => (n || document).querySelector(q)

// find elements
const qq = (q, n) => (n || document).querySelectorAll(q)

// create element
const cre = (t, s, a={}) => {
  const d = document.createElement(t)
  Array.isArray(s) ? d.append(...s) : (s.nodeType ? d.append(s) : d.innerHTML = s) 
  ;(typeof(a) === 'string')
    ? d.className = a
    : Object.entries(a).forEach(a => d.setAttribute(...a))
  return d
}

// emit custom event
const emit = (n, t, detail) => {
  return (n || document).dispatchEvent(
    new CustomEvent(t, {bubbles: true, cancelable: true, detail})
  )
}

// event delegation listener
const handle = (t, q, f, c=false) => {
  return (q ? document : window).addEventListener(t, e => {
    e.recv = q ? e.target.closest(q) : document
    f(e)
  }, c)
}

// local date format
const fmtDt = (v, l=10, f='-') => (new Date((v || new Date()) - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, ({d:10,h:13,m:16,s:19,ms:23})[l] || l).replace('T', ' ')
.replace(f == '.' ? /(\d+)-(\d+)-(\d+)(.*)/ : '!', '$3.$2.$1$4') 

// *force interval* between subsequent calls; skip if busy; call last
const throttle = (f, ms=1000) => {
  let p = false, a
  return function ff() {
    if (p) a = [this, arguments] // 2
    else {
      f.apply(this, arguments) // 1
      a = null
      p = true
      setTimeout(() => { // 3
        p = false
        if (a) ff.apply(...a)
      }, ms)
    }
  }
}

// *delay* before each call
const delay = (f, ms=1000, skip) => {
  let p = null
  return function () {
    if (skip && p) clearTimeout(p)
    p = setTimeout(() => {
      f.apply(this, arguments)
      p = null
    }, ms)
  }
}

// call *only last* after pause in subsequent events
const debounce = (f, ms=1000) => delay(f, ms, true)

// log
const log = (...a) => console.log(...a)

/*
window.Util = {
  typeOf,
  q,
  qq,
  cre,
  emit,
  handle,
  fmtDt,
  throttle,
  delay,
  debounce,
  log
}

})();
*/