**Granum**  
v1.2.43

# Documentation

**Granum** is a CSS micro framework
that supports grids, tables, forms, buttons,
toggle, modals, dropdowns, popups, drawers,
image gallery, lookup input, date input,
icons, status colors, and even more.
Typography and styling is minimal and unobtrusive.

[GitHub](https://github.com/vvvkor/granum/) · [Demo](https://vvvkor.github.io/granum/)

## Grid

### Horizontal navigation `ul.row`

- `.resp` - stack on narrow screen
- `.hover` - highlight item on hover
- `li.l` - push next items to the right
- `li.r` - shift this item to the right

### Simple grid `.row`

- `.resp` - stack on narrow screen
- `.pad` - inner gaps
- `.l` - inner gaps when stacked
- `.mid` - center all cells vertically
- `.row > .mid` - center cell vertically
- `.row > .col-0` - auto cell width
- `.row > .col-1`, `> .col-2`, `> .col-3` - cell width grow factor
- `.row > .stick` - sticky cell


### Advanced grid `.grid` *(requires [granum-grid.css](granum-grid.css))*

- `.resp` - stack on narrow screen
- `.g1`, `.g2`, `.g3` - inner gaps size
- `.p1`, `.p2`, `.p3` - outer gaps size
- `.flow` - allow cells wrapping
- `.fill` - grow cells to will the row
- `.grid-1`, `.grid-2`, `.grid-3`, `.grid-4`, `.grid-6` - regular grid with X columns
- `.grid > .push` - push next items to the right
- `.grid > .shift` - shift this item to the right
- `.grid > .span-0` - auto cell width
- `.grid > .span-1`, `> .span-2`, `> .span-3`, `> .span-4` - cell width grow factor
- `.grid > .stick` - sticky cell

#### Examples

- `.grid.roll > * + .push + *` - horizontal menu with some items pushed to the right, scroll on overflow
- `.grid.fill > .span-1 + .span-3` - row with 2 cells having widths 1/4 and 3/4
- `.grid.grid-3 > *` - regular grid with 3 columns, auto-wrapping

## List

- `.fit` - no bullets
- `.l` - horizontal list
- `.l.resp` - stack on narrow screen
- `.mid` - center all items vertically

## Table

- `.roll > table` - horizontal scroll
- `.resp` - stack on narrow screen
- `.l` - full width
- `.center` - centrify table
- `.hover` - highlight rows on hover
- `.pad` - borders between rows
- `.bord` - borders around cells
- `.fit` - no cell padding
- `.mid` - center all cells vertically
- `tr.mid` - center row cells vertically
- `tr > .mid` - center cell vertically
- `.lX`, `.cX`, `.rX` - align cells in column X to left, center, right *(requires [granum.js](granum.js))*
- `input[data-filter="SELECTOR"]`, `table tbody tr` - filter table rows *(requires [granum.js](granum.js))*
- `table.sort > thead + tbody`, `(thead > th.sort) + tbody` - sort table *(requires [granum.js](granum.js))*
  - `table[data-sort]` - active header class


## Form

- `form input` - inline form
- `form p > label + br + input` - stacked form
- `form .row > (label.r) + (div.col-3 > input)` - form using grid
- `form table (td.r > label) + (td > input)` - form using table
- `form .row.resp`, `form table.resp` - stack on narrow screen
- `form.fit` - smaller margins
- `button`, `input[type="submit"]` - button
- `a.pad.inv` - button-like link
- `:valid ~ .act.text-e` - hint on valid input
- `:invalid ~ .act.text-y` - hint on invalid input
- `[type="checkbox"][data-check="SELECTOR"]` - check group of boxes *(requires [granum.js](granum.js))*
- `form[data-q]`, `input[data-q]` - populate inputs from URL parameters  *(requires [granum.js](granum.js))*
- `input[data-lookup][data-caption][data-goto]` - lookup input *(requires [granum-dropdown.css](granum-dropdown.css) and [granum-lookup.js](granum-lookup.js))*
- `input.calendar` - date input *(requires [granum-dropdown.css](granum-dropdown.css) and [granum-calendar.js](granum-calendar.js))*
- `form[data-restore]`, `input[data-unstore]` - automatically store and restore form data *(requires [granum-restore.js](granum-restore.js))*

## Components

- `.target:target` - toggle visibility
  - `a.toggle` - multiple, nested, link state, no scroll *(requires [granum.js](granum.js))*
- `.modal.target:target > div` - modal dialog
  - close by `Escape` key *(requires [granum.js](granum.js))*
- `.gallery a.pic` - image gallery *(requires [granum-gallery.js](granum-gallery.js))*
- `.drawer:target` - drawer sliding from left (`.l` from right)
- `.stick` - stick element to top
- `.roll` - horizontal scroll if needed
- `.hi` - fullscreen height
- `.tag`, `.tag.inv.rad.bg-e` - tag
- `.bar[style="--v:PERCENT"]` - progress bar
- `ul.row.drop` - dropdown nested menu *(requires [granum-dropdown.css](granum-dropdown.css))*
- `.pop > div`, `.pop > div.l` - popup *(requires [granum-dropdown.css](granum-dropdown.css))*
- `.pop > span.c`, `.pop > span.r` -  tooltip *(requires [granum-dropdown.css](granum-dropdown.css))*
- `.ul.row.tabs + div > div:target + div` - tabs *(enhanced with [granum.js](granum.js))*


## Tools

### Icons `icon-X` *(requires [granum-icons.css](granum-icons.css))*

`menu` `list` `grid` `more` `find` `config` `user` `share`  
`edit` `add` `close` (`delete`) `refresh` `ok` `info` `warning` `ban`  
`up` `down` `left` `right` `folder` `file` `image` `download`  
`copy` `chart` `pin` `time` `mail` `send` `lock` `world`

### Status colors and backgrounds

- `.back` - base background (white)
- `.bg` - light background (transparent grey)
- `.text-e`, `.bg-e` - danger or error (red)
- `.text-w`, `.bg-w` - warning (brown or yellow)
- `.text-y`, `.bg-y` - success of confirm (green)
- `.text-i`, `.bg-i` - info (blue)
- `.text-n`, `.bg-n` - note or cancel (grey)
- `a.act` - active link
- `a.hover` - highlight hovered link
- `.inv` - invert block or link

### Text modifiers

- `.serif` - serif font
- `.sans` - sans-serif font
- `.mono` - monospaced font
- `.small` - small font
- `.nobr` - no text wrapping
- `a.l` - margin after link
- `.icon-X.empty` - hide text near icon

### Block modifiers

- `.hide` - hide element
- `.fit` - unset: margin, border, padding, shadow, font size and weight
- `.fit p`, `.fit .mar` - smaller margins
- `.mar` - vertical margins
- `.shade` - box shadow
- `.bord` - border
- `.rad` - rounded border
- `.pad` - padding

### Alignment

- `.l`, `.r`, `.c` - align text left, right, center
- `.wrap` - limit block width
- `.center` - centrify block


## JavaScript *(requires [granum.js](granum.js))*

- `body[data-break="MIN-DESKTOP,MIN-TABLET,MIN-MOBILE"]` - custom responsive breakpoints widths
- `[data-resp="DESKTOP-CLASSES,TABLE-CLASSES,MOBILE-CLASSES"]` - responsive element classes
- `a.dialog([title])` - confirm before following the link
- `button.dialog([title])` - confirm before submitting the form with this button
- `form.dialog([title])` - confirm before submitting the form
- `a.dialog([data-prompt][data-default][title])` - prompt dialog
  - `[title]` - dialog text
  - `[data-default]` - default value
  - `[data-prompt]` - replaced substring in URL
- `a.toggle([href^="#"][data-nodes][data-set][data-unset][data-act][data-inact])` - toggle classes
  - `[data-nodes]` or link hash - target elements selector
  - `[data-set]` - additional classes of target elements in active state
  - `[data-unset]` - additional classes of target elements in inactive state
  - `[data-act]` - additional classes of link in active state
  - `[data-inact]` - additional classes of link in inactive state
- `.gallery a.pic` - image gallery
- `input[data-lookup][data-caption][data-goto]` - lookup input *(requires [granum-dropdown.css](granum-dropdown.css) and [granum-lookup.js](granum-lookup.js))*
  - `[data-caption]` - initial caption (optional)
  - `[data-lookup="URL#ID#NAME#INFO"]` - data source
    - `URL` - data source URL, `{q}` is replaced by lookup string, should return JSON array
    - `ID` - item attribute with value (`id` by default)
    - `NAME` - item attribute with caption (`name` by default)
    - `INFO` - item attribute with additional info  (`info` by default)
  - `[data-goto]` - URL of selected item, `{id}` is replaced by lookup value (optional)
  - `[data-limit]` - limit number of shown items
  - `.lookup` - generated combo input
  - `.look` - generated list container
  - `.look [data-id]` - generated lookup items
- `input.calendar[step]` - date input *(requires [granum-dropdown.css](granum-dropdown.css) and [granum-calendar.js](granum-calendar.js))*
  - `.month` - generated calendar container
  - `[data-date].browse` - generated calendar controls
  - `body[data-dt]="."` - use `d.m.Y` date format (instead of default `Y-m-d`)
- `form[data-restore]` - automatically store and restore form data *(requires [granum-restore.js](granum-restore.js))*
  - `[data-restore="IDENT"]` - optional form identifier
  - `input[data-unstore]` - exclude input from storage
- `input[data-nodes][value][data-set][data-unset]` - toggle classes
  - input can be one of: `checkbox`, `radio`, `select`
  - `[data-nodes]` - target elements selector
  - `[data-set]` or `value` - classes of target elements in selected state
  - `[data-unset]` - classes of target elements in inactive state (`checkbox` only)
- `a[data-item]`, `a[data-item="SELECTOR"]` - copy item (default selector is `div, li, tr`)
  - `[data-delete]` - remove item
    - `[data-keep]` - keep last item
  - `[data-up]` - move item up
  - `[data-down]` - move item down

## WISIWYG editor *(requires [granum-edit.js](granum-edit.js))*

- `[contenteditable][data-for="ID_AREA"]` - editor element
- `a[href="#ID_EDITOR"][data-cmd]([data-arg][data-ask][title])` - command button
  - `[data-cmd]` - command (`bold`, 'createlink', etc.)
  - `[data-arg]` - command argument value
  - `[data-ask]` - default value for command argument prompt
