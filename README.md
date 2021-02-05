# Granum

CSS micro framework.  
Ultra compact set of styles and behaviours for basic web pages.

2.5 KB minified and gzipped.  
7 KB with icons, dropdowns and JavaScript.

[Demo](https://vvvkor.github.io/granum/)

## Usage

```html
<link rel="stylesheet" href="granum.css">
<!-- optional -->
<link rel="stylesheet" href="granum-icons.css">
<link rel="stylesheet" href="granum-dropdown.css">
<script src="granum.js" defer></script>
<script src="granum-edit.js" defer></script>
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/granum">
<!-- optional -->
<link rel="stylesheet" href="https://unpkg.com/granum/granum-icons.css">
<link rel="stylesheet" href="https://unpkg.com/granum/granum-dropdown.css">
<script src="https://unpkg.com/granum/granum.js" defer></script>
<script src="https://unpkg.com/granum/granum-edit.js" defer></script>
```


## Features

- lightweight
- simple class names
- modern
- responsive
- mobile friendly
- semantic
- valid
- cross-browser
- JavaScript is optional
- neutral style
- no floats
- no hacks

## Components

- typography
- links
- grid
- lists
- tables
- forms
- buttons
- navbar
- modal
- toggle
- tags
- colors
- media object
- full height
- with `granum-icons.css`
  - icons
- with `granum-dropdown.css`
  - dropdown
  - popup
  - tooltip
- with `granum.js`
  - confirm
  - prompt
  - responsive class
  - populate inputs from URL
- with `granum-editor.js`
  - contenteditable


## CSS classes

- `.row` `.col-X` `.act`
- `.fit` `.mar` `.pad` `.bord` `.rad`
- `.bg` `.bg-X` `.text-X` `.hover`
- `.l` `.r` `.c` `.center` `.wrap` `.roll`
- `.hi` `.mid` 
- `.serif` `.sans` `.small` `.inv` `.tag`
- `.target` `.hide` `.show` `.modal` `.pop` `.drop`
- `.icon-X`


## js hooks

- `.toggle([href^="#"][data-nodes][data-set][data-act])`
- `.dialog([data-prompt][data-default][title])`
- `.lX` `.cX` `.rX`
- `[data-group]`
- `[data-get]`
- `[data-mobile]` `[data-desktop]`

## js editor hooks

- `[contenteditable][data-for="ID_AREA"]`
- `a[href="#ID_EDITOR"][data-cmd]([data-arg][data-ask][title])`

## Browser suppport

Modern browsers and IE 11+.  
Limited support for IE9 and IE10.

## License

[MIT](./LICENSE)