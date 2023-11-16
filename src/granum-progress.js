;(() => {
  
  let uploads = []
  
  document.addEventListener('granum-progress', evt => {
    let n = document.querySelector('.progress')
    if (!evt.detail) {
      uploads = []
      if (n) {
        n.innerHTML = ''
        n.classList.add('hide')
      }
      return
    }
    const fn = evt.detail.name
    const e = evt.detail.event
    const data = [fn, e.loaded, e.total]
    const i = uploads.findIndex(f => f[0] == fn)
    if (i != -1) uploads[i] = data
    else uploads.push(data)
    if (!n) {
      n = document.createElement('div')
      n.classList.add('progress')
      document.body.append(n)
    }
    if (n) n.innerHTML = `<table><thead><tr><th><a class="icon-upload"></a></th><th></th><th class="r"><a class="icon-close" href="#close" onclick="document.dispatchEvent(new Event('granum-progress'))"></th></tr></thead><tbody>${uploads.map(f => `<tr><td>${f[0]}</td><td title="${f[1]} / ${f[2]}"><progress value="${f[1]}" max="${f[2]}"></td><td class="${f[1] == f[2] ? 'icon-ok text-y' : 'icon-time text-n'}"></td></tr>`).join('')}</tbody></table>`
    n.classList.toggle('hide', uploads.length == 0)
  })

})()