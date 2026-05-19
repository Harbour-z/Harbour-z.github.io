#!/usr/bin/env bash
set -euo pipefail

# Local development server for the Jekyll site.
# Override the host/port via env vars if needed:
#   HOST=0.0.0.0 PORT=4001 ./run_server.sh
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-4000}"

bundle exec jekyll serve --livereload --host "${HOST}" --port "${PORT}"