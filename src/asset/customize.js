(() => {

const defaults = {
  radius: .3,
}

let def = {}

const updateOutput = () => {
  const a = document.querySelector('#vars')
  if (vars) {
    const t = []
    document.querySelectorAll('.var').forEach(m => {
      t.push(`--${m.name}: ${m.value}${m.dataset.unit ||''};`)
    })
    a.value = ':root {\n  ' + t.join('\n  ') + '\n}'
  }
}

const setStyle = n => {
  document.documentElement.style.setProperty('--' + n.name, n.value + (n.dataset.unit || ''))
}

const init = () => {console.log('init')
  document.documentElement.style = ''
  def = {...defaults}
  
  // root-font-size[.8..2], gap[0..2], radius[0..1], line, hilite, front, back, link, input-on, line-input
  const d = document.documentElement
  const g = getComputedStyle(d)
  const s = d.style
  
  //console.log(g.getPropertyValue('--front'))
  //s.setProperty('--front', '#c00')
  document.querySelectorAll('.var').forEach(m => {
    const s = localStorage.getItem('val-' + m.id)
    let v = (m.name in def) ? def[m.name] : g.getPropertyValue('--' + m.name)
    if (m.dataset.unit) v = parseFloat(v)
    else if (v.match(/^#\w{3}$/)) v = '#' + v.at(1) + v.at(1) + v.at(2) + v.at(2) + v.at(3) + v.at(3) // color
    if (!(m.name in def)) def[m.name] = v
    if (s == null) m.value = v
    //console.log(m.name, v)
    //m.dispatchEvent(new Event('input', {bubbles: true}))
    setStyle(m)
  })
  updateOutput()
}

document.addEventListener('DOMContentLoaded', e => {
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  query.addEventListener('change', e => init()) // detect dark mode
  init()
})

document.addEventListener('input', e => {
  const m = e.target.closest('.var')
  if (m) {
    setStyle(m)
    updateOutput()
  }
  if(e.target.id == 'invert') init() // detect dark mode
})

document.addEventListener('click', e => {
  const n = e.target.closest('.var-reset')
  if (n) document.querySelectorAll('.var').forEach(m => {
    e.preventDefault()
    if (m.name in def) {
      m.value = def[m.name]
      setStyle(m)
      localStorage.removeItem('val-' + m.id)
    }
  })
})
  
})()