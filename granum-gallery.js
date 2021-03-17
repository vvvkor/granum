/*! granum-gallery.js v1.2.23 */

(_ => {

const k = {Escape: 7, Tab: 9, ArrowLeft: -1, ArrowRight: 1}

const esc = _ => document.querySelectorAll('a.pic').forEach(m => m.classList.remove('modal'))

const go = (a, dir) => {
  if (dir == 7) return esc()
  if (dir == 9) return location.href = a.href
  const p = [...(a.closest('.gallery') || document).querySelectorAll('a.pic')]
  const i = p.findIndex(m => m == a)
  if (dir) {
    a = p[i + dir]
    if (!a) return
  }
  esc()
  a.classList.add('modal')
  a.style.background = '#000 url("' + a.href + '") no-repeat 50% 50% / contain'
  const x = i + ((2 * dir) || 1)
  a.firstElementChild.style.background = p[x] ? '#000 url("' + p[x].href + '") no-repeat 50% 50% / contain' : '' // preload
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
}, false)

document.addEventListener('keydown', e => {
  const a = document.querySelector('a.pic.modal')
  if (a && e.key in k) go(a, k[e.key])
})

})()