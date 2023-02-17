(() => {

const edge = 50
const wmin = 100
  
let curNode = null // splitter
let curWidth = 0 // splitter's parent
let start = 0 // coord

const isPressing = () => [...document.querySelectorAll('.split>:not(.splitter)')].some(n => n.offsetWidth < wmin)

const releaseNext = (n, x) => {
  //const big = [...n.parentNode.querySelectorAll('.split>:not(.splitter):not(:last-child)')].filter(m => m != n.previousElementSibling).map(m => [m, m.offsetWidth]).sort((a, b) => b[1] - a[1])[0][0]
  const m = n.nextElementSibling
  if (x > 0 && m && m.nextElementSibling) {
    const w = m.offsetWidth - x // Math.abs(x)
    if (w > wmin) {
      setWidth(m, w, true)
      return true
    }
  }
}

const resetSplitters = (store) => {
  document.querySelectorAll('.split>:not(.splitter)').forEach(n => setWidth(n, null, store))
}

const storeSplitter = (d) => {
  if (d.id) localStorage[d.style.width ? 'setItem' : 'removeItem']('split-' + d.id, d.style.width)
}

const restoreSplitters = () => {
  [...document.querySelectorAll('.split>[id]')].reverse().forEach(n => {
    const w = localStorage.getItem('split-' + n.id)
    if (w) setWidth(n, w)
  })
}

const initSplitters = () => {
  [...document.querySelectorAll('.split>:not(.splitter):not(:last-child)')].reverse().forEach(n => {
    const s = document.createElement('div')
    s.classList.add('splitter')
    n.after(s)
  })
  restoreSplitters()
}

const setWidth = (n, w, store) => {
  if (w) {
    n.style.width = n.style.minWidth = ('' + w).replace(/[a-z%]/gi, '') + 'px'
    n.style.flex = '0'
  }
  else n.style = {}
  if (store) storeSplitter(n)
}

// events

document.addEventListener('dblclick', e => {
  if (e.target.closest('.splitter')) {
    resetSplitters(true)
    e.target.dispatchEvent(new Event('granum-split', {bubbles: true}))
  }
})

document.addEventListener('pointerdown', e => {
  const n = e.target.closest('.splitter')
  if (n) {
    e.preventDefault()
    e.target.releasePointerCapture(e.pointerId) // avoid implicit pointer capture
    curNode = n
    start = e.clientX
    curWidth = curNode.previousElementSibling.offsetWidth
    curNode.classList.add('act')
  }
})

document.addEventListener('pointermove', e => {
  if (!curNode) return;
  const x = e.clientX - start // e.movementX
  //if ((e.screenX < edge && x < 0) || (e.screenX > window.innerWidth - edge && x > 0)) return; // screen edges
  const ww = curWidth + x
  //if (ww < wmin) return
  const p = curNode.previousElementSibling
  const pp = p.parentNode
  const min = edge
  const max = Math.min(pp.offsetWidth, window.innerWidth) - edge
  if ((ww < min && x < 0) || (ww > max && x > 0)) return; // container edges
  const prev = p.style.width;
  [...pp.children].forEach(n => n.classList.contains('splitter') ? null : setWidth(n, n.nextElementSibling ? n.offsetWidth : null)) // prepare all in container
  const w = isPressing()
  setWidth(p, ww)
  if (!w && isPressing()) {
    const shift = releaseNext(curNode, e.movementX)
    if (!shift || isPressing()) setWidth(p, prev) // revert
  }
})

document.addEventListener('pointerup', e => {
  if (curNode) {
    storeSplitter(curNode.previousElementSibling)
    e.preventDefault()
    curNode.classList.remove('act')
    curNode.dispatchEvent(new Event('granum-split', {bubbles: true}))
    curNode = null
  }
})

document.addEventListener('DOMContentLoaded', initSplitters)
  
})()