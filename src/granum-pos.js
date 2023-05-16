(() => {

const pos = n => {
  n.style.transform = '';
  const b = n.getBoundingClientRect()
  const d = document.documentElement
  const cmp = [
    [b.left, 0, -b.left, 0],
    [b.top, 0, -b.top, 1],
    [d.clientWidth, b.right, d.clientWidth - b.right, 0],
    [d.clientHeight, b.bottom, d.clientHeight - b.bottom, 1],
  ]
  const t = [0, 0]
  cmp.filter(z => z[0] < z[1]).forEach(z => t[z[3]] = z[2])
  n.style.transform = 'translate(' + t.map(z => '' + z + 'px').join(',') + ')'
}

document.addEventListener('mouseenter', e => {
  const pop = e.target.matches && e.target.matches('.pop')
  if (pop) pos(e.target.lastElementChild)
}, true)

})()