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
  const no = x.action ? i('a', x.cancel || 'Cancel', {class: 'pad inv rad bg-n l', href: '#cancel'}) : ''
  const ok = i('a', x.ok || 'OK', {class: 'pad inv rad', href: '#ok'})
  if (x.mode) ok.classList.add('bg-' + x.mode)
  const m = i('div',
    i('div', [
      i('p', x.title || ''),
      inp,
      i('p', [no, ok], inp ? 'r' : '')
    ], 'pad rad' + (inp ? '' : ' c')),
    'modal js-modal')

  if (x.action) no.addEventListener('click', e => {
    e.preventDefault(e)
    m.remove()
  })
  
  ok.addEventListener('click', e => {
    e.preventDefault(e)
    m.remove()
    if (!x.action) return
    const value = inp ? inp.value : 1
    if (typeof x.action === 'string') {
      const u = new URL(x.action, location.href)
      u.searchParams.set(x.param || 'confirm', value)
      location.href = u
    }
    else x.action({value, ...x})
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
      action: a.classList.contains('confirm') ? a.href : '', // url | function
      title: a.dataset.caption || a.title || a.textContent,
      mode: (a.className.match(/-[ew]\b/)) ? 'e' : '',
      ...a.dataset // param, def, ok, cancel
    })
  }
  
  if (e.target.classList.contains('js-modal')) e.target.remove()
})

document.addEventListener('keydown', e => {
  if (e.key == 'Escape') {
    const d = document.querySelector('.js-modal')
    if (d) d.remove()
  }
})

})()