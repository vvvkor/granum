# Granum

CSS micro framework.  
Ultra compact set of styles and behaviours for basic web pages.

3 KB minified and gzipped.  
8 KB with icons, components and some JavaScript.

[Demo](https://vvvkor.github.io/granum/) · [Docs](https://github.com/vvvkor/granum/blob/master/docs/docs.md)

## Usage

### npm

```shell
npm install granum
```

### Manual

[Download](https://github.com/vvvkor/granum/archive/refs/heads/master.zip)
and include scripts from `dist` directory.

```html
<link rel="stylesheet" href="granum.css">
<!-- optional -->
<link rel="stylesheet" href="granum-icons.css">
<link rel="stylesheet" href="granum-dropdown.css">
<link rel="stylesheet" href="granum-grid.css">
<script src="granum.js" defer></script>
<script src="granum-gallery.js" defer></script>
<script src="granum-lookup.js" defer></script>
<script src="granum-calendar.js" defer></script>
<script src="granum-edit.js" defer></script>
```

Bundled styles and scripts are also available:

```html
<link rel="stylesheet" href="granum-full.css">
<script src="granum-full.js" defer></script>
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/granum">
<!-- optional -->
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-icons.min.css">
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-dropdown.min.css">
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-grid.min.css">
<script src="https://unpkg.com/granum/dist/granum.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-gallery.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-lookup.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-calendar.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-edit.min.js" defer></script>
```

Bundled styles and scripts are also available:

```html
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-full.min.css">
<script src="https://unpkg.com/granum/dist/granum-full.min.js" defer></script>
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
- tabs
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
  - copy, remove, order items
- with `granum-gallery.js`
  - gallery
- with `granum-lookup.js` and `granum-dropdown.css`
  - lookup input
- with `granum-calendar.js` and `granum-dropdown.css`
  - date input
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
- `.icon-X` `.empty`
- `.grid` `.grid-X` `.flow` `.fill` `.pX` `.gX`
- `.span-X` `.push` `.shift`

## JavaScript hooks

- `.toggle([href^="#"][data-nodes][data-set][data-unset][data-act][data-inact])`
- `input[data-nodes][value][data-set][data-unset]`
- `.dialog([data-prompt][data-default][title])`
- `.lX` `.cX` `.rX`
- `table.sort` `th.sort` `table[data-sort]`
- `[data-check]`
- `[data-get]`
- `body[data-break] [data-resp]`
- `[data-item][data-delete][data-keep][data-up][data-down]`
- `.gallery a.pic`
- `input[data-lookup][data-caption][data-goto][data-limit]`
- `input.calendar[step]`, `body[data-dt]="."`

## JavaScript editor hooks

- `[contenteditable][data-for="ID_AREA"]`
- `a[href="#ID_EDITOR"][data-cmd]([data-arg][data-ask][title])`

## Browser suppport

Modern browsers and IE 11+.  
Limited support for IE9 and IE10.

## License

[MIT](./LICENSE)