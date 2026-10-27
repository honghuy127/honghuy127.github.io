---
permalink: /
title:
excerpt: "AI safety, security, privacy, and multimedia forensics."
author_profile: false
body_class: home
redirect_from: 
  - /about/
  - /about.html
---

<section class="hero" aria-labelledby="home-title">
  <div class="hero__text">
    <p class="eyebrow">Tokyo, Japan</p>
    <h1 id="home-title">Huy H. Nguyen</h1>
    <p class="hero__lead">AI safety, security, privacy, and multimedia forensics.</p>
    <p class="hero__affiliations">Researcher at SB Intuitions · Visiting Associate Professor at the National Institute of Informatics</p>
    <div class="hero__actions">
      <a class="button button--primary" href="{{ '/files/CV.pdf' | relative_url }}">{% include icon.html name="cv" %}View CV</a>
      <a class="button" href="{{ site.author.googlescholar }}">{% include icon.html name="scholar" %}Google Scholar</a>
      <a class="button" href="{{ '/publications/' | relative_url }}">Publications {% include icon.html name="arrow-right" %}</a>
    </div>
    {% include profile-links.html icons_only=true %}
  </div>
  <picture class="hero__photo">
    <source srcset="{{ '/images/profile-384.webp' | relative_url }}" type="image/webp">
    <img src="{{ '/images/profile-384.jpg' | relative_url }}" alt="Portrait of Huy H. Nguyen" width="384" height="384" fetchpriority="high">
  </picture>
</section>

<section class="home-introduction" aria-label="About Huy" markdown="1">

I am **Huy H. Nguyen** (Nguyễn Hồng Huy in Vietnamese), a researcher at [**SB Intuitions**](https://www.sbintuitions.co.jp/) (a SoftBank Group company) and a visiting associate professor at the [**National Institute of Informatics (NII)**](https://www.nii.ac.jp/en/), Japan. Previously, I was a project assistant professor (特任助教) at [Echizen Laboratory](https://research.nii.ac.jp/~iechizen/official/index-e.html), NII.

I received a B.S. degree through the honors program at [VNUHCM - University of Science](https://en.hcmus.edu.vn/), Vietnam, in 2013, and a Ph.D. from [The Graduate University for Advanced Studies, SOKENDAI](https://www.soken.ac.jp/en/), in alliance with the [National Institute of Informatics](https://www.nii.ac.jp/en/), Japan, in 2022.

</section>

<section class="home-section" aria-labelledby="themes-title">
  <h2 id="themes-title">Research themes</h2>
  <div class="card-grid theme-grid">
    {% for topic in site.data.research_topics %}
    {% assign topic_pubs = site.data.publications | where_exp: "pub", "pub.topics contains topic.id" %}
    <a class="card theme-card" href="{{ '/publications/' | relative_url }}?topic={{ topic.id }}">
      <h3>{{ topic.label }}</h3>
      <p>{{ topic.summary }}</p>
      <span class="theme-card__count">{{ topic_pubs.size }} papers {% include icon.html name="arrow-right" %}</span>
    </a>
    {% endfor %}
  </div>
</section>

<section class="home-section" aria-labelledby="news-title">
  <h2 id="news-title">Recent news</h2>
  {% assign news = site.data.news | sort: 'date' | reverse %}
  <ol class="news-timeline" data-news-list>
    {% for item in news %}
    <li{% if forloop.index > 5 %} data-news-older{% endif %}>
      <time datetime="{{ item.date }}">{{ item.date | date: "%b %Y" }}</time>
      <div>
        <h3>{% if item.url %}<a href="{% if item.url contains '://' %}{{ item.url }}{% else %}{{ item.url | relative_url }}{% endif %}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</h3>
        {% if item.summary %}<p>{{ item.summary }}</p>{% endif %}
      </div>
    </li>
    {% endfor %}
  </ol>
  {% if news.size > 5 %}
  <button class="button button--small news-toggle" type="button" data-news-toggle aria-expanded="false" hidden>
    <span data-news-toggle-label>Show {{ news.size | minus: 5 }} older items</span> {% include icon.html name="chevron-down" %}
  </button>
  {% endif %}
</section>

<section class="home-section" aria-labelledby="selected-title">
  <h2 id="selected-title">Selected publications</h2>
  {% assign selected = site.data.publications | where: "selected", true | sort: "year" | reverse %}
  <ol class="pub-list pub-list--compact">
    {% for pub in selected %}{% include publication.html pub=pub compact=true %}{% endfor %}
  </ol>
  <p class="home-section__more"><a class="button" href="{{ '/publications/' | relative_url }}">All {{ site.data.publications.size }} publications {% include icon.html name="arrow-right" %}</a></p>
</section>

<section class="home-section" aria-labelledby="activities-title">

<h2 id="activities-title">Academic activities</h2>

<div class="card-grid">
  <article class="card activity-card">
    <p class="eyebrow">Service</p>
    <h3>Reviewer</h3>
    <p><strong>Conferences:</strong> NeurIPS, ICLR, ICML, CVPR, ECCV, WACV, ICME, ACL RR, APSIPA ASC.</p>
    <p><strong>Journals:</strong> IEEE Access, TIP, TIFS, IEEE/CAA JAS, ACM TOMM, Elsevier, EURASIP JIVP, and IEICE.</p>
  </article>
  <article class="card activity-card">
    <p class="eyebrow">Chairing</p>
    <h3>Session chair</h3>
    <ul>
      <li>APSIPA ASC 2020: Deep Generative Models for Media Clones and Its Detection.</li>
      <li>APSIPA ASC 2023: Multimedia Security and Privacy in the Age of Deep Learning.</li>
    </ul>
  </article>
  <article class="card activity-card">
    <p class="eyebrow">Community</p>
    <h3>Organizer &amp; instructor</h3>
    <ul>
      <li>LAVA Workshop at ACCV 2024 and ACM MM 2025.</li>
      <li>APSIPA ASC 2026 Winter School 2: Foundation Models and Agentic AI.</li>
    </ul>
  </article>
</div>

</section>

<section class="contact-card" id="contact" aria-labelledby="contact-title">
  <div>
    <p class="eyebrow">Get in touch</p>
    <h2 id="contact-title">Research conversations welcome.</h2>
    <p>For research collaborations, talks, or academic inquiries, please contact me at:</p>
  </div>
  <div class="contact-card__email">
    <img class="contact-card__address" src="{{ '/images/email.png' | relative_url }}" alt="Email address, shown as an image. Use the buttons below to email or copy it." width="480" height="103" loading="lazy">
    <div class="contact-card__actions">
      <a class="button button--primary" href="#contact" data-email="{{ site.author.email_encoded }}">{% include icon.html name="mail" %}Send email</a>
      <button class="button" type="button" data-copy-email="{{ site.author.email_encoded }}" hidden>{% include icon.html name="copy" %}<span>Copy address</span></button>
    </div>
  </div>
</section>
