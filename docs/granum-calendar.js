/*! granum-calendar.js v1.2.26 */

/*
TODO
- ? avoid changing type, add text input
  - hint on invalid
  - value from GET
- close btn
- format: Y-m-d, d.m.Y
- hilite today
*/
(_ => {

// pass event
const evt = (n, e) => n.dispatchEvent(new Event(e, {bubbles: true}))
// close
const x = _ => document.querySelectorAll('.month').forEach(m => m.style.display = '')
// days in month
const dim = t => new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()
// add days
const ad = (d, x) => new Date(d.valueOf() + 864e5 * x)
// format
const fmt = (v, l) => (new Date(v - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, l || 10).replace('T', ' ')
// set
const set = e => {
  const t = e.target
  let n = t.closest('.pop')
  n = n ? n.nextSibling : t.parentNode.previousSibling
  var p = n.previousSibling.lastChild
  let v = t.dataset.date
  if (t.classList.contains('browse')) return show(p, v, n.value)
  const l = n.dataset.len
  n.value = (v === 'NOW') ? fmt(Date.now(), l) : (v ? v + n.value.substring(10, l) : '')
  p.style.display = ''
  evt(n, 'input')
  evt(n, 'change')
  n.focus()
}
// btn
const ctl = (s, z, t) => '<td class="c hover browse" data-cmd data-date="' + fmt(new Date(s.getFullYear(), s.getMonth() + z)) + '">' + t
// month grid
const show = (d, v, t) => {
  let s = new Date(v)
  if (!s.getYear()){
    if (v) return
    else s = new Date()
  }
  const m = new Date(s.getFullYear(), s.getMonth(), 1, 9)
  const p = (m.getDay() + 6) % 7
  const l = dim(m)
  const c = t ? t.slice(0, 10) : fmt(new Date())
  d.innerHTML = '<table><tr class="text-n">'
    + ctl(m, -12, '&laquo;')
    + ctl(m, -1, '&lsaquo;')
    + '<td colspan=3 class=c>' + fmt(m, 7)
    + ctl(m, 1, '&rsaquo;')
    + ctl(m, 12, '&raquo;')
    + '<tr>' + Array(p).fill().map(_ => '<td>')
    .concat(Array(l).fill().map((v, i) => {
      const w = (i + p) % 7
      const f = fmt(ad(m, i))
      return (w ? '' : '<tr>')
        + '<td class="c hover'
        + (c == f ? ' bg-w' : '')
        + (w > 4 ? ' text-e' : '')
        + '" data-cmd data-date="' + f + '">'
        + (i + 1)
    }))
    .join('')
    + '</table>'
  d.style.display = 'block'
}

document.addEventListener('DOMContentLoaded', e => {
  document.querySelectorAll('.calendar').forEach(n => {
    n.dataset.len = (n.type == 'text' && !n.step)
      ? 10
      : (n.type == 'date' ? 10 : ((n.step || 60) < 60 ? 19 : 16))
    n.type = 'text'
    const p = document.createElement('div')
    p.className = 'pop fit'
    n.parentNode.insertBefore(p, n)
    n.autocomplete = 'off'
    evt(n, 'getinput')
    p.innerHTML += '<div class="month pad rad hide"></div>'
    const t = document.createElement('span')
    t.innerHTML += ' <a href="#now" data-date=NOW class="icon-ok empty"><b>&check;</b></a> <a href="#reset" data-date class="icon-delete empty"><b>&cross;</b></a>'
    n.parentNode.insertBefore(t, n.nextSibling)
  })
})

document.addEventListener('input', e => e.target.matches('.calendar:focus') ? evt(e.target, 'click') : null)

document.addEventListener('click', e => {
  if (!e.target.closest('.month')) x()
  const n = e.target.closest('.calendar')
  if (n) show(n.previousSibling.lastChild, n.value, n.value)
  else if (e.target.closest('[data-date]')) set(e)
})

document.addEventListener('keydown', e => {
    if (e.key == 'Escape' || e.key == 'Tab') x()
})

})()