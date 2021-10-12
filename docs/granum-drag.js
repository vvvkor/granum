/*! granum-drag.js v1.2.83 */

(_ => {
  
  let d = p = null
  
  // avoid implicit pointer capture
  document.querySelectorAll('.drag-item').forEach(n => n.addEventListener('gotpointercapture', e => e.target.releasePointerCapture(e.pointerId)));
  
  // whole item is handler by default
  document.querySelectorAll('.drag-item').forEach(n => n.querySelector('.drag-handle') ? null : n.classList.add('drag-handle'));
  
  document.addEventListener('pointerdown', e => { 
    const h = e.target.closest('.drag-handle')
    const n = h ? h.closest('.drag-item') : null
    if (n) {
      e.preventDefault()
      d = n
      p = n.closest('.drag-container') || document.body
      d.classList.add(...(p.dataset.act || 'act').split(' '))
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
      d.classList.remove(...(p.dataset.act || 'act').split(' '))
      p.classList.add(...(p.dataset.control || 'act').split(' '))
      d.dispatchEvent(new CustomEvent('granum-drag', {cancelable: true, detail: {container: p, items: p.querySelectorAll('.drag-item')}}))
      d = p = null
    }
  })
  
})()