#!/usr/bin/env bash
# Full local preflight. No tool installation; link checking runs offline.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."

ruby scripts/check_source.rb

if ! ruby -e 'exit(Gem::Version.new(RUBY_VERSION) >= Gem::Version.new("3.3") ? 0 : 1)'; then
  echo "Full verification requires Ruby 3.3 or newer. See README.md for local setup." >&2
  exit 1
fi

for tool in bundle lychee; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "Missing $tool. See README.md for local setup." >&2
    exit 1
  fi
done

if ! bundle check; then
  echo "Install site dependencies with bundle install, then rerun this script." >&2
  exit 1
fi

bundle exec jekyll build --strict_front_matter
lychee --offline --no-progress --root-dir "$PWD/_site" "$PWD/_site/**/*.html"

if python3 -c "import playwright" >/dev/null 2>&1; then
  python3 scripts/check_layout.py
else
  echo "Skipping layout check: install Playwright to enable it (see README.md)."
fi
