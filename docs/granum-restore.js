/*! granum-restore.js v1.2.42 */

(_ => {

const q = 'form[data-restore] [name]:not([data-unstore]):is([type="text"], [type*="date"], [type="checkbox"], [type="radio"], select, textarea)'
const key = n => 'store:' + (n.form.dataset.restore || '') + ':' + n.name

document.addEventListener('DOMContentLoaded', e => {
  //document.querySelectorAll(q).forEach(n => n.value = localStorage.getItem(key(n)) ?? n.value)
  document.querySelectorAll(q).forEach(n => {
    const v = localStorage.getItem(key(n))
    if (v != null) {
      if (n.type == 'checkbox') n.checked = v
      else if (n.type == 'radio') n.checked = (v === n.value)
      else n.value = v
    }
  })
})

document.addEventListener('input', e => {
  const n = e.target
  if (n.matches(q)) localStorage.setItem(key(n), n.type == 'checkbox' ? (n.checked ? n.value : '') : n.value)
})

})()