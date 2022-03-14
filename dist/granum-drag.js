/*! granum-drag.js v1.2.98 */

(_ => {
  
  let d = p = null
  
  document.querySelectorAll('.drag-item').forEach(n => {
    // avoid implicit pointer capture
    // n.addEventListener('gotpointercapture', e => e.target.releasePointerCapture(e.pointerId))
    // whole item is handler by default
    if(!n.querySelector('.drag-handle')) n.classList.add('drag-handle')
    // find container
    let c = n.closest('.drag-container')
    if (!c) {
      c = n.closest('[data-drag], [data-dragged]') || n.closest('fieldset, form, section') || n.closest('ul, table')
      if (c) c.classList.add('drag-container')
    }
  })
  
  document.addEventListener('pointerdown', e => { 
    const h = e.target.closest('.drag-handle')
    const n = h ? h.closest('.drag-item') : null
    if (n) {
      e.preventDefault()
      e.target.releasePointerCapture(e.pointerId) // avoid implicit pointer capture
      d = n
      p = n.closest('.drag-container') || document.body
      d.classList.add(...(p.dataset.drag || 'act bg-w').split(' '))
    }
  })
  
  // document.addEventListener('pointermove', e => d.style.transform = `translate(${x}px, ${y}px)`)
  
  document.addEventListener('pointerover', e => {
    const n = e.target.closest('.drag-item')
    if (d && n && n != d && p.contains(n) && !d.contains(n)) {
      items = [...p.querySelectorAll('.drag-item')]
      n.parentNode.insertBefore(d, (items.indexOf(n) < items.indexOf(d)) ? n : n.nextSibling)
    }
  })
  
  document.addEventListener('pointerup', e => { 
    if (d) {
      e.preventDefault()
      d.classList.remove(...(p.dataset.drag || 'act bg-w').split(' '))
      p.classList.add(...(p.dataset.dragged || 'act').split(' '))
      p.querySelectorAll('.drag-control').forEach(n => n.classList.remove('hide'))
      document.dispatchEvent(new CustomEvent('granum-drag', {cancelable: true, detail: {container: p, item:d, items: p.querySelectorAll('.drag-item')}}))
      d = p = null
    }
  })
  
})()