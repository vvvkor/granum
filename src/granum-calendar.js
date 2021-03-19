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
// add months
const am = (d, x) => {
  const t = new Date(d.getTime())
  t.setDate(1)
  t.setMonth(d.getMonth() + x)
  t.setDate(Math.min(d.getDate(), dim(t)))
  return t
}
// format
const fmt = (v, l) => (new Date(v - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, l || 10).replace('T', ' ')
// set
const set = e => {
  const t = e.target
  const n = (t.closest('.pop') || t.parentNode.previousElementSibling).firstChild
  let v = t.dataset.date
  if (t.classList.contains('browse')) return show(n.nextSibling, v, n.value)
  const l = n.dataset.len
  n.value = (v === 'NOW') ? fmt(Date.now(), l) : (v ? v + n.value.substring(10, l) : '')
  n.nextSibling.style.display = ''
  evt(n, 'input')
  evt(n, 'change')
  n.focus()
}
// btn
const ctl = (s, z, t) => '<td class="c hover browse" data-date="' + fmt(am(s, z)) + '">' + t
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
  const ymd = t ? t.slice(0, 10) : fmt(s, 10)
  d.innerHTML = '<table><tr class="text-n">'
    + ctl(s, -12, '&laquo;')
    + ctl(s, -1, '&lsaquo;')
    + '<td colspan=3 class=c>' + fmt(s, 7)
    + ctl(s, 1, '&rsaquo;')
    + ctl(s, 12, '&raquo;')
    + '<tr>' + Array(p).fill().map(_ => '<td>')
    .concat(Array(l).fill().map((v, i) => 
      (((i + p) % 7) ? '' : '<tr>')
      + '<td class="c hover' + (ymd == fmt(ad(m, i), 10) ? ' bg-w' : '')
      + '" data-date="' + fmt(ad(m, i)) + '">'
      + (i + 1)))
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
    p.className = 'pop'
    n.parentNode.insertBefore(p, n)
    n.autocomplete = 'off'
    p.appendChild(n)
    evt(n, 'getinput')
    p.innerHTML += '<div class="month pad rad hide"></div>'
    const t = document.createElement('span')
    t.innerHTML += ' <a href="#now" data-date=NOW class="icon-ok empty"><b>&check;</b></a> <a href="#reset" data-date class="icon-delete empty"><b>&cross;</b></a>'
    p.parentNode.insertBefore(t, p.nextSibling)
  })
})

document.addEventListener('input', e => e.target.matches('.calendar:focus') ? evt(e.target, 'click') : null)

document.addEventListener('click', e => {
  if (!e.target.closest('.month')) x()
  const n = e.target.closest('.calendar')
  if (n) show(n.parentNode.lastChild, n.value)
  else if (e.target.closest('[data-date]')) set(e)
})

document.addEventListener('keydown', e => {
    if (e.key == 'Escape' || e.key == 'Tab') x()
})

})()