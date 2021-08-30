/*! granum-restore.js v1.2.70 */

(_ => {

const q = 'form[data-restore] [name]:not([data-unstore])'
const key = n => 'store:' + (n.form.dataset.restore || '') + ':' + n.name + (n.type == 'checkbox' ? ':' + n.value : '')

document.addEventListener('DOMContentLoaded', e => {

  // init form inputs
  document.querySelectorAll('form[data-get]').forEach(n => {
    n.querySelectorAll('[name]').forEach(m => ('get' in m.dataset) ? null : m.dataset.get = m.name)
  })
  
  // init input values
  document.querySelectorAll('[name][data-get], ' + q).forEach(n => n.dispatchEvent(new Event('granum-get', {bubbles: true})))
})

document.addEventListener('reset', e => {
  const b = e.target.querySelector('[type="reset"]')
  if(!b || !b.classList.contains('dialog') || confirm(b.title || 'Reset?')) e.target.querySelectorAll(q).forEach(n => localStorage.removeItem(key(n)))
  else e.preventDefault()
})

document.addEventListener('input', e => {
  const n = e.target
  if (n.matches(q) && !n.type.match(/password|file|submit|image/) && (n.type != 'radio' || n.checked)){
    localStorage.setItem(key(n), n.type == 'checkbox' ? (n.checked ? 1 : '') : (n.dataset.cap != null ? n.dataset.cap : n.value))
  }
})

document.addEventListener('granum-get', e => {
  const n = e.target
  const nm = n.dataset.get || n.name
  const p = (new URL(location)).searchParams
  if (p.has(nm)) {
    if (n.type == 'checkbox') n.checked = p.getAll(nm).includes(n.value)
    else if (n.type == 'radio') n.checked = (p.get(nm) === n.value)
    else n.value = p.get(nm)
  }
  else if (n.matches(q)) {
    const v = localStorage.getItem(key(n))
    if (v != null) {
      if (n.type == 'checkbox') n.checked = v
      else if (n.type == 'radio') n.checked = (v === n.value)
      else n.value = v
    }
  }
})

})()