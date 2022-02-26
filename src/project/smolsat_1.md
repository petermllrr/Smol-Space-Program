---
tags: project
layout: project
title: SMOLSAT-1
description: A super cute, solar-powered mini-satellite.
gallery: smolsat_1_gallery
date: 2022-02-05
---

{% assign widths = "640, 1280, 4032" | split: ',' -%}
{% image "images/smolsat_1/PXL_20220212_142420014.PORTRAIT.jpg", "SMOLSAT-1 completely assembled", widths, "(max-width: 639px) 100vw, (min-width: 640px) 640px" %}

The first member of the Smol Space Program 🪐✨. It's a simple LED pummer, which
charges a capacitor via two solar cells and flashes an LED when enough voltage
is applied. The original idea comes from Mohid Bhoite's Tiny Cube Sat.

Smolsat-1 is controlled by an ATtiny85 microcontroller. Its only task is to let
the LED slowly fade. When the LED is not active, the ATtiny switches to sleep
mode. Looking back, a voltage control would make more sense, so that the
microcontroller waits until there is enough voltage stored in the capacitor. But
since this was my first model, I am already satisfied.

Optical highlight are the beautiful solar cells from Anysolar. These cells are
monocrystalline cells, which are separated from each other by fine metal struts.
They look almost like real solar cells.

The model is held together by 1.2&nbsp;mm and 0.8&nbsp;mm brass wire and stands
on a 26&nbsp;mm thick and 80&nbsp;mm walnut wood base.

## Schematics

{% svg "images/smolsat_1/layout.svg", "Wiring layout" %}

{% assign widths = "640, 1280, 3066" | split: ',' -%}
{% image "images/smolsat_1/schematics.png", "Schematics", widths, "(max-width: 639px) 100vw, (min-width: 640px) 640px" %}

## Code

<script src="https://gist.github.com/petermllrr/0dab23f958eaba381c769f051721ce3e.js"></script>

## Links

[Mohid Bhoite's Tiny Cube Sat][1]

[IXYS solar cells][2]

[1]: https://www.bhoite.com/sculptures/tiny-cube-sat/
[2]: https://www.digikey.de/en/products/detail/anysolar-ltd/SM111K06L/9990436