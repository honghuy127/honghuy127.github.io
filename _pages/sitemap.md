---
title: "Sitemap"
permalink: /sitemap/
author_profile: true
---

<ul class="sitemap-list">
  <li><a href="{{ '/' | relative_url }}">About</a></li>
  {% for link in site.data.navigation.main %}
    <li><a href="{{ link.url | relative_url }}">{{ link.title }}</a></li>
  {% endfor %}
</ul>

A machine-readable [XML sitemap]({{ '/sitemap.xml' | relative_url }}) is also available.
