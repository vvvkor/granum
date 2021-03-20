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

const addMonth = (d, x) => {
  const t = new Date(d.getTime())
  t.setDate(1)
  t.setMonth(d.getMonth() + x)
  t.setDate(Math.min(d.getDate(), dim(t)))
  return t
}

/*
calendar todo (optional)
- close btn
- format: Y-m-d, d.m.Y
- hilite today
*/
