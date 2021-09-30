/*! granum-gallery.js v1.2.79 */

(_ => {

const keys = {Escape: 7, Tab: 9, ArrowLeft: -1, ArrowRight: 1}

const x = _ => document.querySelectorAll('a.pic').forEach(m => m.classList.remove('modal'))

const go = (a, dir) => {
  if (dir == 7) return x()
  if (dir == 9) return location.href = a.href
  const p = [...(a.closest('.gallery') || document).querySelectorAll('a.pic')]
  const i = p.findIndex(m => m == a)
  if (dir) {
    a = p[i + dir]
    if (!a) return
  }
  x()
  a.classList.add('modal')
  a.style.background = '#000 url("' + a.href + '") no-repeat 50% 50% / contain'
  const f = i + ((2 * dir) || 1)
  a.firstElementChild.style.background = p[f] ? '#000 url("' + p[f].href + '") no-repeat 50% 50% / contain' : '' // preload
}

document.addEventListener('click', e => {
  const a = e.target.closest('a.pic')
  if (a) {
    e.preventDefault()
    n = a.classList.contains('modal')
      ? go(a, (e.clientY < 50 && a.clientWidth - e.clientX < 50)
            ? 7
            : (e.clientX < a.clientWidth / 2 ? -1 : 1))
      : go(a)
  }
})

document.addEventListener('keydown', e => {
  const a = document.querySelector('a.pic.modal')
  if (a && e.key in keys) go(a, keys[e.key])
})

})()