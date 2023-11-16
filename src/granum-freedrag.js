;(() => {
  
  let dragged = null
  let shift = [0, 0]

  document.addEventListener('DOMContentLoaded', e => {
    document.querySelectorAll('.freedrag[id]').forEach(n => {
      const s = localStorage.getItem('dragPos-' + n.id)
      if (s) n.style = s
    })
  })
  
  document.addEventListener('pointerdown', e => {
    const h = e.target.closest('.freedrag .handle')
    if (h) {
      dragged = h ? h.closest('.freedrag') : null
      const r1 = dragged.getBoundingClientRect()
      const r2 = h.getBoundingClientRect()
      shift = [r2.left - r1.left + e.offsetX, r2.top - r1.top + e.offsetY]
      console.log(shift)
    }
  })

  document.addEventListener('pointerup', e => dragged = null)

  document.addEventListener('pointermove', e => {
    if (dragged) {
      const rect = e.target.getBoundingClientRect();
      const x = e.offsetX + rect.left - shift[0]
      const y = e.offsetY + rect.top - shift[1] 
      const px = (x / window.innerWidth) * 100
      const py = (y / window.innerHeight) * 100
      //dragged.style = `left:${x}px;top:${y}px;`
      //dragged.style = `left:calc(${px}% - ${shift[0]}px);top:calc(${py}% - ${shift[1]}px);`
      dragged.style = `position:fixed;inset:${py}% auto auto ${px}%;`
      if (dragged.id) localStorage.setItem('dragPos-' + dragged.id, dragged.style.cssText)
    }
  })
  
  document.addEventListener('dblclick', e => {
    const h = e.target.closest('.freedrag .handle')
    if (h) {
      const d = h.closest('.freedrag')
      d.style = ''
      if (d.id) localStorage.removeItem('dragPos-' + d.id)
    }
  })
  
})()