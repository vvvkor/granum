window.addEventListener('resize', e => {
  const w = window.innerWidth
  if (document.body._w == null || document.body._w != w) {
    document.body._w = w
    document.querySelectorAll('[data-mobile], [data-desktop]')
      .forEach(n => {
        const m = (w < (n.dataset.break || document.body.dataset.break || 900))
        if (n._m == null || n._m != m) {
          n._m = m
          n.className = n.dataset[m ? 'mobile' : 'desktop'] || ''
        }
      })
  }
})