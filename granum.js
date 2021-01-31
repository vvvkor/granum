(_ => {

const tgl = (m, c, on) => {
  c = c && c.constructor === Array ? c : (c || '').split(/\s+/)
  m.forEach(n => c.forEach(k => k ? n.classList[on ? 'add' : 'remove'](k) : null))
}

document.addEventListener('DOMContentLoaded', e => {
  console.log('granum.js started')

  // init toggler state
  document.querySelectorAll('a.toggle').forEach(a => a.click())
  
  // align table cells
  document.querySelectorAll('table').forEach(n => {
    n.className.match(/\b[lcr]\d\d?\b/g)
      ?.forEach(c => {
        n.querySelectorAll('tr>*:nth-child(' + c.substr(1) + ')')
        .forEach(td => td.classList.add(c.substr(0, 1)))
      })
  })
  
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
    const m = document.querySelectorAll(a.dataset.nodes || a.hash)
    const c = (a.dataset.set || 'show').split(/\s+/)
    let on = !m[0].classList.contains(c[0]) != !a._ready
    a._ready = 1
    tgl([a], a.dataset.act || 'act', on)
    tgl([a], a.dataset.inact, !on)
    tgl(m, c, on)
    tgl(m, a.dataset.unset, !on)
    if (location.hash && c[0] == 'show') location.hash = '#cancel'
  }
  
  // close modal
  if (e.target.classList.contains('modal')) location.hash = '#cancel'
})

document.addEventListener('input', e => {
  // check all boxes
  const g = e.target.dataset.group
  if (g) document.querySelectorAll('.' + g + '[type="checkbox"]')
    .forEach(n => n.checked = e.target.checked)
})

// close modals
document.addEventListener('keydown', e => {
  if (e.key == 'Escape') location.hash = '#cancel'
})

// resize window
window.addEventListener('resize', e => {
  const m = (window.innerWidth < 900)
  if (document.body._m == null || document.body._m != m) {
    document.body._m = m
    document.querySelectorAll('[data-mobile], [data-desktop]')
      .forEach(n => n.className = n.dataset[m ? 'mobile' : 'desktop'] || '')
  }
})

window.dispatchEvent(new Event('resize'))

})()