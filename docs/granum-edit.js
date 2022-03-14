/*! granum-edit.js v1.2.98 */

(_ => {

const set = (d, def) => d.querySelectorAll('[contenteditable][data-for]').forEach(n => {
  const area = document.getElementById(n.dataset.for)
  if (area) n.innerHTML = area[def ? 'defaultValue' : 'value']
})
const i = (t, s, a={}) => {
  const d = document.createElement(t)
  Array.isArray(s) ? d.append(...s) : (s.nodeType ? d.append(s) : d.innerHTML = s)
  ;(typeof(a) === 'string')
    ? d.className = a
    : Object.entries(a).forEach(a => d.setAttribute(...a))
  return d
}
const x = (n, w) => {
  n.classList.toggle('hide', w)
  n.nextSibling.classList.toggle('hide', !w)
  n.previousSibling.querySelectorAll('li+li').forEach(a => a.classList.toggle('hide', !w))
}

const b = [ // label, cmd, arg, ask
  ['/', 'source'],
  ['<b>B</b>', 'bold'],
  ['<i>I</i>', 'italic'],
  ['<s>S</s>', 'strikeThrough'],
  ['_', 'removeFormat'],
  ['&hearts;', 'insertImage', '', 'https://'], // &starf;
  ['&nearr;', 'createLink', '', 'https://'], // &nearr; | &curarr;
  ['&times;', 'unlink'],
  ['h1', 'formatBlock', '<h1>'],
  ['h2', 'formatBlock', '<h2>'],
  ['h3', 'formatBlock', '<h3>'],
  ['&sect;', 'formatBlock', '<p>'],
  ['&bull;', 'insertUnorderedList'],
  //
  ['{}', 'insertHTML', '<code>*</code>'],
  ['&lt;', 'justifyLeft'],
  ['=', 'justifyCenter'],
  ['&gt;', 'justifyRight'],
  ['1.', 'insertOrderedList'],
  ['&raquo;', 'indent'],
  ['&laquo;', 'outdent'],
  ['D', 'formatBlock', '<div>'],
  ['[]', 'formatBlock', '<pre>'],
  ['&#8220;', 'formatBlock', '<blockquote>'],
  // ['&crarr;', 'insertHTML', 'Line break', '<br>'],
  ['&minus;', 'insertHorizontalRule']
]

document.addEventListener('DOMContentLoaded', e => {
  // build interface
  document.querySelectorAll('textarea.editor').forEach(n => {
    const id = n.id + '-editor'
    const d = i('ul', b.slice(0, n.classList.contains('l') ? 100 : 13).map((c, k) => i('li', i('a', c[0], {href: '#' + id, 'data-cmd': c[1], title: c[1] + ' ' + (c[2] || '').replace(/>.*$/, '>'), 'data-arg': (c[2] || ''), 'data-ask': c[3] || ''}), k ? 'hide' : '')), 'bg row hover')
    n.parentNode.insertBefore(d, n)
    n.parentNode.insertBefore(i('div', '', {class: 'hide bord pad back', contenteditable: '', id, 'data-for': n.id}), n.nextSibling)
    // n.classList.add('bg', 'mono')
    if (n.classList.contains('act')) x(n, true)
  })
  // fill contenteditable from textarea
  set(document, false)
})

// reset contenteditable from textarea
document.addEventListener('reset', e => e.defaultPrevented ? null : set(e.target, true))

document.addEventListener('click', e => {
  const a = e.target.closest('a[data-cmd]')

  // contenteditable command
  const n = a ? document.getElementById(a.hash.slice(1)) : null
  if (n) {
    e.preventDefault()
    if (a.dataset.cmd == 'source') x(n.previousSibling, n.classList.contains('hide'))
    else {
      const arg = a.dataset.ask
        ? prompt(a.title || a.dataset.cmd, a.dataset.ask)
        : (a.dataset.arg
          ? a.dataset.arg.replace('*', getSelection().toString())
          : '')
      if (arg != null) {
        n.focus()
        document.execCommand(a.dataset.cmd, false, arg)
      }
    }
  }
})

document.addEventListener('input', e => {
  // update textarea
  if (e.target.dataset.for) {
    const area = document.getElementById(e.target.dataset.for)
    if (area) area.value = e.target.innerHTML
    area.dispatchEvent(new CustomEvent('input', {bubbles: true, detail: 1}))
  }
  
  // update contenteditable
  if (e.target.id && e.target.tagName == 'TEXTAREA' && !e.detail) {
    const c = document.querySelector('[data-for="' + e.target.id + '"]')
    if (c) c.innerHTML = e.target.value
  }
})

})()