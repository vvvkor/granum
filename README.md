# Granum

CSS micro framework.  
Ultra compact set of styles and behaviours for basic web pages.

3 KB minified and gzipped.  
10 KB with icons, components and some JavaScript.

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
<link rel="stylesheet" href="granum-icons-ext.css">
<link rel="stylesheet" href="granum-dropdown.css">
<link rel="stylesheet" href="granum-grid.css">
<script src="granum.js" defer></script>
<script src="granum-gallery.js" defer></script>
<script src="granum-dialog.js" defer></script>
<script src="granum-lookup.js" defer></script>
<script src="granum-calendar.js" defer></script>
<script src="granum-restore.js" defer></script>
<script src="granum-edit.js" defer></script>
<script src="granum-drag.js" defer></script>
<script src="granum-split.js" defer></script>
```

Bundled styles and scripts are also available:

```html
<link rel="stylesheet" href="granum-full.css">
<script src="granum-full.js" defer></script>
```

Styles with extended iconset and splitter script:

```html
<link rel="stylesheet" href="granum-ext.css">
<script src="granum-ext.js" defer></script>
```

## CDN

```html
<link rel="stylesheet" href="https://unpkg.com/granum">
<!-- optional -->
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-icons.min.css">
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-icons-ext.min.css">
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-dropdown.min.css">
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-grid.min.css">
<script src="https://unpkg.com/granum/dist/granum.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-gallery.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-dialog.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-lookup.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-calendar.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-restore.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-edit.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-drag.min.js" defer></script>
<script src="https://unpkg.com/granum/dist/granum-split.min.js" defer></script>
```

Bundled styles and scripts are also available:

```html
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-full.min.css">
<script src="https://unpkg.com/granum/dist/granum-full.min.js" defer></script>
```

Styles with extended iconset and splitter script:

```html
<link rel="stylesheet" href="https://unpkg.com/granum/dist/granum-ext.min.css">
<script src="https://unpkg.com/granum/dist/granum-ext.min.js" defer></script>
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
  - spinner
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
- with `granum-dialog.js`
  - custom alert, confirm, prompt dialogs
- with `granum-lookup.js` and `granum-dropdown.css`
  - lookup input
- with `granum-calendar.js` and `granum-dropdown.css`
  - date input
- with `granum-restore.js`
  - automatically restore from data
- with `granum-editor.js`
  - contenteditable
- with `granum-drag.js`
  - draggable (table rows, list items)
- with `granum-split.js` and `granum-grid.css`
  - vertical and horizontal splitter

## CSS classes

- `.row` `.col-X` `.resp` `.vert` `.tabs`
- `.fit` `.mar` `.pad` `.bord` `.rad` `.shade` `.stack` `.field`
- `.bg` `.bg-X` `.back` `.text-X` `.hover` `.act`
- `.l` `.r` `.c` `.center` `.wrap` `.full` `.mid` 
- `.roll` `.stick` `.tag` `.bar`
- `.fix-head` `.fix-col`
- `.serif` `.sans` `.mono` `.small` `.nobr` `.inv` `.invert`
- `.target` `.hide` `.show` `.modal` `.drawer` `.pop` `.drop`
- `.icon-X` `.empty` `.spot` `.spin`
- `.grid` `.grid-X` `.flow` `.fill` `.pX` `.gX`
- `.span-X` `.push` `.shift`

## JavaScript hooks

- `.toggle([href^="#"][data-nodes][data-set][data-unset][data-act][data-inact])`
- `input[data-nodes][value][data-set][data-unset]`
- `.dialog([data-prompt][data-default][title])`
- `a.alert, a.confirm([data-param][data-def][title][data-caption][data-ok][data-cancel])`
- `.lX` `.cX` `.rX`
- `table.sort` `th.sort` `table[data-sort]`
- `input[data-filter]` `table tbody tr`
- `[data-check]`
- `[data-get]`
- `body[data-break] [data-resp]`
- `[data-item][data-delete][data-keep][data-up][data-down]`
- `.gallery a.pic`
- `input[data-lookup][data-caption][data-goto][data-limit]`
- `input.calendar[step]`, `body[data-dt]="."`
- `[contenteditable][data-for="ID_AREA"]`
- `form[data-restore="IDENT"]`, `input[data-unstore]`
- `a[href="#ID_EDITOR"][data-cmd]([data-arg][data-ask][title])`
- `.drag-container .drag-item (.drag-handle)`
- `.row.split(.vert)`

## Browser suppport

Modern browsers and IE 11+.  
Limited support for IE9 and IE10.

## License

[MIT](./LICENSE)