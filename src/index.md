---
layout: home.njk
title: Smol Space Program
description: Tiny spacecraft made of microelectronics and wire. By Peter Müller.
---

<figure class="not-prose mb-10 mt-0">
<figcaption class="hidden">Smol Space Program ASCII art</figcaption>
<pre class="text-sm text-sky-300">
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
These models are mostly useless, but nice to look at. On this site I'll upload
pictures and build reports.

## 🛰 Gallery

<ul>
{% for project in collections.project -%}
<li><a href="{{ project.url }}">{{ project.data.title }}</a></li>
{%- endfor %}
</ul>

## 👩‍🚀 Author

Peter Müller<br>
[Web][1] - <a rel="me" href="https://mstdn.social/@bearislive">Mastodon</a> - [Twitter][2]

[1]: https://www.petermueller.io
[2]: https://twitter.com/petermllrr