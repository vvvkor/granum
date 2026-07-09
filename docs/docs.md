# Granum v2

## Typography

- .sans .serif .mono .l .r .c .mid .small .regular
- img.c.fit
- table.wide.mid.fit.line.bord.c(.c#.r#)
- ul.fit
- .nobr .nodec .nodec>* button.link label.link

## Space

- .fit .mar .mars .pad .pads .bord .rad .full .resize .scroll .scrollbar
- .wide .wide-s/m/l .center
- .tag.c, sup.tag.c
- progress

## Colors

- .hilite .hover .shade .diagonals
- .neutral .note .info .success .warning .danger
- .bg .text .ic .bord .invert
- body.invert
- .act

## Display

- .show.hide
- .show-s/m/l, .hide-s/m/l (@media)
- .show-cs/cm/cl, .hide-cs/cm/cl (@container)
- .hide-js, .show-js

## Form

- .form.resp.just.stretch > .shift.span.just-l/c/r/s (.resp@container)

## Inputs

- .input
- .switch
- .dropzone

## Validation

- .validate
- .form.lazy .tip
- .detect
- .inact

## Layout

### Grid

- .grid-xs/s/m/l.gap > .span-2/3/4

### Row

- .row.wrap.resp.resp-s.vert.gap.mid.stretch > .col-0/1/2/3.push.shift.stick.resize (.resp@container@media)
- ul.row.gap.click ul.l

### Stack

- .stack.line

### Stick

- .stick, footer.stick, .row > .stick

### Columns

- .columns-xs/s/m/l

## Toggle

- details.pop.l[open] summary.icon-x > :last-child
- ul.row.click:hover - see [row]
- .pop.pos.l:hover
- [data-hint]:hover
- .target#target
- .modal.full.show#target
- .modal.full + (.corner a[#first] + a[#close]) + (a[#next] > img.target#target)
- .drawer.shift.show#target
- ul.row.tabs.gap + div>#
- (label.check > input) + *
- label ... input.check + *
- .slider (> div) + nav a
- #target + .backdrop, body>.backdrop
- #x1:checked .x1

- button[command="show-modal"][commandfor="ID"] ... dialog[id][closedby="any"].full.drawer.shift
- button[popovertarget="ID"] ... dialog[id][popover]
- button[popovertarget="ID"] ... dialog[id][popover="hint"]

## Transtitions

- .trans, .trans-off/fast/slow
- .icon-x.anim-spin/blink/pulse/flip-turn/swing

## Icons

- .icon
- .icon-x.empty:empty
- .icon-menu/close, -next/desc, -folder/open, -add/no, -expand/collapse
- .icon-menu/close, -next/desc, -folder/open, -add/no, -expand/collapse
- .icon-spin

## JavaScript

- .js
- form.data-get, [name].data-get="PARAM"
- table.sort
- [data-check]="SELECTOR"
- :is([type="checkbox"], [type="radio"], select)[data-nodes="SELECTOR"][data-parent="SELECTOR"][data-reverse]
- [type="search"][data-filter="SELECTOR"][data-parent="SELECTOR"]
- [contenteditable][data-area]
- [textarea][data-editor]
- a[#prev] a[#next] :target[data-prev="#ID"][data-next="#ID"]
- #open
- .pop.pos .popwin
- (a[#ID] [id].target.js.mem) ([id].toggle.hide.mem)
- a.dialog[title][href][target="_blank"][data-prompt][data-def][data-param]
- button.dialog[title][data-href][data-blank][data-prompt][data-def][data-param]
- :is(input, select, textarea, details)[id].mem, form.mem [id]
- .tabs a[#ID] + div > [id]
- table.l#.c#.r#
- a.copy[#source]
- a.pass[#target]