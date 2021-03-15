/*! granum-gallery.js v1.2.21 */

(_ => {

const go = (a, dir) => {
  const g = (a ? a.closest('.gallery') : null) || document
  const p = [...g.querySelectorAll('a.pic')]
  const i = p.findIndex(m => m == a)
  if (a && dir) {
    a = p[i + dir]
    if (!a) return
  }
  document.querySelectorAll('a.pic').forEach(m => m.classList.remove('modal'))
  if (a) a.classList.add('modal')
}

document.addEventListener('click', e => {
  const a = e.target.closest('a.pic')
  if (a) {
    e.preventDefault()
    n = a.classList.contains('modal')
      ? go(
          (e.clientY < 37 && a.clientWidth - e.clientX < 37) ? null : a,
          e.clientX < a.clientWidth / 3 ? -1 : 1
        )
      : go(a)
  }
}, false)

document.addEventListener('keydown', e => {
  const a = document.querySelector('a.pic.modal')
  if (a) {
    if (e.key == 'Escape') a.classList.remove('modal')
    else if (e.key == 'ArrowLeft') go(a, -1)
    else if (e.key == 'ArrowRight') go(a, 1)
    else if (e.key == 'Tab') location.href = a.href
  }
})

})()