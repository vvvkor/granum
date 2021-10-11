// todo: emit event, nested, different heights, docs, build
(_ => {
  let d = p = items = null//, dx = 0, dy = 0
  document.addEventListener('pointerdown', e => { 
    const h = e.target.closest('.drag-handle')
    const n = h ? e.target.closest('.drag-item') : null
    if (n && h) {
      e.preventDefault()
      d = n
      p = e.target.closest('.drag-container') || document
      //dx = e.pageX
      //dy = e.pageY
      d.classList.add(...(p.dataset.act || 'act').split(' '))
      //d.style.pointerEvents = 'none'
      //console.log({start: {id: d.id, dx, dy}})
      // save list of items in container
      items = [...p.querySelectorAll('.drag-item')]
    }
  })
  /*
  document.addEventListener('pointermove', e => { 
    if (d) {
      e.preventDefault()
      const x = e.pageX - dx
      const y = e.pageY - dy
      //d.style.position = 'absolute'
      //d.style.transform = `translate(${x}px, ${y}px)`
      //console.log({move: {x, y}})
    }
  })
  */
  document.addEventListener('pointerover', e => {
    const n = e.target.closest('.drag-item')
    if (d && n && n != d && p.contains(n) && !d.contains(n)) {
      const db = d.getBoundingClientRect()
      const nb = n.getBoundingClientRect()
      const up = (nb.top < db.top) // compare index in saved container
      /*
      const di = items.findIndex(x => x == d)
      const ni = items.findIndex(x => x == n)
      const up = ni < di // compare index in saved container
      */
      //dx = e.pageX
      //dy = e.pageY
      //d.style.transform = ''
      n.parentNode.insertBefore(d, up ? n : n.nextSibling)
    }
  })
  document.addEventListener('pointerup', e => { 
    if (d) {
      e.preventDefault()
      //console.log({end: d.id})
      d.classList.remove(...(p.dataset.act || 'act').split(' '))
      //d.style.transform = ''
      //d.style.position = ''
      d.style.pointerEvents = ''
      d = p = items = null
      //dx = dy = 0
    }
  })
})()