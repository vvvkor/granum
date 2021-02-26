# Granum

CSS micro framework.  
Ultra compact set of styles and behaviours for basic web pages.

2.5 KB minified and gzipped.  
7 KB with icons, dropdowns, advanced grid and some JavaScript.

[Demo](https://vvvkor.github.io/granum/)
[Docs](https://vvvkor.github.io/granum/docs.md)

## Usage

```html
<link rel="stylesheet" href="granum.css">
<!-- optional -->
<link rel="stylesheet" href="granum-icons.css">
<link rel="stylesheet" href="granum-dropdown.css">
<link rel="stylesheet" href="granum-grid.css">
<script src="granum.js" defer></script>
<script src="granum-edit.js" defer></script>
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/granum">
<!-- optional -->
<link rel="stylesheet" href="https://unpkg.com/granum/granum-icons.css">
<link rel="stylesheet" href="https://unpkg.com/granum/granum-dropdown.css">
<link rel="stylesheet" href="https://unpkg.com/granum/granum-grid.css">
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
- link
- responsive grid
- list
- table
- form
- button
- navbar
- modal
- toggle
- tag
- progress bar
- colors
- media object
- full height
- with `granum-icons.css`
  - icons
- with `granum-dropdown.css`
  - dropdown
  - popup
  - tooltip
- with `granum-grid.css`
  - advanced grid
  - cell widths: auto, fractional, regular
  - gaps and padding
  - responsive
  - push cell
  - control wrapping
- with `granum.js`
  - confirm
  - prompt 
  - toggle class (with link or input)
  - responsive class
  - custom responsive breakpoints
  - populate inputs from URL
  - align table columns
  - check group of checkboxes
- with `granum-editor.js`
  - contenteditable

## CSS classes

- `.row` `.col-X` `.resp`
- `.fit` `.mar` `.pad` `.bord` `.rad` `.shade`
- `.bg` `.bg-X` `.back` `.text-X` `.hover` `.act`
- `.l` `.r` `.c` `.center` `.wrap` `.hi` `.mid` 
- `.roll` `.stick` `.tag` `.bar`
- `.serif` `.sans` `.mono` `.small` `.nobr` `.inv`
- `.target` `.hide` `.show` `.modal` `.drawer` `.pop` `.drop`
- `.icon-X`
- `.grid` `.grid-X` `.flow` `.fill` `.pX` `.gX`
- `.span-X` `.push` `.shift`

## JavaScript hooks

- `.toggle([href^="#"][data-nodes][data-set][data-unset][data-act][data-inact])`
- `input[data-nodes][value][data-set][data-unset]`
- `.dialog([data-prompt][data-default][title])`
- `.lX` `.cX` `.rX`
- `[data-group]`
- `[data-get]`
- `body[data-break] [data-resp]`

## JavaScript editor hooks

- `[contenteditable][data-for="ID_AREA"]`
- `a[href="#ID_EDITOR"][data-cmd]([data-arg][data-ask][title])`

## Browser suppport

Modern browsers and IE 11+.  
Limited support for IE9 and IE10.

## License

[MIT](./LICENSE)