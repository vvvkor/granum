# Granum v2

## Todo

- (+) icons: synonyms (ok, search, pin, more, add, world, tree, view, columns, no, energy); sory by category
- (+) toggle active with [css] (js?)
- (-) minimal.css
- (=) compatible.css (no :has)
- (-) @screen
- (-) repo: rearrange folders, build, demo page
- (-) +js +doc (+acts-relative-to-parent, +map-editable-to-area, +table-filter, +table-sort, +checkall, drag, =dialog, v2 (+esc,+#back,+#prev,+#next,+#open,+toggle-class,+get-url,+hint-untitle)) (split, freedrag, pos?, process), resp-class, items, +alert-confirm-prompt
- (+) table: .fix-head, .fix-col
- (+) slider
- (+) columns
- (=?) container: overflow?
- (-?) mobile: stretch date inputs?
- (+) progress
- (+) .tag
- (+) toggle.js (+dropdown, +hint, +pop:hover =.pop#target; +tree-nest-details, +target, +accordion, +modal, +drawer, +gallery, +tabs, +.check)
- (+) .screenX .ifX (responsive) = .hide-s/m/l, .show-s/m/l (override #target)
- (+) .resp-X, .hide/show-X, @container
- (+) .input details.pop
- (+) validate: border & .input
- (+) status color vars
- (+) vars by files; inverted
- (+) .pop.pos fix position
- (=?) .invert {--link:link-invert}
- (+) mobile: footer.stick inside container? [inside scrollable]
- (=) icon @print [enable bg grapgics]
- (+) .icon-spin
- (+) #x1:checked
- (+) @print
- (+) .scrollbar
- (=) .h1
- (=) .check

## Changes

- .report -- .tip
- .roll -- .scroll
- .text-X -- .danger...
- .bg-X -- .bg.danger...

## Additions

- .nodec, button.nodec
- .bord.danger...
- .mars .pads .wide-s/m/l
- .show-s/m/l .hide-s/m/l .show-cs/cm/cl .hide-cs/cm/cl
- .container .form.resp.just.stretch > .shift.span.just-l/c/r/s
- .input .switch .dropzone .validate .detect
- label.check, input.check
- .row.stretch details.pop .backdrop .row>.resize
- .grid-xs/s/m/l.gap > .span-2/3/4
- .slider
- progress

## Typography

- .sans .serif .mono .l .r .c .mid .small .regular
- img.c.fit
- table.wide.mid.fit.line.bord.c(.c#.r#)
- ul.fit
- .nobr .nodec

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

## Form

- .form.resp.just.stretch > .shift.span.just-l/c/r/s (.resp@container)

## Inputs

- .input
- .switch
- .dropzone

## Validation

- .validate
- .tip
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