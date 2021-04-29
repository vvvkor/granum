  // restore form inputs
  /*
  + run after all plugins if data-get not done
  + oninput in separate common 'input' handler
  + unique form id?
  + input types?
  - multiple inputs
  - editor: evt(input)
  - lookup: restore id and caption
  */
(_ => {

const q = 'form[data-restore] [name]'
//const q = 'form[data-restore] [name]:not([data-unstore]):is([type="text"], [type*="date"], select, textarea)'
//const key = n => 'store:' + (n.form.dataset.restore || '') + ':' + n.name
const key = (f, k) => 'store:' + (f.dataset.restore || '#' + f.id  || '') + ':' + k

const restoreInput = n => {
  const v = localStorage.getItem(key(n.form, n.name))
  if (v == null) return
  if (n instanceof NodeList) n.forEach(j => this.restoreInput(j, v))
  else {
    if (n.type.match(/file|submit|password/) || ('unstore' in n.dataset)) ;
    else if (n.type.match(/checkbox|radio/)) n.checked = Array.isArray(v) ? (v.indexOf(n.value) != -1) : (n.value === v)
    else n.value = v
  }
}

const storeForm = e => {
  const f = e.target.form
  if (!f || !('restore' in f.dataset) || ('unstore' in e.target.dataset)) return
  let d = {}
  /*
  const fd = new FormData(f)
  fd.forEach((v, k) => {
    if (!d.hasOwnProperty(k)) d[k] = v
    else {
      // multiple
      if (!Array.isArray(d[k])) d[k] = [d[k]]
      d[k].push(v)
    }
  })
  */
  document.querySelectorAll(q).forEach(n => {
    if (n.type.match(/file|submit|password/) || ('unstore' in n.dataset)) ;
    //else if (n.type.match(/checkbox|radio/)) n.checked = Array.isArray(v) ? (v.indexOf(n.value) != -1) : (n.value === v)
    //else if (n.type == 'radio') d[n.name] =  n.checked = Array.isArray(v) ? (v.indexOf(n.value) != -1) : (n.value === v)
    else if (n.type == 'checkbox') d[n.name] = n.checked
    else d[n.name] = n.value
  })
  Object.keys(d).forEach(k => console.log(k, d[k]))
  Object.keys(d).forEach(k => localStorage.setItem(key(f, k), d[k]))
}

document.addEventListener('DOMContentLoaded', e => {
  document.querySelectorAll(q).forEach(n => {
    //n.value = localStorage.getItem(key(n)) ?? n.value
    restoreInput(n)
  })

})

//document.addEventListener('input', e => e.target.matches(q) ? localStorage.setItem(key(e.target), e.target.value) : null)
document.addEventListener('input', storeForm)

/*
window.addEventListener('beforeunload', e => {
  document.querySelectorAll('form[data-restore] [name]:not([data-unstore]):is([type="text"], [type*="date"], select, textarea)').forEach(n => {
    localStorage.setItem(key(n), n.value)
  })
})
*/

})()