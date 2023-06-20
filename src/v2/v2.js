document.addEventListener('DOMContentLoaded', e => {
  document.body.classList.add('js')
  
  // restore inputs/details
  document.querySelectorAll('.mem[id]').forEach(n => {
    const v = localStorage.getItem('val-' + n.id)
    if (v == null) return
    if (['checkbox', 'radio'].includes(n.type)) n.checked = (v == n.value)
    else if (n.matches('details')) n.open = !!v
    else n.value = v
  })
  // use URL params
  const u = new URL(location.href)
  document.querySelectorAll('[data-get]:not(form), form[data-get] [name]').forEach(n => {
    const v = u.searchParams.getAll(n.dataset.get || n.name)
    if (v.length < 1) return
    if (['checkbox', 'radio'].includes(n.type)) n.checked = v.includes(n.value)
    else if (n.matches('input,textarea,select')) n.value = v.join(', ')
    else n.textContent = v.join(', ')
  })
  // remove title on [data-hint]
  document.querySelectorAll('[data-hint]').forEach(n => n.removeAttribute('title'))
  // fresh inputs
  document.querySelectorAll('[name]').forEach(n => n.classList.add('fresh'))
})

const act = (n, k, f) => (n.dataset.parent ? n.closest(n.dataset.parent) : document).querySelectorAll(n.dataset[k]).forEach(m => f(m))

document.addEventListener('click', e => {
  const n = e.target
  // check all boxes
  if (n.dataset.check) act(n, 'check', m => m.checked = n.checked)
  // toggle classes
  else if (n.dataset.nodes) {
    if (n.type == 'checkbox') act(n, 'nodes', m => m.classList[n.checked != ('reverse' in n.dataset) ? 'add' : 'remove'](...n.value.split(/\s+/)))
    else if (n.type == 'radio') act(n, 'nodes', m => m.className = n.value)
  }
  // show native modal
  else if (n.dataset.modal) document.querySelector(n.dataset.modal).showModal()
  // validate form
  else if (n.form && n.matches('button, [type="submit"]')) n.form.querySelectorAll('[name]').forEach(n => n.classList.remove('fresh'))
  //go back
  else if (n.hash == '#back') {
    history.go(-1)
    e.preventDefault()
  }
  // prev/next
  else if (location.hash && ['#prev', '#next'].includes(n.hash)) {
    e.preventDefault()
    const id = document.querySelector(location.hash)?.dataset[n.hash == '#prev' ? 'prev' : 'next']
    if (id) location.hash = id
  }
})

document.addEventListener('input', ({target: n}) => {
  // store inputs
  if (n.id && n.classList.contains('mem')) {
    if (n.type == 'radio') (n.closest('form') || document).querySelectorAll(`[type="radio"][name="${n.name}"][id]`).forEach(m => localStorage.removeItem('val-' + m.id))
    localStorage.setItem('val-' + n.id, (['checkbox', 'radio'].includes(n.type) && !n.checked) ? '' : n.value)
  }
})

document.addEventListener('toggle', ({target: n}) => {
  // store details
  if (n.matches('details') && n.id && n.classList.contains('mem')) localStorage.setItem('val-' + n.id, n.open ? 1 : '')
}, true)

document.addEventListener('keydown', e => {
  // close modals and popups
  if (e.key == 'Escape') {
    location.hash = '#escape'
    document.querySelectorAll('details.pop').forEach(n => n.removeAttribute('open'))
    document.querySelectorAll('.pop>.check>:checked').forEach(n => n.checked = false)
  }
})

window.addEventListener('hashchange', e => {
  if (location.hash == '#clear') {
    localStorage.clear()
    location.hash = '#cleared'
  }
})

document.addEventListener('blur', ({target: n}) => {
  if (n.form) n.form.querySelectorAll(`[name="${n.name}"]`).forEach(m => m.classList.remove('fresh')) // validate radio
  else n.classList.remove('fresh') // validate field
}, true)

// responsive class
window.addEventListener('resize', () => {
  const b = document.body
  const w = (b.dataset.break || '800,400').split(',')
  w.push(0)
  const m = w.findIndex(x => window.innerWidth >= Number(x))
  if (b._m == null || b._m != m) {
    b._m = m
    document.querySelectorAll('[data-resp]').forEach(n => {
      const c = n.dataset.resp.split(',')
      n.className = (c[m] != null ? c[m] : c.pop()) || ''
    })
  }
})
window.dispatchEvent(new Event('resize'))