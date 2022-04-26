/*! granum-drag.js v1.2.102 */

(() => {
  
  let d = null, p = null

  const c = n => n.closest('.drag-container') || n.closest('[data-drag], [data-dragged]') || n.closest('fieldset, form, section') || n.closest('ul, table') || document.body
  
  document.addEventListener('pointerdown', e => { 
    const n = e.target.closest('.drag-item')
    if (n) {
      const q = 'drag-handle'
      const h = e.target.closest('.' + q)
      const hh = n.querySelector('.' + q)
      if (!hh || hh == h) {
        if (!hh) n.classList.add(q)
        e.preventDefault()
        e.target.releasePointerCapture(e.pointerId) // avoid implicit pointer capture
        d = n
        p = c(n)
        delete d.dataset.ordered
        d.classList.add(...(p.dataset.drag || 'act bg-w').split(' '))
      }
    }
  })
  
  // document.addEventListener('pointermove', e => d.style.transform = `translate(${x}px, ${y}px)`)
  
  document.addEventListener('pointerover', e => {
    const n = e.target.closest('.drag-item')
    if (d && n && n != d && p.contains(n) && !d.contains(n)) {
      d.dataset.ordered = 1
      const items = [...p.querySelectorAll('.drag-item')]
      n.parentNode.insertBefore(d, (items.indexOf(n) < items.indexOf(d)) ? n : n.nextSibling)
    }
  })
  
  document.addEventListener('pointerup', e => { 
    if (d) {
      e.preventDefault()
      d.classList.remove(...(p.dataset.drag || 'act bg-w').split(' '))
      if (d.dataset.ordered) {
        p.classList.add(...(p.dataset.dragged || 'act').split(' '))
        p.querySelectorAll('.drag-control').forEach(n => n.classList.remove('hide'))
        document.dispatchEvent(new CustomEvent('granum-drag', {cancelable: true, detail: {container: p, item:d, items: p.querySelectorAll('.drag-item')}}))
      }
      d = p = null
    }
  })
  
})()