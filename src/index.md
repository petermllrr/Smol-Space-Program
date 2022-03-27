---
layout: home.njk
title: Smol Space Program
description: Tiny spacecraft made of microelectronics and wire. By Peter Müller.
---

<figure>
<figcaption>Smol Space Program ASCII art</figcaption>
<pre>
         .                      .
         .                      ;
         :                  - --+- -
         !           .          !
         |        .             .
         |_         +
      ,  | `.
--- --+-<#>-+- ---  --  -
      `._|_,'
         T
         |
         !
         :         . : 
         .       *
<!-- -->
 __     __                   
(_ |\/|/  \|                 
__)|  |\__/|__               
 __ __      __ __            
(_ |__) /\ /  |_             
__)|   /--\\__|__            
 __  __  __  __  __          
|__)|__)/  \/ _ |__) /\ |\/| 
|   | \ \__/\__)| \ /--\|  | 
</pre>
</figure>

# Smol Space Program

I build small, cute spacecraft from microelectronics, wire and lots of solder.
These models are mostly useless, but nice to look at. On this page I upload
pictures and build reports.

## 🛰 Gallery

<ul>
{% for project in collections.project -%}
<li><a href="{{ project.url }}">{{ project.data.title }}</a></li>
{%- endfor %}
</ul>

## 👩‍🚀 Author

Peter Müller

* [Web][1]
* <a rel="me" href="https://mstdn.social/@bearislive">Mastodon</a>
* [Twitter][2]

[1]: https://www.petermueller.io
[2]: https://twitter.com/petermllrr