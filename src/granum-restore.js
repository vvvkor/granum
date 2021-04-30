(_ => {

const q = 'form[data-restore] [name]:not([data-unstore])'
const key = n => 'store:' + (n.form.dataset.restore || '') + ':' + n.name + (n.type == 'checkbox' ? ':' + n.value : '')

document.addEventListener('DOMContentLoaded', e => {
  // document.querySelectorAll(q).forEach(n => n.value = localStorage.getItem(key(n)) ?? n.value)
  document.querySelectorAll(q).forEach(n => {
    const v = localStorage.getItem(key(n))
    if (v != null) {
      if (n.type == 'checkbox') n.checked = v
      else if (n.type == 'radio') n.checked = (v === n.value)
      else n.value = n.dataset.cap = v
    }
  })
})

document.addEventListener('input', e => {
  const f = e.target.form
  if(f) f.querySelectorAll(q).forEach(n => {
    if (!n.type.match(/password|file|submit|image/) && (n.type != 'radio' || n.checked)){
      localStorage.setItem(key(n), n.type == 'checkbox' ? (n.checked ? 1 : '') : n.value)
    }
  })
})

})()