---
permalink: /
title:
excerpt: "Research in AI safety, security, privacy, and multimedia forensics."
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<section class="home-hero" aria-labelledby="home-title">
  <p class="home-hero__eyebrow">Researcher · Tokyo, Japan</p>
  <h1 id="home-title">Huy H. Nguyen</h1>
  <p class="home-hero__lead">Research in AI safety, security, privacy, and multimedia forensics.</p>
  <p class="home-hero__affiliations">Researcher at SB Intuitions · Visiting Associate Professor at the National Institute of Informatics</p>
  <div class="home-hero__actions">
    <a class="home-button home-button--primary" href="{{ '/files/CV.pdf' | relative_url }}">View CV <span aria-hidden="true">↗</span></a>
    <a class="home-button" href="https://scholar.google.com/citations?user=8q1km_cAAAAJ&amp;hl=en">Google Scholar <span aria-hidden="true">↗</span></a>
  </div>
</section>

<section class="home-introduction" aria-label="About Huy" markdown="1">

I am **Huy H. Nguyen** (Nguyễn Hồng Huy in Vietnamese), a researcher at [**SB Intuitions**](https://www.sbintuitions.co.jp/) (a SoftBank Group company) and a visiting associate professor at the [**National Institute of Informatics (NII)**](https://www.nii.ac.jp/en/), Japan. Previously, I was a project assistant professor (特任助教) at [Echizen Laboratory](https://research.nii.ac.jp/~iechizen/official/index-e.html), NII.

I received a B.S. degree through the honors program at [VNUHCM - University of Science](https://en.hcmus.edu.vn/), Vietnam, in 2013, and a Ph.D. from [The Graduate University for Advanced Studies, SOKENDAI](https://www.soken.ac.jp/en/), in alliance with the [National Institute of Informatics](https://www.nii.ac.jp/en/), Japan, in 2022.

</section>

<section class="home-section" aria-labelledby="news-title">

<h2 id="news-title">Recent news</h2>

{% assign news = site.data.news | sort: 'date' | reverse %}
<ol class="news-timeline">
{% for item in news limit: 4 %}
  <li>
    <time datetime="{{ item.date }}">{{ item.date | date: "%b %Y" }}</time>
    <div>
      <h3>{% if item.url %}<a href="{{ item.url }}">{{ item.title }}</a>{% else %}{{ item.title }}{% endif %}</h3>
      {% if item.summary %}<p>{{ item.summary }}</p>{% endif %}
    </div>
  </li>
{% endfor %}
</ol>

<p class="home-section__more">Explore the full record in <a href="{{ '/publications/' | relative_url }}">publications</a> and <a href="{{ '/talks/' | relative_url }}">talks</a>.</p>

</section>

<!-- Historical news retained for reference.
1. Three deepfake papers were accepted to IJCB 2024.
1. Two papers ([spurious feature generation](https://arxiv.org/abs/2402.08200), [defense against physical adversarial attacks on infrared domain](https://arxiv.org/abs/2309.15519)) were accepted to ICIP 2024.
1. Two papers ([eKYC-Deepfake dataset](https://ieeexplore.ieee.org/document/10444105) and [a comparative study of fine-grained counting methods](https://ieeexplore.ieee.org/document/10440103)) were published in IEEE Access.
1. A paper about [watermarking for LLMs](https://gitlab.com/folbaeni/linguistic-watermark) was accepted to ICASSP 2024.
1. Two NLP papers ([detecting academic AI text](https://arxiv.org/abs/2401.08046) and multimodal out-of-context detection) were accepted to AINA 2024.
1. Our pioneer work on deepfake restoration, namely Cyber Vaccine, was published in [IEEE Access](https://ieeexplore.ieee.org/abstract/document/10238689).
1. Our work on measuring the similarities between other computer vision tasks to deepfake detection was accepted to IJCB 2023 ([arXiv](https://arxiv.org/abs/2310.00922)). 
1. Our collaborative paper on physics-based adversarial attack on near-infrared human detector with [Oscars Lab](https://oscarslab.github.io/aboutus.html) at the University of Tokyo was accepted to ACM Multimedia 2023 ([DOI](https://doi.org/10.1145/3581783.3612082), [implementation](https://github.com/MyNiuuu/AdvNIR)).
1. Our paper on adversarial image purification was accepted to IEEE Open Journal of Signal Processing ([paper](https://ieeexplore.ieee.org/document/10123077), source code will be published soon).
1. Two papers were accepted to WACV 2023. One is about master vein attacks on finger vein recognition systems ([arXiv](http://arxiv.org/abs/2210.10667)); the other is about the theory of the non-robust features on the transferability of adversarial examples ([arXiv](https://arxiv.org/abs/2112.14337)).
1. Our work on applying adversarial machine learning for privacy protection was accepted to [WIFS 2022](https://arxiv.org/abs/2206.14020). Another work on the same topic was previously published in [CVPRW 2021](https://openaccess.thecvf.com/content/CVPR2021W/WMF/papers/Treu_Fashion-Guided_Adversarial_Attack_on_Person_Segmentation_CVPRW_2021_paper.pdf).
1. Our premier work on master faces was published in [IJCB 2020](https://ieeexplore.ieee.org/document/9304893) ([arXiv](https://arxiv.org/abs/2006.08376)) and [IEEE T-BIOM](https://ieeexplore.ieee.org/document/9758063) ([arXiv](https://arxiv.org/abs/2109.03398))
1. Our book chapters on deepfake detection were published in [Handbook of Digital Face Manipulation and Detection - From DeepFakes to Morphing Attacks](https://link.springer.com/book/10.1007/978-3-030-87664-7) ([implementation](https://github.com/nii-yamagishilab/Capsule-Forensics-v2)) and [Frontiers in Fake Media Generation and Detection](https://link.springer.com/book/9789811915239).
1. Our paper on the [OpenForensics dataset](https://zenodo.org/record/5528418#.Ylay4JNBz0o) was published in [ICCV 2021](https://openaccess.thecvf.com/content/ICCV2021/papers/Le_OpenForensics_Large-Scale_Challenging_Dataset_for_Multi-Face_Forgery_Detection_and_Segmentation_ICCV_2021_paper.pdf) ([implementation](https://github.com/ltnghia/openforensics)).
1. Our early work on deepfake detection and segmentation was published in [ICASSP 2019](https://ieeexplore.ieee.org/document/8682602) ([arXiv](https://arxiv.org/abs/1810.11215), [implementation](https://github.com/nii-yamagishilab/Capsule-Forensics)) and [BTAS 2019](https://ieeexplore.ieee.org/document/9185974) ([arXiv](https://arxiv.org/abs/1906.06876), [implementation](https://github.com/nii-yamagishilab/ClassNSeg)).

-->

<section class="home-section" aria-labelledby="activities-title">

<h2 id="activities-title">Academic activities</h2>

<div class="activity-grid">
  <article class="activity-card">
    <p class="activity-card__label">Service</p>
    <h3>Reviewer</h3>
    <p><strong>Conferences:</strong> NeurIPS, ICLR, ICML, CVPR, ECCV, WACV, ICME, ACL RR, APSIPA ASC.</p>
    <p><strong>Journals:</strong> IEEE Access, TIP, TIFS, IEEE/CAA JAS, ACM TOMM, Elsevier, EURASIP JIVP, and IEICE.</p>
  </article>
  <article class="activity-card">
    <p class="activity-card__label">Chairing</p>
    <h3>Session chair</h3>
    <ul>
      <li>APSIPA ASC 2020: Deep Generative Models for Media Clones and Its Detection.</li>
      <li>APSIPA ASC 2023: Multimedia Security and Privacy in the Age of Deep Learning.</li>
    </ul>
  </article>
  <article class="activity-card">
    <p class="activity-card__label">Community</p>
    <h3>Organizer &amp; instructor</h3>
    <ul>
      <li>LAVA Workshop at ACCV 2024 and ACM MM 2025.</li>
      <li>APSIPA ASC 2026 Winter School 2: Foundation Models and Agentic AI.</li>
    </ul>
  </article>
</div>

</section>

<section class="contact-card" aria-labelledby="contact-title">
  <div>
    <p class="contact-card__eyebrow">Get in touch</p>
    <h2 id="contact-title">Research conversations welcome.</h2>
    <p>For research collaborations, talks, or academic inquiries, please contact me at:</p>
  </div>
  <img src="{{ '/images/email.png' | relative_url }}" alt="Email address: huyhnguyen.work (at) gmail (dot) com" width="320" height="70">
</section>
