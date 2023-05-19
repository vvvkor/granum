/*! granum-split.js v1.2.123 */

(() => {

let min = 50
let cur = null // splitter
let f = []
const ff = {
  h: ['width', 'minWidth', 'offsetWidth', 'clientWidth', 'movementX'],
  v: ['height', 'minHeight', 'offsetHeight', 'clientHeight', 'movementY'],
}

const mode = (n) => f = ff[n.parentNode.classList.contains('vert') ? 'v' : 'h']
const jam = () => items(cur, true).some(n => n[f[2]] < min)
const items = (n, all) => [...n.parentNode.children].filter(m => !m.matches('.splitter' + (all ? '' : ',:last-child')))

const next = (n, x, back=false) => {
  while (n && (n.matches('.splitter') || (x < 0 && n[f[2]] + x < min))) n = n[back ? 'previousElementSibling' : 'nextElementSibling']
  return n && n.matches('.splitter, :last-child') ? null : n
}

const reset = (p, mem) => {
  items(p, true).forEach(n => setSize(n, null, mem))
  p.dispatchEvent(new Event('granum-split', {bubbles: true}))
}

const store = (n) => {
  if (n.id) {
    const z = n.style[f[0]]
    localStorage[z ? 'setItem' : 'removeItem']('split-' + n.id, z)
  }
}

const restore = () => {
  [...document.querySelectorAll('.split>[id]')].forEach(n => {
    const z = localStorage.getItem('split-' + n.id)
    if (z) setSize(n, z)
  })
}

const init = () => {
  [...document.querySelectorAll('.split>:not(.splitter):not(:last-child)')].forEach((n, i) => {
    if (!n.id && n.parentNode.id) n.id = n.parentNode.id + '-' + i
    const s = document.createElement('div')
    s.classList.add('splitter')
    n.after(s)
  })
  restore()
}

const setSize = (n, z, mem) => {
  mode(n)
  if (z) {
    if (typeof z == 'number') z = Math.floor(z / n.parentNode[f[3]] * 100 * 100) / 100 + '%'
    n.style[f[0]] = n.style[f[1]] = z
    n.style.flex = '0'
  }
  else n.style = {}
  if (mem) store(n)
}

// events

document.addEventListener('dblclick', e => (e.target.closest('.splitter')) ? reset(e.target, true) : null)

document.addEventListener('pointerdown', e => {
  const n = e.target.closest('.splitter')
  if (n) {
    e.preventDefault()
    e.target.releasePointerCapture(e.pointerId) // avoid implicit pointer capture
    min = Number(n.parentNode.dataset.min) || 50
    cur = n
    cur.classList.add('act')
    mode(n)
    items(cur).forEach(m => setSize(m, m[f[2]])) // prepare all
  }
})

document.addEventListener('pointermove', e => {
  if (!cur) return;
  const d = e[f[4]]
  const n = next(cur, d, true)
  if (!n) return
  const m = d != 0 ? next(cur, -d) : null 
  const prev = [n.style[f[0]], m ? m.style[f[0]] : 0];
  const j = jam()
  if (m) setSize(m, m[f[2]] - d)
  setSize(n, n[f[2]] + d)
  if (!j && jam()) { 
    // revert
    setSize(n, prev[0])
    if (m) setSize(m, prev[1])
  }
})

document.addEventListener('pointerup', e => {
  if (cur) {
    e.preventDefault()
    items(cur).forEach(m => setSize(m, m[f[2]], true)) // store all
    cur.classList.remove('act')
    cur.dispatchEvent(new Event('granum-split', {bubbles: true}))
    cur = null
  }
})

document.addEventListener('DOMContentLoaded', init)
  
})()