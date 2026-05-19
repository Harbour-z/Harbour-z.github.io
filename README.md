<h1 align="center">
Zhidong Zhang · Academic Homepage
</h1>

<div align="center">

[![](https://img.shields.io/github/stars/Harbour-z/Harbour-z.github.io)](https://github.com/Harbour-z/Harbour-z.github.io)
[![](https://img.shields.io/github/forks/Harbour-z/Harbour-z.github.io)](https://github.com/Harbour-z/Harbour-z.github.io)
[![](https://img.shields.io/github/issues/Harbour-z/Harbour-z.github.io)](https://github.com/Harbour-z/Harbour-z.github.io)
[![](https://img.shields.io/github/license/Harbour-z/Harbour-z.github.io)](./LICENSE)  | [中文文档](./docs/README-zh.md)

</div>

<p align="center">A Modern and Responsive Academic Personal Homepage · Live at <a href="https://zhidongzhang.top">zhidongzhang.top</a></p>

<p align="center">
    <br>
    <img src="docs/screenshot.png" width="100%"/>
    <br>
</p>

## 👋 Welcome!

I am now a third-year undergraduate at [Xi'an Jiaotong University](http://en.xjtu.edu.cn/), [School of Software Engineering](https://se.xjtu.edu.cn/), majoring in Software Engineering.

I am continuously improving my programming and development skills.

**Research Interests:** AI Agent · Artificial Intelligence · AI Safety

> I believe **AI agents** are the bridge that turns the powerful capabilities of large models into real-world impact — connecting reasoning, perception and action with concrete deployment scenarios.

I am also an enthusiastic self-learner and interested in various fields of computer science. I keep my [learning notes](https://zhidongzhang.top/Course_learning/) online.

## ✨ Key Features

- **Automatically update Google Scholar citations** via the built-in crawler and GitHub Actions — both author-level and per-paper citations stay in sync.
- **Bilingual (English / 中文)** content with a one-click language switcher and a dark / light theme toggle.
- **Optional Google Analytics** for traffic insight (off by default for privacy).
- **Responsive design** that adapts to phones, tablets and desktops.
- **SEO-ready** with semantic markup, sitemap, RSS feed and per-page titles.
- **Clean academic look** that is easy to extend with publications, internships and awards.

## 🚀 Quick Start (fork & customize)

1. Fork this repo and rename it to `USERNAME.github.io`, where `USERNAME` is your GitHub username.
2. Configure the Google Scholar citation crawler:
    1. Find your Google Scholar ID in the URL of your Scholar page (e.g. `https://scholar.google.com/citations?user=SCHOLAR_ID`).
    2. In `Settings -> Secrets and variables -> Actions -> New repository secret`, add `name=GOOGLE_SCHOLAR_ID` and `value=SCHOLAR_ID`.
    3. Open the `Actions` tab and enable workflows. The crawler runs daily at 08:00 UTC and on every push to `main`, writing `gs_data.json` to the `google-scholar-stats` branch.
3. Generate favicons via [favicon-generator](https://redketchup.io/favicon-generator) and drop them into `images/`.
4. Edit `_config.yml`:
    1. `title`, `description`, `repository` (`USERNAME/REPO_NAME`).
    2. `google_analytics_id` (optional).
    3. SEO verification keys (optional).
    4. `author.*` for your contact, social and academic profiles.
    5. `footer_links` for the footer Quick-Links section.
5. Add your homepage content in `_pages/about.md` (English) and `_pages/about-cn.md` (Chinese). HTML + Markdown both work.
    - To show per-paper citations, drop a `<span>` like:
      ```html
      <span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span>
      ```
      Get the paper ID from the `citation_for_view=...` part of the paper URL on your Scholar page.
6. The site will publish at `https://USERNAME.github.io` (or your custom domain via `CNAME`).

## 🛠 Debug Locally

1. Clone the repo: `git clone https://github.com/Harbour-z/Harbour-z.github.io`.
2. Install the Jekyll toolchain — `Ruby`, `RubyGems`, `GCC`, `Make` — following the [official guide](https://jekyllrb.com/docs/installation/#requirements).
3. Run `bash run_server.sh` to start the Jekyll livereload server (host/port configurable via `HOST=... PORT=... ./run_server.sh`).
4. Open <http://127.0.0.1:4000> in your browser. Edits hot-reload automatically.
5. When happy, `commit` and `push` — GitHub Actions will build and deploy.

## 🙏 Acknowledgements

- This homepage is forked from [RayeRen/acad-homepage.github.io](https://github.com/RayeRen/acad-homepage.github.io), distributed under the MIT License — many thanks to the original author.
- It incorporates Font Awesome, distributed under the SIL OFL 1.1 and MIT License.
- It is influenced by [mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes) (MIT) and [academicpages/academicpages.github.io](https://github.com/academicpages/academicpages.github.io) (MIT).
