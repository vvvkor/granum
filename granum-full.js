/*! granum.js v1.2.24 */

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
    const m = location.href.match(new RegExp('(\\?|&)_?' + nm + '=(.*?)($|&|#)'))
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

document.addEventListener('click', e => {
  const n = e.target
  const a = n.closest('a')
  
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

/*! granum-gallery.js v1.2.24 */

(_ => {

const k = {Escape: 7, Tab: 9, ArrowLeft: -1, ArrowRight: 1}

const esc = _ => document.querySelectorAll('a.pic').forEach(m => m.classList.remove('modal'))

const go = (a, dir) => {
  if (dir == 7) return esc()
  if (dir == 9) return location.href = a.href
  const p = [...(a.closest('.gallery') || document).querySelectorAll('a.pic')]
  const i = p.findIndex(m => m == a)
  if (dir) {
    a = p[i + dir]
    if (!a) return
  }
  esc()
  a.classList.add('modal')
  a.style.background = '#000 url("' + a.href + '") no-repeat 50% 50% / contain'
  const x = i + ((2 * dir) || 1)
  a.firstElementChild.style.background = p[x] ? '#000 url("' + p[x].href + '") no-repeat 50% 50% / contain' : '' // preload
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
}, false)

document.addEventListener('keydown', e => {
  const a = document.querySelector('a.pic.modal')
  if (a && e.key in k) go(a, k[e.key])
})

})()

/*! granum-lookup.js v1.2.24 */

(_ => {

let t = null

const x = _ => document.querySelectorAll('.lookup + div').forEach(m => m.style.display = '')

document.addEventListener('DOMContentLoaded', e => {
  document.querySelectorAll('[data-lookup]').forEach(n => {
    n.hidden = true
    const p = document.createElement('div')
    p.className = 'pop'
    p.innerHTML = '<input class="lookup" value="' + n.dataset.caption + '" data-cap="' + n.dataset.caption + '"><div class="hide"></div>'
    n.parentNode.insertBefore(p, n.nextSibling)
    p.lastChild.style.cursor = 'pointer'
  })
})

document.addEventListener('input', e => {
  const l = e.target.closest('.lookup')
  if (l) {
    clearTimeout(t)
    t = setTimeout(_ => {
      x()
      const p = l.nextSibling
      const n = p.parentNode.previousSibling
      if (l.value === '') {
        p.style.display = ''
        n.value = l.dataset.cap = ''
      }
      else {
        const u = n.dataset.lookup.split('#')
        fetch(u[0].replace(/\{q\}/, encodeURIComponent(l.value)))
          .then(r => r.ok ? r.json() : [])
          .then(j => p.innerHTML = j.slice(0, 5).map((d, i) => '<div class="pad hover' + (i ? '' : ' bg') + '" data-lookid="' + d[u[1] || 'id'] + '"><div>' + (d[u[2] || 'name']) + '</div>' + (d[u[3] || 'info'] ? '<div class="small text-n">' + d[u[3] || 'info'] + '</div>' : '') + '</div>').join(''))
          .then(_ => p.style.display = 'block')
      }
    }, 500)
  }
})

document.addEventListener('click', e => {
  const a = e.target.closest('[data-lookid]')
  if (a) {
    clearTimeout(t)
    const l = a.parentNode.previousSibling
    l.parentNode.previousSibling.value = a.dataset.lookid
    l.value = l.dataset.cap = a.firstChild.textContent
    a.parentNode.style.display = ''
  }
  if (!e.target.closest('.lookup, .lookup + div')) x()
})

document.addEventListener('keydown', e => {
  const l = e.target.closest('.lookup:focus')
  if (l) {
    const p = l.nextSibling
    if (e.key == 'Escape') {
      clearTimeout(t)
      p.style.display = ''
      l.value = l.dataset.cap
    }
    else if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
      if (!p.style.display) l.dispatchEvent(new Event('input', {bubbles: true}))
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
      if (a) a.dispatchEvent(new Event('click', {bubbles: true}))
    }
  }
})

})()

/*! granum-edit.js v1.2.24 */

document.addEventListener('DOMContentLoaded', e => {
  // fill contenteditable from textarea
  document.querySelectorAll('[contenteditable][data-for]').forEach(n => {
    const area = document.getElementById(n.dataset.for)
    if (area) n.innerHTML = area.value
  })
})

document.addEventListener('click', e => {
  const a = e.target.closest('a')

  // contenteditable command
  if (a && a.hash && a.dataset.cmd) {
    const n = document.getElementById(a.hash.substr(1))
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
  }
  
  // update contenteditable
  if (e.target.id && e.target.tagName == 'TEXTAREA') {
    const c = document.querySelector('[data-for="' + e.target.id + '"]')
    if (c) c.innerHTML = e.target.value
  }
})


