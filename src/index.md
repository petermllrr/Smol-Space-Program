---
title: Smol Space Program
description: Tiny spacecraft made of microelectronics and wire. By Peter Müller.
layout: "layouts/home.njk"
---

<figure class="asciiart">
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
These models are mostly useless, but nice to look at. On this site I'll upload
pictures and build reports.

## 🛰 Gallery

{% for project in collections.project %}
- [{{ project.data.title }}]({{ project.url }})
{%- endfor %}

## 👩‍🚀 Author

Peter Müller<br>
[Web](https://www.petermueller.io) - <a rel="me" href="https://mstdn.social/@bearislive">Mastodon</a>