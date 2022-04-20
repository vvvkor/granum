// external usage of granum-dialog using events

// initialize dialog
document.dispatchEvent(new CustomEvent('granum-ask', {detail: {
  title: 'Question',
  param: 'v',
  def: 1,
  action: x => alert(x.value)
}}))

// catch confirmation, optionally prevent default
document.addEventListener('granum-confirm', e => {
  if (e.detail.value === '') e.preventDefault()
  console.log(e)
})



  // restore form inputs
  /*
  - run after all plugins if data-get not done
  - oninput in separate common 'input' handler
  - unique form id?
  - input types?
  - editor: evt(input)
  - lookup: restore id and caption
  */
  document.querySelectorAll('form[data-restore] [name]:not([data-unstore]):is([type="text"], [type*="date"], select, textarea)').forEach(n => {
    n.value = localStorage.getItem('store-' + n.name) ?? n.value
    n.addEventListener('input', e => localStorage.setItem('store-' + e.target.name, e.target.value))
  })
  


window.addEventListener('resize', () => {
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
