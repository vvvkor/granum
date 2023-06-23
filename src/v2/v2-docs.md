# Docs

## Awaited browser support

- `:has()` - for interactive components (Firefox)
- `oklch()` - for status colors (not on Win7)
- `loading="lazy"` for gallery
- `clip-path:path()` for icons
- Safari? (needs testing)

## z-index

- 10  `.badge>.tag`
- 20 .container
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

- `html.invert` - dark mode
- `.full` - fullscreen
- `.scroll` - allow overflow, auto scrollbars
- `.scrollbar` - custom scrollbar style
- `.resize` - allow resizing
- `.stick` - stick to top
  - `footer.stick` - stick to bottom
- `.stack` - remove first and last vertical margin
  - `.stack.line` - line between items
- `.corner` - fixed in top right corner
- `.col` - limited width
- `.center` - centrify block (auto horizontal margin)
- `.l, .c, .r` - align text
- `.fit` - remove margin, padding, border, shadow, radius, background
- `.mar` - vertical margin
- `.bord` - border
- `.rad` - rounded corners
- `.shade` - box shadow
- `.pad` - padding
- `div.pads > *` - padding in child items
- `.sans, .serif, .mono` - fonts
- `.h1 ... .h6, .small` - font sizing
- `.nobr` - do not wrap text

## Colors

- `.tag` - tagged text
- `.badge .tag` - tag with additional info, like counters
- `.nn, .ii, .yy, .ww, .ee` - status colors (use with `.tx, .ic, .bt, .bg, .bk`)
- `.tx` - text color
- `.ic` - icon color
- `.bt` - semi-transparent light background
- `.bg` - light background
- `.bk` - dark background
- `.back` - base background color
- `.text` - base text color
- `.link` - link-like appearance
- `.act` - active item (link, label)
- `.inact` - inactive item
- `.hover` - highlight on hover (link, table, ul.row, .tabs)
- `.inv` - invert (use with caution)

## Image

- `.fit` - as block
- `.mid` - vertical align middle
- `.c` - circled
- `.center` - centrify block
- `.wide` - fit width

## Form

- `.form` - form as grid
  - `.vert` - stacked
  - `.resp` - stacked on medium screen (or inside medium container)
  - `.resp-s` - stacked on small screen (or inside small container)
  - `> [name]` - force to right column (if not stacked)
- `> .wide` - force to span both columns (if not stacked)
- `button.detect` - disable if form has invalid inputs
- `input, select, textarea` - basic inputs
  - `:invalid~.report` - message for invalid input
  - `:valid~.approve` - message for valid input
  - `.fresh` - not interacted (js)
- `form .confirm` - show form only if it has checked `radio` input

## Table

- `.pads` - large cell padding
- `table.mid` - centrify cells in table vertically
  - `tr.mid` - centrify cells in row vertically
  - `th.mid` - centrify cell vertically
- `.bord` - borders
- `.line` - only vertical borders
- `.wide` - full width
- `.c` - centrify cells horizontally
- `.r1 ... .r9` - align columns to the right
- `.hover` - highlight on hover

## Container

- `.container` - responsive container (do not use `.modal` and `.drawer` inside container)
- `.row.resp/resp-s` - stacked row inside medium/small container
- `ul.row.resp/resp-s` - stacked list inside medium/small container
- `.form.resp/resp-s` - stacked form inside medium/small container

## Row

- `.row` - flex row
- `.stretch` - stratch items
- `.wrap` - allow items wrapping
- `.mid` - vertically center items
- `> .mid` - vertically center item
- `.gap` - gap between items
- `.hover` - highlight on hover
- `.vert` - stacked
- `.resp` - stack on medium screen (or inside medium container)
- `.resp-s` - stack on small screen (or inside small container)
- `> .push` - margin before next item
- `> .shift` - margin before this item
- `.col-0` - default flex (do not grow)
- `.col-1` - grow x1
- `.col-2` - grow x2
- `.col-3` - grow x3
- `> * > img:only-child` - aspect ratio 3/2

## Grid

- `.grid-xs/s/m/l` - regular grid with tiny/small/medium/large items
- `.gap` - gap between items
- `> .span-2/3/4` - span item
- `> * > img:only-child` - aspect ratio 3/2

## Toggle

- `ul.row` - navigation bar with nested dropdowns
  - `.pads` - padding on items
  - `.vert` - stacked
  - `.resp` - stacked on medium screen (or inside medium container)
  - `.resp-s` - stacked on small screen (or inside small container)
  - `.mid` - vertically center items
  - ` ul.pos-t/tl/tr/b/bl/br/l/lt/lb/r/rt/rb` - dropdown positioning (top/top-left/top-right etc.)
- `.pop > a + div` - popup on hover
  - `.pop > label.check:has(:checked) + div` - popup on click
  - `details.pop` - popup on click
  - `.pos-*` - popup positioning
- `.target` - 
- `label.check:has(:checked) + div` - toggle element
  - `.off/on` - show in off/on state inside target link, label.check or summary
- `ul.row.tabs >li > a[#] + div > [id]` - tabs
- `div.row.tabs > a[#] + div[id]` - tabs
- `div.row.tabs > label.check:has(:checked) + [id]` - tabs
  - `.pads` - padding on items
  - `.hover` - highlight on hover
- `.show, .show-l/m/s` - force show item, optionally on large/medium/small screen/container
- `.hide, .hide-l/m/s` - force hide item, optionally on large/medium/small screen/container
- `.hide-js, .show-js` - force hide/show of JavaScript enebled (greater priority)

## Modal

- `.modal` - modal item
  - `.target` - show only if is or has target
  - `.full` - fullscreen
- `.drawer.target` - targeted drawer on the left side
  - `.shift` - on the right side
- `.target + .overlay` - backdrop under modal/drawer (can be a link)

## Icons

- `.icon-*` - icon before
- `.empty` - hide nested elements
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
