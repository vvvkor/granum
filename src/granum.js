(_ => {

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
      const v = p ? prompt(t, a.dataset.def || u.searchParams.get(p) || '') : (confirm(t) ? 1 : null)
      if (v != null) {
        u.searchParams.set(p || a.dataset.param || 'confirm', v)
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
      if (!m[0]) return;
      const c = (s.set || 'show').split(/\s+/)
      const r = 'ready' in document.body.dataset
      let on = !m[0].classList.contains(c[0]) != !r
      const store = a.hash && m[0].classList.contains('mem')
      if (store && !r){
        const mem = localStorage.getItem('toggle' + a.hash)
        if (mem != null) on = !!Number(mem)
      }
      tgl([a], s.act || 'act', on)
      tgl([a], s.inact, !on)
      tgl(m, c, on)
      tgl(m, s.unset, !on)
      if (store && r) localStorage.setItem('toggle' + a.hash, on ? 1 : 0)
      if (r && location.hash && c[0] == 'show' && !t) location.hash = '#cancel'
      if (r && on && a.classList.contains('resp')) m[0].scrollIntoView(true)
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
  if (n.matches('.modal:target')) location.hash = '#cancel'
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
  if (n.dataset.filter) {
    const q = n.dataset.filter.split('^')
    ;((q[1] ? n.closest(q[0]) : document).querySelector(q.pop())).querySelectorAll('tbody tr')
      .forEach(m => m.hidden = !(' ' + m.textContent.replace(/\s+/g, ' ') + ' ').match(new RegExp(n.value, 'i')))
  }
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