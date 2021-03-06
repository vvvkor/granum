/*! granum-full.js v1.2.57 */

;(_ => {

const tgl = (m, c, on) => {
  c = c && c.constructor === Array ? c : (c || '').split(/\s+/)
  m.forEach(n => c.forEach(k => k ? n.classList[on ? 'add' : 'remove'](k) : null))
}

document.addEventListener('DOMContentLoaded', e => {
  document.dispatchEvent(new Event('granum-start'))

  // init toggler state
  document.querySelectorAll('a.toggle').forEach(n => n.click())
  document.querySelectorAll('input[data-nodes], select[data-nodes]').forEach(n => 
    n.type != 'radio' || n.checked ? n.dispatchEvent(new Event('input', {bubbles: true})) : null
  )
  document.body.dataset.ready = ''
  document.querySelectorAll('.tabs :first-child a[href^="#"]').forEach(n => n.click())
  
  // align table cells
  document.querySelectorAll('table').forEach(n => {
    (n.className.match(/\b[lcr]\d\d?\b/g) || [])
    .forEach(c => {
      n.querySelectorAll('tr>*:nth-child(' + c.slice(1) + ')')
      .forEach(td => td.classList.add(c.slice(0, 1)))
    })
  })
  
  window.dispatchEvent(new Event('resize'))
  setTimeout(_ => window.dispatchEvent(new Event('hashchange')), 10)
  document.dispatchEvent(new Event('granum-ready'))
})

document.addEventListener('submit', e => {
  if (e.target.classList.contains('dialog') && !confirm(e.target.title || 'Continue?')) e.preventDefault()
})

document.addEventListener('click', e => {
  const n = e.target
  const a = n.closest('a')
  const b = n.closest('button.dialog, input.dialog')
  
  if (b && b.form && b.form.checkValidity() && !confirm(b.title || b.textContent)) e.preventDefault()
  
  if (a) {
    if (a.hash == '#back') {
      e.preventDefault()
      history.go(-1)
    }
    
    // confirm or prompt link
    else if (a.classList.contains('dialog')) {
      e.preventDefault()
      const u = new URL(a.href)
      const p = a.dataset.prompt
      const t = a.title || a.textContent
      const v = p ? prompt(t, a.dataset.default || u.searchParams.get(p) || '') : (confirm(t) ? 1 : null)
      if (v != null) {
        u.searchParams.set(p || a.dataset.confirm || 'confirm', v)
        location.href = u
      }
    }

    // toggle
    else if (a.classList.contains('toggle')) {
      e.preventDefault()
      const t = a.closest('.tabs')
      if (t) t.querySelectorAll('a[href^="#"].act').forEach(m => m.click())
      const s = a.dataset
      const m = document.querySelectorAll(s.nodes || a.hash)
      const c = (s.set || 'show').split(/\s+/)
      const r = 'ready' in document.body.dataset
      let on = !m[0].classList.contains(c[0]) != !r
      tgl([a], s.act || 'act', on)
      tgl([a], s.inact, !on)
      tgl(m, c, on)
      tgl(m, s.unset, !on)
      if (r && location.hash && c[0] == 'show' && !t) location.hash = '#cancel'
    }
    
    // items
    else if ('item' in a.dataset) {
      const m = a.closest(a.dataset.item || 'div, li, tr')
      if (m) {
        e.preventDefault()
        const ps = m.previousElementSibling
        const ns = m.nextElementSibling
        const pn = m.parentNode
        if ('delete' in a.dataset) (m.parentNode.children.length > 1 || !('keep' in a.dataset)) ? m.remove() : null
        else if ('up' in a.dataset) ps ? ps.before(m) : pn.append(m)
        else if ('down' in a.dataset) ns ? ns.after(m) : pn.prepend(m)
        else m.after(m.cloneNode(true))
      }
    }
  }
  
  // sort table
  const h = n.closest('.sort th, th.sort')
  if (h && !n.closest('a, input, [name]')) {
    const i = h.cellIndex
    const b = h.closest('thead').nextElementSibling
    if (b.rows.length > 1) {
      const c = h.closest('table').dataset.sort || 'bg'
      const x = [...b.rows].map(m => [m, m.cells[i].textContent.replace(/\s+$/, '')]).map(m => [m[0], m[1], parseFloat(m[1])])
      const k = isNaN(x[0][2]) ? 1 : 2
      const r = h.classList.contains(c) ? (x[0][k] < x[x.length-1][k] ? -1 : 1) : 1
      x.sort((a, b) => a[k] < b[k] ? -r : (a[k] > b[k] ? r : 0))
      x.forEach(m => b.append(m[0]))
      ;[...h.parentNode.children].forEach(m => m.classList[m == h ? 'add' : 'remove'](c))
    }
  }
  
  // close modal
  if (n.classList.contains('modal')) location.hash = '#cancel'
})

document.addEventListener('input', e => {
  const n = e.target
  
  // check all boxes
  const g = n.dataset.check
  if (g) document.querySelectorAll(g)
    .forEach(m => m.checked = n.checked && !m.closest('[hidden]'))
  
  // toggle
  if ('nodes' in n.dataset)
    document.querySelectorAll(n.dataset.nodes).forEach(m => 
      m.className = n.type == 'checkbox' ? n.dataset[n.checked ? 'set' : 'unset'] : n.value
    )
  
  // filter table
  if (n.dataset.filter) document.querySelector(n.dataset.filter).querySelectorAll('tbody tr')
    .forEach(m => m.hidden = !(' ' + m.textContent.replace(/\s+/g, ' ') + ' ').match(new RegExp(n.value, 'i')))
})

document.addEventListener('keydown', e => {
  // close modals
  if (e.key == 'Escape') location.hash = '#cancel'
})

// responsive class
window.addEventListener('resize', e => {
  const b = document.body
  const w = (b.dataset.break || '900,500').split(',')
  w.push(0)
  const m = w.findIndex(x => window.innerWidth >= Number(x))
  if (b._m == null || b._m != m) {
    b._m = m
    document.querySelectorAll('[data-resp]').forEach(n => {
      const c = n.dataset.resp.split(',')
      n.className = (c[m] != null ? c[m] : c.pop()) || ''
    })
  }
})

// focus in modal
window.addEventListener('hashchange', e => {
  if (location.hash) {
    let n = document.querySelector('.modal' + location.hash)
    if (n) n = n.querySelector('a[href]:not(.empty), button, input, select, textarea')
    if (n) {
      n.focus()
      if (n.type == 'text') n.select()
    }
  }
})

})()

;(_ => {

const q = 'form[data-restore] [name]:not([data-unstore])'
const key = n => 'store:' + (n.form.dataset.restore || '') + ':' + n.name + (n.type == 'checkbox' ? ':' + n.value : '')

document.addEventListener('DOMContentLoaded', e => {

  // init form inputs
  document.querySelectorAll('form[data-get]').forEach(n => {
    n.querySelectorAll('[name]').forEach(m => ('get' in m.dataset) ? null : m.dataset.get = m.name)
  })
  
  // init input values
  document.querySelectorAll('[name][data-get], ' + q).forEach(n => n.dispatchEvent(new Event('granum-get', {bubbles: true})))
})

document.addEventListener('reset', e => {
  const b = e.target.querySelector('[type="reset"]')
  if(!b || !b.classList.contains('dialog') || confirm(b.title || 'Reset?')) e.target.querySelectorAll(q).forEach(n => localStorage.removeItem(key(n)))
  else e.preventDefault()
})

document.addEventListener('input', e => {
  const n = e.target
  if (n.matches(q) && !n.type.match(/password|file|submit|image/) && (n.type != 'radio' || n.checked)){
    localStorage.setItem(key(n), n.type == 'checkbox' ? (n.checked ? 1 : '') : (n.dataset.cap != null ? n.dataset.cap : n.value))
  }
})

document.addEventListener('granum-get', e => {
  const n = e.target
  const nm = n.dataset.get || n.name
  const p = (new URL(location)).searchParams
  if (p.has(nm)) {
    if (n.type == 'checkbox') n.checked = p.getAll(nm).includes(n.value)
    else if (n.type == 'radio') n.checked = (p.get(nm) === n.value)
    else n.value = p.get(nm)
  }
  else if (n.matches(q)) {
    const v = localStorage.getItem(key(n))
    if (v != null) {
      if (n.type == 'checkbox') n.checked = v
      else if (n.type == 'radio') n.checked = (v === n.value)
      else n.value = v
    }
  }
})

})()

;(_ => {

const keys = {Escape: 7, Tab: 9, ArrowLeft: -1, ArrowRight: 1}

const x = _ => document.querySelectorAll('a.pic').forEach(m => m.classList.remove('modal'))

const go = (a, dir) => {
  if (dir == 7) return x()
  if (dir == 9) return location.href = a.href
  const p = [...(a.closest('.gallery') || document).querySelectorAll('a.pic')]
  const i = p.findIndex(m => m == a)
  if (dir) {
    a = p[i + dir]
    if (!a) return
  }
  x()
  a.classList.add('modal')
  a.style.background = '#000 url("' + a.href + '") no-repeat 50% 50% / contain'
  const f = i + ((2 * dir) || 1)
  a.firstElementChild.style.background = p[f] ? '#000 url("' + p[f].href + '") no-repeat 50% 50% / contain' : '' // preload
}

document.addEventListener('click', e => {
  const a = e.target.closest('a.pic')
  if (a) {
    e.preventDefault()
    n = a.classList.contains('modal')
      ? go(a, (e.clientY < 50 && a.clientWidth - e.clientX < 50)
            ? 7
            : (e.clientX < a.clientWidth / 2 ? -1 : 1))
      : go(a)
  }
})

document.addEventListener('keydown', e => {
  const a = document.querySelector('a.pic.modal')
  if (a && e.key in keys) go(a, keys[e.key])
})

})()

;(_ => {

let t = null

const evt = (n, e) => n.dispatchEvent(new Event(e, {bubbles: true}))
const set = (n, l, v, c) => {
  n.value = v
  l.value = l.dataset.cap = c
  evt(n, 'input')
  // evt(n, 'change')
  evt(l, 'input')
  // evt(l, 'change')
}
const x = l => {
  clearTimeout(t)
  lst(l).style.display = ''
  l.value = l.dataset.cap
}
const lst = l => l.previousSibling.lastChild
const hi = l => l.previousSibling.previousSibling

document.addEventListener('DOMContentLoaded', e => {
  document.querySelectorAll('[data-lookup]').forEach(n => {
    n.hidden = true
    const c = n.dataset.caption || ''
    
    const l = document.createElement('input')
    l.type = 'text'
    l.className = 'lookup'
    l.name = 'lookup-' + n.name
    l.value = l.defaultValue = c
    l.autocomplete = 'off'
    if ('get' in n.dataset) l.dataset.get = ''
    if (n.required) l.required = true
    n.after(l)

    const p = document.createElement('div')
    p.className = 'pop fit'
    p.innerHTML = '<div class="look hide"></div>'
    n.after(p)
    
    if (n.dataset.goto) {
      const t = document.createElement('span')
      t.innerHTML = ' <a href="#goto" class="icon-right empty" data-goto><b>&rarr;</b></a>'
      l.after(t)
    }
    
    evt(l, 'granum-get')
    l.dataset.cap = l.value
  })
})

document.addEventListener('input', e => {
  const l = e.target.closest('.lookup')
  if (l) {
    clearTimeout(t)
    const p = lst(l)
    const n = hi(l)
    p.style.display = ''
    t = setTimeout(_ => {
      if (l.value === '') set(n, l, '', '')
      else {
        const u = n.dataset.lookup.split('#')
        const v = l.value
        fetch(u[0].replace(/\{q\}/, encodeURIComponent(l.value)))
          .then(r => r.ok ? r.json() : [])
          .then(j => {
            if (l.value === v) {
              p.innerHTML = j.slice(0, n.dataset.limit || 5).map((d, i) => '<div data-cmd class="pad hover' + (i ? '' : ' bg') + '" data-id="' + d[u[1] || 'id'] + '"><div>' + (d[u[2] || 'name']) + '</div>' + (d[u[3] || 'info'] ? '<div class="small text-n">' + d[u[3] || 'info'] + '</div>' : '') + '</div>').join('')
              p.style.display = 'block'
            }
          })
      }
    }, 300)
  }
})

document.addEventListener('click', e => {
  let a = e.target.closest('.look [data-id]')
  if (a) {
    clearTimeout(t)
    const l = a.closest('.pop').nextSibling
    set(hi(l), l, a.dataset.id, a.firstChild.textContent)
    l.focus()
  }
  const l = e.target.closest('.lookup')
  document.querySelectorAll('.lookup').forEach(m => m == l ? null : x(m))
  a = e.target.closest('a[data-goto]')
  if (a) a = hi(a.parentNode.previousSibling)
  if (a) {
    e.preventDefault()
    if (a.value) location.href = a.dataset.goto.replace(/\{id\}/, encodeURIComponent(a.value))
  }
})

document.addEventListener('keydown', e => {
  const l = e.target.closest('.lookup:focus')
  if (l) {
    const p = lst(l)
    if (e.key == 'Escape' || e.key == 'Tab') x(l)
    else if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
      if (!p.style.display) evt(l, 'input')
      else{
        let a = p.querySelector('div.bg')
        a = a
          ? (e.key == 'ArrowUp'
            ? (a.previousSibling || p.lastChild)
            : (a.nextSibling || p.firstChild))
          : p.firstChild
        p.querySelectorAll('div').forEach(m => m.classList[m == a ? 'add' : 'remove']('bg'))
      }
    }
    else if (e.key == 'Enter') {
      let a = p.querySelector('div.bg')
      if (a) {
        if (p.style.display) e.preventDefault()
        evt(a, 'click')
      }
    }
  }
})

})()

;(_ => {

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
    if (n.value.match('-')) n.value = fmt((new Date(n.value)), n.dataset.len)
    if (n.defaultValue.match('-'))  n.defaultValue = fmt((new Date(n.defaultValue)), n.dataset.len)
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

;(_ => {

const set = (d, def) => d.querySelectorAll('[contenteditable][data-for]').forEach(n => {
  const area = document.getElementById(n.dataset.for)
  if (area) n.innerHTML = area[def ? 'defaultValue' : 'value']
})

// fill contenteditable from textarea
document.addEventListener('DOMContentLoaded', e => set(document, false))

// reset contenteditable from textarea
document.addEventListener('reset', e => e.defaultPrevented ? null : set(e.target, true))

document.addEventListener('click', e => {
  const a = e.target.closest('a')

  // contenteditable command
  if (a && a.hash && a.dataset.cmd) {
    const n = document.getElementById(a.hash.slice(1))
    if (n) {
      e.preventDefault()
      const arg = ('ask' in a.dataset)
        ? prompt(a.title || a.dataset.cmd, a.dataset.ask)
        : ('arg' in a.dataset ? a.dataset.arg : '')
      if (arg != null) {
        n.focus()
        document.execCommand(a.dataset.cmd, false, arg)
      }
    }
  }
})

document.addEventListener('input', e => {
  // update textarea
  if (e.target.dataset.for) {
    const area = document.getElementById(e.target.dataset.for)
    if (area) area.value = e.target.innerHTML
    area.dispatchEvent(new CustomEvent('input', {bubbles: true, detail: 1}))
  }
  
  // update contenteditable
  if (e.target.id && e.target.tagName == 'TEXTAREA' && !e.detail) {
    const c = document.querySelector('[data-for="' + e.target.id + '"]')
    if (c) c.innerHTML = e.target.value
  }
})

})()

