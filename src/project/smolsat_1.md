---
title: SMOLSAT-1
description: A super cute, solar-powered mini-satellite.
date: 2022-02-05
layout: project
tags: project
gallery: "smolsat"
---

<h1>{{title}}</h1>

<p>Peter Müller, {{ page.date | format }}</p>

{% image "src/images/smolsat_1/PXL_20220212_142420014.PORTRAIT.jpg", "smolsat_1 completely assembled" %}

The first member of the Smol Space Program 🪐✨. This model runs on solar cells and flashes a LED light. If charged in direct sunlight it can run for almost 5&nbsp;hours. The original idea comes from Mohid Bhoite's Tiny Cube Sat.

The heart of the model is a 10F super capacitor (the big yellow thing looking like a battery), which stores and releases the electricity collected by the solar cells. After half an hour of charging, enough energy is stored and the microcontroller on top of the capacitor turns on. It's an ATtiny85 chip and it's sole function is to flash the LED light. You can find the code that's running in the microcontroller below in the links section.

In hindsight it would be better if the ATtiny somehow checks the voltage that's available and only turns on after charging is completed. But since this is my first model, it's kept rather simple.

All components are held together by brass wiring. I used 1.2&nbsp;mm and 0.8&nbsp;mm brass wire and soldered it together. The stand is a 26&nbsp;mm thick and 80&nbsp;mm wide walnut wood base.

## Links

- [Microcontroller code][3]
- [Mohid Bhoite's Tiny Cube Sat][1]
- [IXYS solar cells][2]

## Schematics

{% image "src/images/smolsat_1/layout.svg", "Wiring layout" %}

{% image "src/images/smolsat_1/schematics.png", "Schematics" %}

[1]: https://www.bhoite.com/sculptures/tiny-cube-sat/
[2]: https://www.digikey.de/en/products/detail/anysolar-ltd/SM111K06L/9990436
[3]: https://gist.github.com/petermllrr/0dab23f958eaba381c769f051721ce3e