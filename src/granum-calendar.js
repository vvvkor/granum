/*
+ set days
- align weekdays
- limit days
- switch month, year
? time
? step
docs: list in text, .calendar class
build: add calendar.js
*/
(_ => {

// pass event
const ev = (n, e) => n.dispatchEvent(new Event(e, {bubbles: true}))
// close
const x = _ => document.querySelectorAll('.month').forEach(m => m.style.display = '')
// add days
const a = (d, x) => new Date(d.valueOf() + 864e5 * x)
// format
const f = v => (new Date(v - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' ')
// set
const s = e => {
  e.preventDefault()
  const t = e.target
  const n = (t.closest('.pop') || t.parentNode.previousElementSibling)?.firstChild
  let v = t.dataset.date
  n.value = (v === 'NOW') ? f(Date.now()) : v
  ev(n, 'input')
  ev(n, 'change')
}
// month grid
const c = (d, v) => {
  let t = new Date(v)
  if (!t.getYear()) t = new Date()
  t = new Date(t.getFullYear(), t.getMonth(), 1)
  d.innerHTML = '<table>' + Array(31).fill().map((v, i) => (!(i%7) ? '<tr>' : '') + '<td class="c hover" data-date="'+(t ? f(a(t, i)) : '')+'">'+(i+1)).join('') + '</table>'
}

document.addEventListener('DOMContentLoaded', e => {
  document.querySelectorAll('.calendar').forEach(n => {
    n.type = 'text'
    const p = document.createElement('div')
    p.className = 'pop'
    n.parentNode.insertBefore(p, n)
    p.appendChild(n)
    p.innerHTML += '<div class="month pad hide">c</div>'
    const t = document.createElement('span')
    t.innerHTML += ' <a href="#now" data-date="NOW">Now</a> <a href="#reset" data-date="">Clear</a>'
    p.parentNode.insertBefore(t, p.nextSibling)
  })
})

document.addEventListener('click', e => {
  if (!e.target.closest('.month')) x()
  const n = e.target.closest('.calendar')
  const d = e.target.closest('[data-date]')
  if (n) {
    const p = n.parentNode.lastChild
    c(p, n.value)
    p.style.display = 'block'
  }
  else if (d) {
    s(e)
  }
})

document.addEventListener('keydown', e => {
    if (e.key == 'Escape') x()
})

})()