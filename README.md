# Huy H. Nguyen's academic website

Source for [honghuy127.github.io](https://honghuy127.github.io/), published with GitHub Pages and Jekyll.

## Updating content

Most content lives in YAML files under `_data/`; the pages render it.

- `_pages/about.md`: homepage introduction and academic activities.
- `_data/news.yml`: recent news. The homepage shows the latest five and expands the rest.
- `_data/publications.yml`: one entry per paper. Keep `id` stable, since it is the link anchor
  (`/publications/#id`). Add links under `links` (`paper`, `pdf`, `arxiv`, `doi`, `code`, `dataset`,
  `project`, `slides`, `video`, `book`). Set `selected: true` to feature a paper on the homepage.
  BibTeX for the Cite button is generated from these fields.
- `_data/research_topics.yml`: research themes used for homepage cards and publication filters.
- `_data/talks.yml`, `_data/grants.yml`, `_data/projects.yml`: the matching pages.
- `_config.yml` (`author`): name, positions, and profile links. The email address is stored only
  as `email_encoded` (generate it with `printf '%s' 'name@example.com' | rev | base64`) and shown
  on the homepage as `images/email.png`, so it never appears as readable text.
- Replace `files/CV.pdf` when publishing a new CV.

Publication filters can be linked directly, for example `/publications/?topic=deepfakes` or
`/publications/?type=journal`.

## GuardrailTrinity project page

The standalone page at `/guardrail-trinity/` uses `_pages/guardrail-trinity.html`
and `_layouts/project.html`. Edit authors, resource links, and BibTeX in
`_data/guardrail_trinity.yml`; its CSS and JavaScript are scoped to
`assets/css/guardrail-trinity.css` and `assets/js/guardrail-trinity.js`.

The public paper and citation are in `files/guardrail-trinity/`. Figures and the
social preview are in `assets/images/guardrail-trinity/`. Keep result wording and
figure captions consistent with the camera-ready manuscript. The walkthrough is
an authored illustration, not model inference. The page links only the paper
and code; no slides, poster, or recorded talk will be released. Each resource's
`kind` sets its card label, and the hero buttons look up the `paper` and `code`
entries by kind.

The layout check includes the project page. Use the full preflight below before
publication, including checks of the example controls, citation copying, and
light/dark appearance.

## Verification

GitHub Actions runs a lightweight YAML and front-matter check on pull requests and
pushes to `master`, using Ruby's standard library without installing gems. Obsolete
runs are cancelled. GitHub Pages continues to build and deploy from `master`.

Run the same quick check locally with:

```sh
ruby scripts/check_source.rb
```

Before committing or pushing, run the full local preflight:

```sh
bash scripts/verify_site.sh
```

This runs the source check, a strict Jekyll build, and an offline check of links in
the generated HTML. The link check skips external websites. If Playwright is installed, it
also renders every page at phone, tablet, and desktop widths in light and dark themes, fails
on JavaScript errors, missing files, or horizontal overflow, and saves screenshots to
`tmp/screenshots/`. Install it once with:

```sh
python3 -m pip install playwright
python3 -m playwright install chromium
``` Liquid, Sass, and generated
link errors are checked locally; the lightweight CI check does not cover them.

### Local setup on macOS

Install Ruby 3.3 and lychee once, then install the site's gems:

```sh
brew install ruby@3.3 lychee
export PATH="$(brew --prefix ruby@3.3)/bin:$PATH"
bundle config set --local path vendor/bundle
bundle install
```

Add the Ruby PATH setting to your shell configuration to use it in future sessions.
GitHub Pages manages production dependencies. The local Bundler configuration,
lockfile, and installed gems are ignored by Git.
