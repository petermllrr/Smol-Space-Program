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

{% for project in collections.project -%}
<p><a href="{{ project.url }}">{{ project.data.title }}</a></p>
{%- endfor %}

## 👩‍🚀 Author

[Peter Müller](https://www.petermueller.io)

[GitHub](https://github.com/petermllrr/Smol-Space-Program)

Last updated: {% todaysDate %}