# Huy H. Nguyen's academic website

Source for [honghuy127.github.io](https://honghuy127.github.io/), published with GitHub Pages and Jekyll.

## Updating content

- Edit the homepage in `_pages/about.md`.
- Add or update recent items in `_data/news.yml`.
- Update publications, talks, projects, and grants in their matching files under `_pages/`.
- Replace `files/CV.pdf` when publishing a new CV.

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
the generated HTML. The link check skips external websites. Liquid, Sass, and generated
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
