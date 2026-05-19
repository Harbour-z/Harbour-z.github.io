"""Fetch Google Scholar statistics with retry + graceful failure.

If the fetch fails (rate limit, network error, etc.), exit with non-zero so
the CI step is visible in the workflow run, but do NOT overwrite an existing
``results/gs_data.json`` — the previous successful payload is preserved.
"""

import json
import os
import sys
import time
from datetime import datetime

from scholarly import scholarly

MAX_RETRIES = 3
RETRY_BACKOFF_SEC = 30


def fetch_author(scholar_id: str) -> dict:
    last_err: Exception | None = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            author = scholarly.search_author_id(scholar_id)
            scholarly.fill(
                author,
                sections=['basics', 'indices', 'counts', 'publications'],
            )
            return author
        except Exception as exc:  # noqa: BLE001 — broad on purpose
            last_err = exc
            print(
                f'[scholar] attempt {attempt}/{MAX_RETRIES} failed: {exc}',
                file=sys.stderr,
            )
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_BACKOFF_SEC * attempt)
    raise RuntimeError(
        f'scholarly fetch failed after {MAX_RETRIES} retries') from last_err


def main() -> int:
    scholar_id = os.environ.get('GOOGLE_SCHOLAR_ID')
    if not scholar_id:
        print('[scholar] GOOGLE_SCHOLAR_ID not set', file=sys.stderr)
        return 1

    os.makedirs('results', exist_ok=True)

    try:
        author = fetch_author(scholar_id)
    except Exception as exc:  # noqa: BLE001
        print(
            f'[scholar] giving up, keeping previous data: {exc}', file=sys.stderr)
        # Do not overwrite previous results on failure.
        return 1

    author['updated'] = str(datetime.now())
    author['publications'] = {v['author_pub_id']
        : v for v in author['publications']}
    print(json.dumps(author, indent=2))

    with open('results/gs_data.json', 'w') as outfile:
        json.dump(author, outfile, ensure_ascii=False)

    shieldio_data = {
        'schemaVersion': 1,
        'label': 'citations',
        'message': f"{author.get('citedby', 0)}",
    }
    with open('results/gs_data_shieldsio.json', 'w') as outfile:
        json.dump(shieldio_data, outfile, ensure_ascii=False)

    return 0


if __name__ == '__main__':
    sys.exit(main())
