(_ => {

let t = null

const ev = (n, e) => n.dispatchEvent(new Event(e, {bubbles: true}))
const x = _ => document.querySelectorAll('.lookup + div').forEach(m => m.style.display = '')
const s = (n, l, v, c) => {
  n.value = v
  l.value = l.dataset.cap = c
  ev(n, 'input')
  ev(n, 'change')
}

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
    const p = l.nextSibling
    const n = p.parentNode.previousSibling
    p.style.display = ''
    t = setTimeout(_ => {
      x()
      if (l.value === '') s(n, l, '', '')
      else {
        const u = n.dataset.lookup.split('#')
        const v = l.value
        fetch(u[0].replace(/\{q\}/, encodeURIComponent(l.value)))
          .then(r => r.ok ? r.json() : [])
          .then(j => {
            if (l.value === v) {
              p.innerHTML = j.slice(0, 5).map((d, i) => '<div class="pad hover' + (i ? '' : ' bg') + '" data-lookid="' + d[u[1] || 'id'] + '"><div>' + (d[u[2] || 'name']) + '</div>' + (d[u[3] || 'info'] ? '<div class="small text-n">' + d[u[3] || 'info'] + '</div>' : '') + '</div>').join('')
              p.style.display = 'block'
            }
          })
      }
    }, 300)
  }
})

document.addEventListener('click', e => {
  const a = e.target.closest('[data-lookid]')
  if (a) {
    clearTimeout(t)
    const l = a.parentNode.previousSibling
    s(l.parentNode.previousSibling, l, a.dataset.lookid, a.firstChild.textContent)
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
      if (!p.style.display) ev(l, 'input')
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
        ev(a, 'click')
      }
    }
  }
})

})()