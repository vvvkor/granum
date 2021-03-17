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