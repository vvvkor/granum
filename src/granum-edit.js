(_ => {

const set = (d, def) => d.querySelectorAll('[contenteditable][data-for]').forEach(n => {
  const area = document.getElementById(n.dataset.for)
  if (area) n.innerHTML = area[def ? 'defaultValue' : 'value']
})

// fill contenteditable from textarea
document.addEventListener('DOMContentLoaded', e => set(document, false))

// reset contenteditable from textarea
document.addEventListener('reset', e => e.defaultPrevented ? null : set(e.target, true))

document.addEventListener('click', e => {
  const a = e.target.closest('a')

  // contenteditable command
  if (a && a.hash && a.dataset.cmd) {
    const n = document.getElementById(a.hash.slice(1))
    if (n) {
      e.preventDefault()
      const arg = ('ask' in a.dataset)
        ? prompt(a.title || a.dataset.cmd, a.dataset.ask)
        : ('arg' in a.dataset ? a.dataset.arg : '')
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