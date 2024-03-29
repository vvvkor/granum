# Granum v2

## Requirements

- :has() - for interactivity, forms and validation - not implemented in Firefox as of 2023-05-24
- loading="lazy"
= svg d:path() in css
- clip-path:path() for icons
- !!! oklch() for colors - not on Win7

## Order / cleanup / docs

- !!! Naming, constants, defaults, destruct, guard, edge, small funcs
- !!! test: +mob, +edge, =ff, -safari (icons, overlay)
+ naming: --rsatur etc
- cleanup and organize css
= move dialog experiments to some test files [removed]
+ write docs
+ describe preferred toggler components variants in table
+ describe drawbacks of using dialog and details for modal

## Learn

+ @container
~ @layer
~ conic-gradient for pie chart
~ :where()
= grid place-items:center
= grid-tpl-cols: repeat(auto-fill, minmax)
= grid-auto-rows

## Todo

- drawer.resp (js responsive class [data-resp] ?)
- spinner
- bar
- resize: vert/hor only
- corner bottom fixed: .pos-*? (sticky link to top)
- wide pop = hover tabs = ul.drop
- checker:not(:has(:checked)) {hide} - appearing items
- lazy using --img, cause loading attr fails wo js
- dropzone
~ icons: ~box, =link, +layers
~ text/icon: white with shade (for gallery)
= link icon
= modal/drawer inside .cont [NO]
=~ animate gallery
= containers inside Grid section
= col-* => cell-*
= colors: oklch() [not supported on win8]
= dark mode @atmos.style
= details pad 1.5
= anchor = a#:target + .target [scrolls anyway]
= --flex
= .resp to .vert-mobile/desktop [.resp]
= .resp: ?two breakpoints; .target-l/m/s; .vert-l/m/s instead of .resp
= path without svg? :before? [scale fails without nested element]
= native modal with fallback, tgl cmp: dialog [after closed natively (esc/formmethod/(backdrop)), not posiible to show with js]
= data-filter [requires js]
= confirm&prompt using label>a# [not posible]
+ border color [.bd]
+ table options
+ hide-js, alt-Prev
+ data-resp use default class
+ Icons prev/next
+ gal #prev/#next
+ #back
+ tx,bt,bg,bk: default nn
+ info: fix yy text
+ breakpoints: 600,900px? 40,60rem? [30,50rem]
+ #clear: clear local storage
+ docs&info on .mem
+ check tabs mem
+ details.mem
+ data-resp
+ validate
+ a:visited
+ remove .act bg
+ dlit for every status
+ js mem
+ .check [name]
+ (.check>checked, [open]>summary, a[#]+:target) .on.off
  + toggle icon
  + details: custom icon [.link or .fit, use svg.icon-x.on.off]
+ swap icons on toggle (!forward/desc, !folder/open, !menu/close, ok/no, !add/no, expand/collapse, play/pause  )
+ show/hide-l/m/s
+ docs: images section: img.wide.center.c.mid.fit
+ .cont .aware => .cont .resp-s
+ html = .container
+ div.pads
+ cell-* => .span-*
+ docs: colored icons
+ info: show by link, backdrop
+ !info cmp: target: separate placement
+ icon with default color? .ic!
+ tag: shift up
+ default status color for .icon-* [only icon color]
+ modal@m: overlay outline bottom
+ table stripes on/off
+ naming: read=col, bgl=transparent=tr
+ remove .tform (after testing grid form)
+ .bt
+ @container bug (icon over dropdown) [.cont:pos,z-index - for stacking context]
+ brighter orange text and bg mark
+ smart grid
+ @media a < width <= b
+ resize:both !!!
+ +width:min(), =padding:max(), =font:clamp
+ root: scroll-pad, scroll-behaviour
+ margin-inline
+ form as grid
+ pop:notHas 1.check
+ button requires .bk BUT .tag does not: unify! [.bk required for both]
+ .pad.stack
+ dont use .cont by default for dropdown demo, cause .pop and icons visible from below
+ stick top nav
+ .badge.tag
+ avoid flashing of validation .report [animation:delay-appear]
+ icons: recount to viewBox 16, use :before clip-path, scale as --fsz, separate file
+ native dlg close color, also confirm dlgs
+ vert scroll in modal, drawer with .stack
+ form layout: [form.container table.form.aware]
+ .rad
+ form
+ input, button, fieldset
+ on invalid: disable only marked buttons .detect
+ js: validate: .fresh, .report, .approve
+ typography and modifiers
+ style table caption
+ figure
+ table tools @m
+ avoid underlined icons
+ data-get: mult, box, urlddecode
+ table +.wide +.fit +.pads +.line +.bord +.r5 +.mid
+ img.wide.c.center
+ data-hint with title
+ .pop>div&[data-hint]:after:--pos
+ drawer:target with overlay
+ brighter yellow (non-transparent bg-* ?)
+ popDropModal: maxHeight, scroll (if not has nested)
+ nested pop
+ search results
+ confirm tree
+ js: checkall, openModal: functions
+ js: esc modals and popups
+ js: tgl cls
+ docs: compact tree examples
+ unstyle ul details
+ use details for +popup/+toggle/+tree
+ match .resp with .container [.aware]
+ unify ul arrow
+ use flex-flow
+ @media only set vars
+ list of links as ul.row
+ fix scroll onOpenModal @m [avoid body@container]
+ compact drop @m
+ vert grid overflow height @m
+ .fit: no list style
+ form has invalid = inact
+ cmp tgl: responsive state
+ hidden with displayBlock? [ok, display overrides]
+ @container!!! .card~..row
+ .text to .tx, .bg, .inv to .bk
+ checkall@click
+ native :modal[open]:target / :modal@click
+ link to reset url of confirm form
+ modal overlay linked
+ fix status colors table
+ open modal focus #input
+ label #debug [need to hide input to avoid scroll]
+ status colors [.bk.ww, etc.]
+ next/prev modals [nested are contained, even full]
+ #x5:checked .x5 (hints, heading hashes)
+ status colors vars hsla
+ link: text-decoration, text-underline-offset
+ different image proportions
+ #invert:checked
+ popup default info bg? [add space after link]
+ nested tabs
+ --mar
+ --pad
+ .pads
+ force overflow @m
+ text-n:#999
+ label+not:target = hide
+ ul.row.subpad
+ ul.mid
+ label target
+ label pop
+ ul arrows

## Test
- drop sub select hilite flashes @m [-webkit-tap-highlight-color:transparent;]
- tree,tabs: no .hover = no hilite