# Docs

## Awaited browser support

- :has() in Firefox
- Safari? (nedds testing)

## z-index

- 10  `.badge>.tag`
- 30  `footer.stick`
- 35  `.stick`
- 40  `.corner`
- 50  `[data-hint]`
- 50  `.pop`
- 50  `.drop`
- 100 `#overlay`
- 101 `.overlay`
- 120 `.drawer`
- 130 `.modal`

## Typical layouts

- `.row.resp.full > .col-1 + .col-3.scroll.row.vert > header + .col-2.scroll + (.scroll > table) + footer` - vertical with scroll
- `.row > .col-1.stick.scroll + .col-3` - sticky aside

## Global

- `#overlay` - default overlay for `.modal` and `.drawer`
- `#x1:checked .x1 ... .x9` - toggle items
- `#invert:checked` - dark mode
- `#debug:checked` - custom styling

## Modifiers

- `html.invert` - 
- `.full` - 
- `.scroll` - 
- `.scrollbar` - 
- `.resize` - 
- `.stick` - 
  - `footer.stick` - 
- `.stack` - 
- `.corner` - 
- `.read` - 
- `.center` - 
- `.l, .c, .r` - 
- `.fit` - 
- `.mar` - 
- `.bord` - 
- `.rad` - 
- `.shade` - 
- `.pad` - 
- `div.pads > *` - 
- `.h1 ... .h6` - 
- `.small` - 
- `.sans, .serif, .mono` - 
- `.nobr` - 

## Colors

- `.tag` - 
- `.badge .tag` - 
- `.nn, .ii, .yy, .ww, .ee` - 
- `.icon-* .ee` - 
- `.tx .ee` - 
- `.bt .ee` - 
- `.bg .ee` - 
- `.bk .ee` - 
- `.text` - 
- `.link` - 
- `.act` - 
- `.inact` - 
- `.hover` - 
- `.back` - 
- `.inv` - Invert (use with caution)

## Image

- `.fit` - 
- `.mid` - 
- `.c` - 
- `.center` - 
- `.wide` - 

## Form

- `.form` - 
  - `.vert` - 
  - `.resp` - 
  - `.resp-s` - 
  - `.aware` - 
  - `> [name]` - 
- `> .wide` - 
- `button.detect` - 
- `input, select, textarea` - 
  - `.report` - 
  - `.approve` - 
  - `.fresh` - 
- `form .confirm` - 

## Table

- `.pads` - 
- `.mid` - 
  - `tr.mid` - 
  - `th.mid` - 
- `.bord` - 
- `.line` - 
- `.wide` - 
- `.c` - 
- `.r1 ... .r9` - 

## Container

- `.container` - (Do not use `.modal` and `.drawer` inside container)
- `.row.resp/resp-s` - 
- `ul.row.resp/resp-s` - 
- `.form.resp/resp-s` - 

## Row

- `.row` - 
- `.stretch` - 
- `.vert` - 
- `.wrap` - 
- `.mid` - 
- `> .mid` - 
- `.gap` - 
- `.resp` - 
- `.resp-s` - 
- `.push` - 
- `.shift` - 
- `.col-0` - 
- `.col-1` - 
- `.col-2` - 
- `.col-3` - 
- `> * > img` - aspect 3/2

## Grid

- `.grid-xs/s/m/l` - 
- `.gap` - 
- `> .span-2/3/4` - 
- `> * > img` - aspect 3/2

## Toggle

- `ul.row` - 
  - `.pads` - 
  - `.vert` - 
  - `.resp` - 
  - `.resp-s` - 
  - `.mid` - 
  - `.` - 
  - `.pos-*` - 
- `.pop` - 
  - `.pos-*` - 
- `.target` - 
  - `.off` - 
  - `.on` - 
- `.check` - 
- `.tree` - 
- `.tabs` - 
  - `.pads` - 
- `.show, .show-l/m/s` - 
- `.hide, .hide-l/m/s` - 
- `.hide-js, .show-js` - 

## Modal

- `.modal` - 
  - `.target` - 
  - `.full` - 
  - `.overlay` - 
- `.drawer` - 
  - `.shift` - 

## Icons

- `.icon-*` - 
- `.empty` - 
- `(.check/[open]>/a[#]).icon-(folder/forward/add/menu)` - toggle icon to `.icon-(open/desc/no/close)` respectively

## JavaScript enhancements

- `body.js` - class `js` added to `body` if JavaScript is enabled
- `[id].mem` - store input values and details open state
- `[data-get="urlParamName"], [data-get][name], form[data-get] [name]` - set content or value from URL
- `[data-hint]` - remove native title
- `[data-modal="querySelector"]` - open native modal dialog
- `[data-check="querySelector"]([data-parent])` - check all boxes
- `[data-nodes="querySelector"]([data-parent][data-reverse])[type="checkbox"][value]` - toggle classes
- `[data-nodes="querySelector"]([data-parent][data-reverse])[type="radio"][value]` - set classes
- `body[data-break="800,400"] *[data-resp="class-l,class-m,class-s"]` - set breakpoints and responsize classes
- `onkeyup:Escape` - close all modals and popups
- `#clear` - clear localStorage
- `#back` - go back
- `#prev` - go to hash defined in `:target[data-prev]`
- `#next` - go to hash defined in `:target[data-next]`
