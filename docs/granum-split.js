/*! granum-split.js v1.2.110 */

(() => {

let wmin = 50
let cur = null // splitter

const jam = () => items(cur, true).some(n => n.offsetWidth < wmin)

const items = (p, all) => [...p.parentNode.children].filter(n => !n.matches('.splitter' + (all ? '' : ',:last-child')))

const next = (n, x, back=false) => {
  while (n && (n.matches('.splitter') || (x < 0 && n.offsetWidth + x < wmin))) n = n[back ? 'previousElementSibling' : 'nextElementSibling']
  return n && n.matches('.splitter, :last-child') ? null : n
}

const resetSplitters = (store, p) => {
  items(p, true).forEach(n => setWidth(n, null, store))
  p.dispatchEvent(new Event('granum-split', {bubbles: true}))
}

const storeSplitter = (d) => {
  if (d.id) localStorage[d.style.width ? 'setItem' : 'removeItem']('split-' + d.id, d.style.width)
}

const restoreSplitters = () => {
  [...document.querySelectorAll('.split>[id]')].forEach(n => {
    const w = localStorage.getItem('split-' + n.id)
    if (w) setWidth(n, w)
  })
}

const initSplitters = () => {
  [...document.querySelectorAll('.split>:not(.splitter):not(:last-child)')].forEach((n, i) => {
    if (!n.id && n.parentNode.id) n.id = n.parentNode.id + '-' + i
    const s = document.createElement('div')
    s.classList.add('splitter')
    n.after(s)
  })
  restoreSplitters()
}

const setWidth = (n, w, store) => {
  if (w) {
    if (typeof w == 'number') w = Math.floor(w / n.parentNode.clientWidth * 100 * 100) / 100 + '%'
    n.style.width = n.style.minWidth = w
    n.style.flex = '0'
  }
  else n.style = {}
  if (store) storeSplitter(n)
}

// events

document.addEventListener('dblclick', e => (e.target.closest('.splitter')) ? resetSplitters(true, e.target) : null)

document.addEventListener('pointerdown', e => {
  const n = e.target.closest('.splitter')
  if (n) {
    e.preventDefault()
    e.target.releasePointerCapture(e.pointerId) // avoid implicit pointer capture
    wmin = Number(n.parentNode.dataset.wmin) || 50
    cur = n
    cur.classList.add('act');
    items(cur).forEach(m => setWidth(m, m.offsetWidth)) // prepare all
  }
})

document.addEventListener('pointermove', e => {
  if (!cur) return;
  const p = cur.parentNode
  const dx = e.movementX
  const n = next(cur, dx, true)
  if (!n) return
  const m = dx > 0 ? next(cur, -dx) : null 
  const prev = [n.style.width, m ? m.style.width : 0];
  const j = jam()
  if (m) setWidth(m, m.offsetWidth - dx)
  setWidth(n, n.offsetWidth + dx)
  if (!j && jam()) { 
    // revert
    setWidth(n, prev[0])
    if (m) setWidth(m, prev[1])
  }
})

document.addEventListener('pointerup', e => {
  if (cur) {
    e.preventDefault()
    items(cur).forEach(m => setWidth(m, m.offsetWidth, true)) // store all
    cur.classList.remove('act')
    cur.dispatchEvent(new Event('granum-split', {bubbles: true}))
    cur = null
  }
})

document.addEventListener('DOMContentLoaded', initSplitters)
  
})()