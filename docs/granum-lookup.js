/*! granum-lookup.js v1.2.98 */

(_ => {

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
        fetch(u[0].replace(/_Q_/g, encodeURIComponent(l.value)))
          .then(r => r.ok ? r.json() : [])
          .then(j => {
            if (l.value === v) {
              p.innerHTML = (j.data || j).slice(0, n.dataset.limit || 5).map((d, i) => '<div data-cmd class="pad hover' + (i ? '' : ' bg') + '" data-id="' + d[u[1] || 'id'] + '"><div>' + (d[u[2] || 'name']) + '</div>' + (d[u[3] || 'info'] ? '<div class="small text-n">' + d[u[3] || 'info'] + '</div>' : '') + '</div>').join('')
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
    if (a.value) location.href = a.dataset.goto.replace(/_ID_/g, encodeURIComponent(a.value))
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
        p.querySelectorAll('div').forEach(m => m.classList.toggle('bg', m == a))
      }
    }
    else if (e.key == 'Enter') {
      let a = p.querySelector('div.bg')
      if (a) {
        if (p.style.display) {
          e.preventDefault()
          evt(a, 'click')
        }
      }
    }
  }
})

})()