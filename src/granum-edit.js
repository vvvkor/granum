(_ => {

const b = [ // label, cmd, title, arg, ask
  ['<b>B</b>', 'bold', 'Bold'],
  ['<i>I</i>', 'italic', 'Italic'],
  ['<s>S</s>', 'strikeThrough', 'Strike through'],
  ['_', 'removeformat', 'Remove Format'],
  ['&hearts;', 'insertimage', 'Image', '', 'https://'], // &starf;
  ['&nearr;', 'createlink', 'Link', '', 'https://'], // &nearr; | &curarr;
  ['&times;', 'unlink', 'Unlink'],
  ['h1', 'formatblock', 'Head 1', '<h1>'],
  ['h2', 'formatblock', 'Head 2', '<h2>'],
  ['h3', 'formatblock', 'Head 3', '<h3>'],
  ['&sect;', 'formatblock', 'Paragraph', '<p>'],
  ['&bull;', 'insertUnorderedList', 'List'],
  //
  ['{}', 'insertHTML', 'Code', '<code>*</code>'],
  ['&lt;', 'justifyLeft', 'Justify left'],
  ['=', 'justifyCenter', 'Justify center'],
  ['&gt;', 'justifyRight', 'Justify right'],
  ['1.', 'insertOrderedList', 'Ordered list'],
  ['&raquo;', 'indent', 'Increase indent'],
  ['&laquo;', 'outdent', 'Decrease indent'],
  ['D', 'formatblock', 'Div', '<div>'],
  ['[]', 'formatblock', 'Preformatted', '<pre>'],
  ['&#8220;', 'formatblock', 'Block quote', '<blockquote>'],
  // ['&crarr;', 'insertHTML', 'Line break', '<br>'],
  ['&minus;', 'inserthorizontalrule', 'Horizontal ruler']
]

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

document.addEventListener('DOMContentLoaded', e => {
  // build interface
  document.querySelectorAll('textarea.editor').forEach(n => {
    const id = n.id + '-editor'
    const d = i('ul', [
      i('li', i('a', '/', {href: '#' + n.id, class: 'toggle', title: 'HTML source'})),
      ...b.slice(0, n.classList.contains('l') ? 100 : 12).map(c => i('li', i('a', c[0], {href: '#' + id, 'data-cmd': c[1], title: c[2] || c[1], 'data-arg': c[3] || '', 'data-ask': c[4] || ''})))
    ], 'bg row hover')
    n.parentNode.insertBefore(d, n)
    n.parentNode.insertBefore(i('div', '', {class: 'bord pad back', contenteditable: '', id, 'data-for': n.id}), n.nextSibling)
    n.classList.add('target', 'bg', 'mono')
  })
  // fill contenteditable from textarea
  set(document, false)
})

// reset contenteditable from textarea
document.addEventListener('reset', e => e.defaultPrevented ? null : set(e.target, true))

document.addEventListener('click', e => {
  const a = e.target.closest('a')

  // contenteditable command
  if (a && a.hash && a.dataset.cmd) {
    const n = document.getElementById(a.hash.slice(1))
    if (n) {
      e.preventDefault()
      const arg = a.dataset.ask // ('ask' in a.dataset)
        ? prompt(a.title || a.dataset.cmd, a.dataset.ask)
        : (a.dataset.arg // 'arg' in a.dataset
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