/*! granum.js v1.2.5 */

(_ => {

const tgl = (m, c, on) => {
  c = c && c.constructor === Array ? c : (c || '').split(/\s+/)
  m.forEach(n => c.forEach(k => k ? n.classList[on ? 'add' : 'remove'](k) : null))
}

document.addEventListener('DOMContentLoaded', e => {
  console.log('granum.js started')

  // init form inputs
  document.querySelectorAll('form[data-get]').forEach(n => {
    n.querySelectorAll('[name]').forEach(m => ('get' in m.dataset) ? null : m.dataset.get = m.name)
  })
  
  // init input values
  document.querySelectorAll('[name][data-get]').forEach(n => {
    const nm = n.dataset.get || n.name
    const m = location.href.match(new RegExp('(\\?|&)' + nm + '=(.*?)($|&|#)'))
    if (m) {
      const v = decodeURIComponent(m[2].replace(/\+/g, ' '))
      if (n.type == 'checkbox') n.checked = (v && v !== '0')
      else if (n.type == 'radio') n.checked = (v && n.value === v)
      else n.value = v
    }
  })
  
  // init toggler state
  document.querySelectorAll('a.toggle').forEach(n => n.click())
  document.querySelectorAll('input[data-nodes], select[data-nodes]').forEach(n => 
    n.type != 'radio' || n.checked ? n.dispatchEvent(new Event('input', {bubbles: true})) : null
  )
  document.body.dataset.ready = ''
  
  // align table cells
  document.querySelectorAll('table').forEach(n => {
    (n.className.match(/\b[lcr]\d\d?\b/g) || [])
    .forEach(c => {
      n.querySelectorAll('tr>*:nth-child(' + c.substr(1) + ')')
      .forEach(td => td.classList.add(c.substr(0, 1)))
    })
  })
  
  document.dispatchEvent(new Event('granum'))
})

document.addEventListener('click', e => {
  const a = e.target.closest('a')
  
  if (a && a.classList.contains('dialog')) {
    // prompt link
    const p = a.dataset.prompt
    if (p) {
      e.preventDefault()
      const v = prompt(a.title || a.textContent, a.dataset.default || '')
      if (v != null) location.href = a.href.replace(p, v)
    }
    // confirm link
    else if (!confirm(a.title || a.textContent)) e.preventDefault()
  }

  // toggle
  if (a && a.classList.contains('toggle')) {
    e.preventDefault()
    const s = a.dataset
    const m = document.querySelectorAll(s.nodes || a.hash)
    const c = (s.set || 'show').split(/\s+/)
    const r = 'ready' in document.body.dataset
    let on = !m[0].classList.contains(c[0]) != !r
    tgl([a], s.act || 'act', on)
    tgl([a], s.inact, !on)
    tgl(m, c, on)
    tgl(m, s.unset, !on)
    if (r && location.hash && c[0] == 'show') location.hash = '#cancel'
  }
  
  // close modal
  if (e.target.classList.contains('modal')) location.hash = '#cancel'
})

document.addEventListener('input', e => {
  const n = e.target
  
  // check all boxes
  const g = n.dataset.check
  if (g) document.querySelectorAll(g)
    .forEach(m => m.checked = n.checked)
  
  // toggle
  if ('nodes' in n.dataset)
    document.querySelectorAll(n.dataset.nodes).forEach(m => 
      m.className = n.type == 'checkbox' ? n.dataset[n.checked ? 'set' : 'unset'] : n.value
    )
})

// close modals
document.addEventListener('keydown', e => {
  if (e.key == 'Escape') location.hash = '#cancel'
})

// resize window
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

window.dispatchEvent(new Event('resize'))

})()