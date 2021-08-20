/*! granum-dialog.js v1.2.62 */

(_ => {

const i = (t, s, a={}) => {
  const d = document.createElement(t)
  Array.isArray(s) ? d.append(...s) : d.append(s)
  ;(typeof(a) === 'string')
    ? d.className = a
    : Object.entries(a).forEach(a => d.setAttribute(...a))
  return d
}

const dialog = x => {
  const inp = (x.def != null) ? i('input', '', {type: 'text', value: x.def}) : ''
  const no = x.action ? i('button', x.cancel || 'Cancel', 'bg-n') : ''
  const ok = i('button', x.ok || 'OK', 'js-ok')
  if (x.mode) ok.classList.add('bg-' + x.mode)
  const m = i('div',
    i('div', [
      (x.head ? i('h3', x.head, 'mar') : ''),
      i('p', x.title || ''),
      inp,
      i('p', [ok, ' ', no], 'r')
    ], 'pad rad stack'),
    'modal js-modal')

  if (x.action) no.addEventListener('click', e => m.remove())
  
  ok.addEventListener('click', e => {
    m.remove()
    if (!x.action) return
    const value = inp ? inp.value : 1
    const detail = {value, ...x}
    if (document.dispatchEvent(new CustomEvent('granum-confirm', {cancelable: true, detail}))) {
      // default not prevented
      if (typeof x.action === 'string') {
        const u = new URL(x.action, location.href)
        u.searchParams.set(x.param || 'confirm', value)
        location.href = u
      }
      else x.action(detail)
    }
  })
  
  document.body.append(m)
  ;(inp || ok).focus()
  if (inp) inp.setSelectionRange(0, 999)
}

document.addEventListener('click', e => {
  let a = e.target.closest('a.alert, a.confirm')
  if (a) {
    e.preventDefault()
    dialog({ // title, action, def
      ...a.dataset, // param, def, ok, cancel
      node: a,
      action: a.classList.contains('confirm') ? a.href : '', // url | function
      title: a.dataset.caption || a.title || a.textContent,
      mode: (a.className.match(/-[ew]\b/)) ? 'e' : ''
    })
  }
  
  if (e.target.classList.contains('js-modal')) e.target.remove()
})

document.addEventListener('keydown', e => {
  if (e.key == 'Escape') document.querySelectorAll('.js-modal').forEach(n => n.remove())
  else if (e.key == 'Enter'){
    const n = document.querySelector('.js-modal input:focus + p .js-ok')
    if (n) n.click()
  }
})

document.addEventListener('granum-ask', e => dialog(e.detail))

})()
