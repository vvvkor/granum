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
  document.querySelectorAll('[name][data-get]').forEach(n => n.dispatchEvent(new Event('getinput', {bubbles: true})))

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
      n.querySelectorAll('tr>*:nth-child(' + c.substr(1) + ')')
      .forEach(td => td.classList.add(c.substr(0, 1)))
    })
  })
  
  window.dispatchEvent(new Event('resize'))
  document.dispatchEvent(new Event('granum'))
})

document.addEventListener('getinput', e => {
  const n = e.target
  const nm = n.dataset.get || n.name
  const m = location.href.match(new RegExp('(\\?|&)_?' + nm + '=(.*?)($|&|#)'))
  if (m) {
    const v = decodeURIComponent(m[2].replace(/\+/g, ' '))
    if (n.type == 'checkbox') n.checked = (v && v !== '0')
    else if (n.type == 'radio') n.checked = (v && n.value === v)
    else n.value = n.dataset.cap = v
  }
})

document.addEventListener('submit', e => {
  if (e.target.classList.contains('dialog') && !confirm(e.target.title || 'Continue?')) e.preventDefault()
})

document.addEventListener('click', e => {
  const n = e.target
  const a = n.closest('a')
  const b = n.closest('button.dialog, input.dialog')
  
  if (b?.form?.checkValidity() && !confirm(b.title || b.textContent)) e.preventDefault()
  
  if (a) {
    if (a.classList.contains('dialog')) {
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
    if (a.classList.contains('toggle')) {
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
    if ('item' in a.dataset) {
      const m = a.closest(a.dataset.item || 'div, li, tr')
      if (m) {
        e.preventDefault()
        if ('delete' in a.dataset) (m.parentNode.children.length > 1 || !('keep' in a.dataset)) ? m.parentNode.removeChild(m) : null
        else if ('up' in a.dataset) m.parentNode.insertBefore(m, m.previousElementSibling)
        else if ('down' in a.dataset) m.parentNode.insertBefore(m, m.nextElementSibling ? m.nextElementSibling.nextElementSibling : m.parentNode.firstElementChild)
        else m.parentNode.insertBefore(m.cloneNode(true), m.nextElementSibling)
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
      x.forEach(m => b.appendChild(m[0]))
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
    .forEach(m => m.checked = n.checked)
  
  // toggle
  if ('nodes' in n.dataset)
    document.querySelectorAll(n.dataset.nodes).forEach(m => 
      m.className = n.type == 'checkbox' ? n.dataset[n.checked ? 'set' : 'unset'] : n.value
    )
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

})()