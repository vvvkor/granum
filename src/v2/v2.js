document.addEventListener('DOMContentLoaded', e => {
  // restore inputs
  document.querySelectorAll('.mem[id]').forEach(n => {
    const v = localStorage.getItem('val-' + n.id)
    if (v == null) return
    if (['checkbox', 'radio'].includes(n.type)) n.checked = (v == n.value)
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

document.addEventListener('click', ({target: n}) => {
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
})

document.addEventListener('input', ({target: n}) => {
  // store inputs
  if (n.id && n.classList.contains('mem')) {
    if (n.type == 'radio') (n.closest('form') || document).querySelectorAll(`[type="radio"][name="${n.name}"][id]`).forEach(m => localStorage.removeItem('val-' + m.id))
    localStorage.setItem('val-' + n.id, (['checkbox', 'radio'].includes(n.type) && !n.checked) ? '' : n.value)
  }
})

document.addEventListener('keydown', e => {
  // close modals and popups
  if (e.key == 'Escape') {
    location.hash = '#escape'
    document.querySelectorAll('details.pop').forEach(n => n.removeAttribute('open'))
    document.querySelectorAll('.pop>.check>:checked').forEach(n => n.checked = false)
  }
})

document.addEventListener('blur', ({target: n}) => {
  if (n.form) n.form.querySelectorAll(`[name="${n.name}"]`).forEach(m => m.classList.remove('fresh')) // validate radio
  else n.classList.remove('fresh') // validate field
}, true)
