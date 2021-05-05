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
.replace(document.body.dataset.dt == '.' ? /(\d+)-(\d+)-(\d+)(.*)/ : '!', '$3.$2.$1$4')
// set
const set = e => {
  e.preventDefault()
  const t = e.target
  let n = t.closest('.pop')
  n = n ? n.nextSibling : t.parentNode.previousSibling
  const p = n.previousSibling.lastChild
  const v = t.dataset.date
  if (t.classList.contains('browse')) return show(p, v, n.value)
  const l = n.dataset.len
  n.value = (v === 'NOW') ? fmt(Date.now(), l) : (v ? v + n.value.substring(10, l) : '')
  p.style.display = ''
  evt(n, 'input')
  // evt(n, 'change')
  n.focus()
}
// btn
const ctl = (s, z, t) => '<td class="c hover browse" data-cmd data-date="' + fmt(new Date(s.getFullYear(), s.getMonth() + z)) + '">' + t
// month grid
const show = (d, v, t) => {
  let s = new Date(v.replace(/(\d+)\.(\d+)\.(\d+)(.*)/, '$3-$2-$1$4').replace(' ', 'T'))
  if (!s.getYear()){
    if (v) return
    else s = new Date()
  }
  const m = new Date(s.getFullYear(), s.getMonth(), 1, 9)
  const k = ad(m, 9)
  const p = (m.getDay() + 6) % 7
  const l = dim(m)
  const c = t ? t.slice(0, 10) : fmt(new Date())
  d.innerHTML = '<table><tr class="text-n">'
    + ctl(k, -12, '&laquo;')
    + ctl(k, -1, '&lsaquo;')
    + '<td colspan=3 class=c>' + fmt(m, 7)
    + ctl(k, 1, '&rsaquo;')
    + ctl(k, 12, '&raquo;')
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
    const s = n.step || n.dataset.step
    n.dataset.len = (n.type == 'text' && !s)
      ? 10
      : (n.type == 'date' ? 10 : ((s || 60) < 60 ? 19 : 16))
    n.type = 'text'
    const p = document.createElement('div')
    p.className = 'pop fit'
    n.before(p)
    n.autocomplete = 'off'
    evt(n, 'granum-get')
    p.innerHTML += '<div class="month pad rad hide"></div>'
    const t = document.createElement('span')
    t.innerHTML = ' <a href="#now" data-date=NOW class="icon-ok empty"><b>&check;</b></a> <a href="#reset" data-date class="icon-delete empty"><b>&cross;</b></a>'
    n.after(t)
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