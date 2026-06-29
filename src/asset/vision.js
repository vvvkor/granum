;(() => {
  let cfg = localStorage.getItem('vision') || '{font: 14}'
  try {
    cfg = JSON.parse(cfg)
  }
  catch (e) {
    console.log('Faild parsing JSON: vision')
  }
  
  const vision = {
    cfg,
    set: function (k, v) {
      this.cfg[k] = v
      this.apply()
      this.store()
      return false
    },
    inc: function (k, x=1, min=0, max=100, def=1) {
      return this.set(k, 0 + (this.cfg[k] || def) + Number(x))
    },
    mult: function (k, x=2, min=1, max=100, def=1) {
      return this.set(k,Math.max(Number(min), Math.min(Number(max), Math.round(1 * (this.cfg[k] || def) * Number(x)))))
    },
    apply: function () {
      document.documentElement.classList[this.cfg.contrast ? 'add' : 'remove']('contrast')
      document.documentElement.classList[this.cfg.noimg ? 'add' : 'remove']('noimg')
      document.documentElement.style.fontSize = this.cfg.contrast ? '' + this.cfg.font + 'px' : ''
    },
    store: function () {
      localStorage.setItem('vision', JSON.stringify(this.cfg))
    }
  }
  
  vision.apply()
  
  const d = document.createElement('div')
  d.classList.add('vision', 'pad')
  d.innerHTML = `
    <div class="vision-hide">
      <a href="#contrast" data-vision="contrast,1">Contrast</a>
    </div>
    <div class="vision-show">
      <a href="#basic" data-vision="contrast,">Basic</a>
      <a href="#font-bigger" data-vision="font,mult(),1.25,12,80,14">A+</a>
      <a href="#font-smaller" data-vision="font,mult(),.8,12,80,14">A-</a>
      <!--button class="fit bord info">Button</button-->
      <a href="#contrast" data-vision="noimg,">Images</a>
      <a href="#basic" data-vision="noimg,1">No</a>
    </div>
  `
  document.body.prepend(d)
  d.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.dataset.vision?.indexOf(',') == -1) return
    const [k, v, ...x] = e.target.dataset.vision.split(/,/)
    if (v.indexOf('()') !== -1) vision[v.slice(0, -2)](k, ...x)
    else vision.set(k, v)
  })
    
})()