/*! granum-progress.js v1.2.131 */

;(() => {
  
  let uploads = []
  
  document.addEventListener('granum-progress', evt => {
    let n = document.querySelector('.progress')
    if (!evt.detail) {
      uploads = []
      if (n) n.remove()
      return
    }
    const fn = evt.detail.name
    const e = evt.detail.event
    const data = [fn, e ? e.loaded : 0, e ? e.total : 0]
    const i = uploads.findIndex(f => f[0] == fn)
    if (i != -1 && !e) uploads = uploads.filter(u => u[0] != fn)
    else if (i != -1) uploads[i] = data
    else uploads.push(data)
    if (!n) {
      n = document.createElement('div')
      n.classList.add('progress')
      n.innerHTML = `<table><thead><tr><th><a class="icon-upload"></a></th><th></th><th class="r"><a class="icon-close" href="#close"></th></tr></thead><tbody></tbody></table>`
      document.body.append(n)
    }
    const b = n.querySelector('tbody')
    if (b) b.innerHTML = `${uploads.map(f => `<tr><td>${f[0]}</td><td><progress value="${f[1]}" max="${f[2]}"></td><td class="${f[1] == f[2] ? 'icon-ok text-y' : 'icon-time text-n'}"></td></tr>`).join('')}</tbody>`
    n.classList.toggle('hide', uploads.length == 0)
  })
  
  document.addEventListener('click', e => {
    const a = e.target.closest('.progress a[href="#close"]')
    const x = e.target.closest('.progress .icon-ok, .progress .icon-time')
    if (a) {
      e.preventDefault()
      document.dispatchEvent(new Event('granum-progress'))
    }
  })

})()