---
title: Accessibility checks in CI
description: Run Lumtera in a CI pipeline with WP-CLI. Fail the build on new accessibility errors with a baseline, and report every issue to GitHub code scanning (SARIF) or as JUnit test results in GitLab, Jenkins and similar tools.
---

# Accessibility checks in CI

Lumtera's [WP-CLI commands](/developers/wp-cli) can run in a CI pipeline. The build fails when a page has an accessibility error, and each issue shows up in your CI tool's report.

| Command | What it checks | Exit code |
| --- | --- | --- |
| `wp lumtera check --page=<url>` | One page of the site, fetched and checked as a visitor gets it, with the theme, menus and footer. Nothing is stored. | `0`, `1` or `2` (see [below](#exit-codes)) |
| `wp lumtera issues` | Every issue already stored from checks of saved content | `0` unless you pass `--fail-on`; `2` for a bad option or baseline |

Both commands can write two report formats:

- `--format=sarif`: [SARIF 2.1.0](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html), for GitHub code scanning and other SARIF viewers.
- `--format=junit`: JUnit XML, for GitLab, Jenkins, Azure Pipelines, CircleCI and similar tools.

What each format contains is described in [WP-CLI: SARIF and JUnit](/developers/wp-cli#sarif-and-junit).

## Exit codes

`wp lumtera check` exits with:

| Code | Meaning |
| --- | --- |
| `0` | No issue at or above `--fail-on` (default: `error`) |
| `1` | At least one issue at or above `--fail-on` |
| `2` | Lumtera couldn't use the input: the page was refused, couldn't be fetched or didn't return HTTP 200, the input was empty or over 5 MB, `--fail-on` was invalid, a baseline or `--rendered` file couldn't be read or isn't in the right format, the baseline couldn't be written, or `--stored` / `--rendered` was used without `--page` |

- The exit code is the same for every `--format`, so you can upload the report and still fail the job.
- `--fail-on` takes `error`, `warning` (also fails on "Needs review"), `notice` (also fails on tips) or `none` (never fails).
- WP-CLI itself exits with `1` for an unknown option or `--format` value. Test your command once by hand before relying on the difference between `1` and `2`.

`wp lumtera issues` exits with `0` whatever it finds, unless you pass `--fail-on` (default `none`). With `--fail-on=error` it exits with `1` when a stored issue at or above that severity is listed, in every format, so you can write SARIF or JUnit and still fail the job. With `--baseline`, only new issues count. Once `--write-baseline` has written its file, it exits with `0`. It exits with `2` for a bad option value (an unknown `--rule`, a `--post_type` Lumtera doesn't check, an invalid `--fail-on`) or a baseline that can't be read or written, so a typo never looks like issues found.

## Fail only on new issues: baselines {#baselines}

An existing site usually has issues nobody can fix this week. A baseline records them, so the build fails only when something new appears.

```sh
# Once: record what is there today, and commit the file.
wp lumtera check --page=/ --write-baseline=.lumtera-baseline.json

# In CI: known issues are left out, and only new ones count towards the exit code.
wp lumtera check --page=/ --baseline=.lumtera-baseline.json
wp lumtera issues --baseline=.lumtera-baseline.json --fail-on=error
```

::: tip With an SSH alias, files are on the server
`wp @staging …` runs on the staging server, so the paths in `--baseline` and `--write-baseline` are paths on that server. Two ways to keep the baseline in your repository:

- Record it as SARIF, which comes back over SSH on standard output: `wp @staging lumtera check --page=/ --format=sarif > .lumtera-baseline.sarif`. A SARIF log works as a baseline.
- Before the check, copy the committed file to the server, for example `scp .lumtera-baseline.sarif deploy@staging.example.com:/tmp/`, and pass `--baseline=/tmp/.lumtera-baseline.sarif`.
:::

- The baseline is a small JSON file in the `lumtera-baseline/v1` format. `--write-baseline` exits with `0` once it's written. See [WP-CLI: Baselines](/developers/wp-cli#baselines) for the format.
- An issue is matched by the check, the offending markup and where it was found (the page URL, or the item's permalink for `issues`). Changing the markup or the page makes it new. Write one baseline file per page, or keep the same `--page` value from run to run.
- A SARIF log from an earlier run also works as a baseline. That's handy if you already keep reports as build artifacts.
- In SARIF output every result is kept and marked `baselineState`: `new` or `unchanged`. GitHub code scanning then shows the known issues without treating them as new. In table, JSON, CSV and JUnit output, unchanged issues are left out.
- A summary line reports how many were new, unchanged or no longer found. It goes to standard error for every format except `table`, so it never gets into the report file.
- A baseline file that can't be read, or isn't a Lumtera baseline, exits with `2`. It never counts as an empty baseline that would pass everything.

When you fix issues, write the baseline again so the file stays small. When you accept a new issue on purpose, do the same.

## Pointing WP-CLI at the site

`--page` only accepts pages of the site WP-CLI runs against: a path such as `/pricing/`, or a full URL with the same host and port as the site's home URL. The page is fetched by the server that runs WP-CLI, so point WP-CLI at the site you want to check.

For a staging server, add an [SSH alias](https://make.wordpress.org/cli/handbook/guides/running-commands-remotely/) to `wp-cli.yml` in your repository:

```yaml
# wp-cli.yml
@staging:
  ssh: deploy@staging.example.com/var/www/html
```

Then `wp @staging lumtera check --page=/` runs on the staging server. The report comes back over SSH on standard output, with the exit code.

Requirements:

- WP-CLI is installed in CI and on the staging server (as `wp` on the server's `PATH`).
- Lumtera is active on the staging site.
- The staging server can load its own pages over HTTP. If staging is behind HTTP authentication or an IP allow list that blocks the server itself, `check --page` gets an error status and exits with `2`.

## GitHub Actions: code scanning

This workflow checks four pages of a staging site, uploads each report to **Security → Code scanning**, and fails when a page has an error.

Set these first, under <span class="screen-path">Settings → Secrets and variables → Actions</span>:

- The `STAGING_SSH_KEY` secret: a private key the staging server accepts.
- The `STAGING_HOST` variable: for example `staging.example.com`.

Save as `.github/workflows/accessibility.yml`, next to the `wp-cli.yml` above:

```yaml
name: Accessibility

on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: "0 6 * * 1" # Mondays, 06:00 UTC
  workflow_dispatch:

permissions:
  contents: read
  security-events: write # upload SARIF to code scanning

jobs:
  lumtera:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        page: ["/", "/about/", "/contact/", "/shop/"]
    steps:
      - uses: actions/checkout@v5

      - name: Install WP-CLI
        run: |
          curl -sSLo wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
          chmod +x wp-cli.phar
          sudo mv wp-cli.phar /usr/local/bin/wp

      - name: SSH access to staging
        run: |
          install -m 700 -d ~/.ssh
          echo "${{ secrets.STAGING_SSH_KEY }}" > ~/.ssh/id_ed25519
          chmod 600 ~/.ssh/id_ed25519
          ssh-keyscan -H "${{ vars.STAGING_HOST }}" >> ~/.ssh/known_hosts

      - name: Check ${{ matrix.page }}
        id: check
        run: |
          set +e
          wp @staging lumtera check --page="${{ matrix.page }}" --format=sarif > lumtera.sarif
          echo "code=$?" >> "$GITHUB_OUTPUT"

      - name: Upload to code scanning
        if: always() && steps.check.outputs.code != '2'
        uses: github/codeql-action/upload-sarif@v4
        with:
          sarif_file: lumtera.sarif
          # One category per page, so each page's alerts are tracked separately.
          category: lumtera${{ matrix.page }}

      - name: Fail on accessibility errors
        if: steps.check.outputs.code != '0'
        run: |
          echo "::error::Lumtera exit code ${{ steps.check.outputs.code }} for ${{ matrix.page }}"
          exit 1
```

`set +e` stops the step from ending at the first non-zero exit, so the exit code is saved for the later steps. When the code is `2`, there's no report to upload, and the last step fails the job.

Alerts show up under **Security → Code scanning**. Filter them by the tool "Lumtera". Each alert's location is the page URL, not a file in your repository, so it has no source line to link to. Use the markup snippet in the alert, and the check's help link, to find the problem in your theme or content.

To fail on "Needs review" findings too, add `--fail-on=warning`. To report without ever failing, add `--fail-on=none`. To fail only on new issues, commit a [baseline](#baselines), copy it to the server in an earlier step, and add `--baseline=<file>` to the check step. The upload still includes the known issues, marked `unchanged`.

::: tip Code scanning availability
Code scanning is free for public repositories. Private repositories need GitHub Code Security. Without it, keep the report as a build artifact instead of the upload step:

```yaml
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: lumtera-sarif-${{ strategy.job-index }}
          path: lumtera.sarif
```
:::

Pull requests from forks don't get `security-events: write`, so the upload step fails for them. Run the workflow on `push` and `schedule` only if your repository takes pull requests from forks.

### Report the whole site's stored results

`wp lumtera issues` reports what Lumtera stored when content was saved, or checked from the Overview. To report all of it in one upload, check everything first:

```yaml
      - name: Check all content on staging
        run: |
          wp @staging lumtera scan --all --format=summary
          wp @staging lumtera issues --format=sarif > lumtera-content.sarif

      - uses: github/codeql-action/upload-sarif@v4
        with:
          sarif_file: lumtera-content.sarif
          category: lumtera-content
```

Each alert's location is the item's permalink. `scan` stores new results on the staging site, like saving each post would. It doesn't send [Pro alerts](/pro/monitoring). Add `wp @staging lumtera scan --parts` to check the header, footer, menus and other [site parts](/site-parts) as well.

To fail the job on stored errors that are new since a baseline (a file already on the server, as above):

```sh
wp @staging lumtera issues --baseline=/tmp/.lumtera-content-baseline.sarif --fail-on=error --format=junit > lumtera-content.xml
```

### Adding what a browser measured

`check --page` reads the HTML the server sends, so contrast from theme styles, keyboard focus and layout aren't in it. Add `--stored` to include the last results a browser stored for that URL: from [review mode](/review-mode) with **Save results to reports** ticked, or from [Pro page checks](/pro/page-checks). The note on standard error says how many were added, or that none are stored yet.

```sh
wp @staging lumtera check --page=/pricing/ --stored --format=sarif > lumtera.sarif
```

::: info Coming
A ready-made GitHub Action, with a browser runner that checks rendered pages in CI and feeds `wp lumtera check --rendered`, is coming. It isn't published yet, so use the WP-CLI workflows on this page for now.
:::

## GitHub Actions without a staging server

If your theme is in the repository, you can check it in a throwaway WordPress started by [`@wordpress/env`](https://www.npmjs.com/package/@wordpress/env).

::: warning Not available yet
This recipe installs Lumtera from WordPress.org. Lumtera isn't live on WordPress.org yet, so `downloads.wordpress.org/plugin/lumtera.zip` returns "not found" and `wp-env start` fails. Until it is, point `plugins` at a copy of the Lumtera plugin folder you keep yourself, for example `"./vendor/lumtera"`.
:::

Add a `.wp-env.json`:

```json
{
  "core": null,
  "themes": ["."],
  "plugins": ["https://downloads.wordpress.org/plugin/lumtera.zip"],
  "mappings": { "wp-content/lumtera-ci": "./lumtera-ci" }
}
```

`wp-env` runs WP-CLI in a separate container that can't load the site's own address, so `--page` doesn't work there. Fetch the page on the runner instead, save it in the mapped folder, and check the file:

```yaml
      - uses: actions/setup-node@v5
        with:
          node-version: 22

      - name: Start WordPress
        run: |
          mkdir -p lumtera-ci
          npx @wordpress/env start

      - name: Check the home page
        id: check
        run: |
          set +e
          curl -sSf http://localhost:8888/ -o lumtera-ci/home.html
          npx @wordpress/env run cli wp lumtera check wp-content/lumtera-ci/home.html --format=sarif > lumtera.sarif
          echo "code=$?" >> "$GITHUB_OUTPUT"
          jq -e '.runs[0].tool.driver.name == "Lumtera"' lumtera.sarif > /dev/null && echo "sarif=yes" >> "$GITHUB_OUTPUT"

      - uses: github/codeql-action/upload-sarif@v4
        if: always() && steps.check.outputs.sarif == 'yes'
        with:
          sarif_file: lumtera.sarif
          category: lumtera-home

      - if: steps.check.outputs.code != '0'
        run: exit 1
```

- The `jq` line confirms the file holds only the report, and not `wp-env`'s own messages.
- A fresh site has little content. Import test content after `start` if your pages need it, for example with `npx @wordpress/env run cli wp import`.
- The alert location is the file path, `wp-content/lumtera-ci/home.html`.
- Add `lumtera-ci/` to `.gitignore`.
- This runs the WP-CLI checks of the served HTML only. Checks that need a rendered page aren't included.

## GitLab CI

GitLab shows JUnit reports in merge requests and on the pipeline's **Tests** tab. This job checks several pages on staging, reports them as JUnit, and keeps SARIF files as artifacts too.

Set these CI/CD variables first:

- `STAGING_SSH_KEY`: a private key, of type **File**.
- `STAGING_HOST`: for example `staging.example.com`.

The `wp-cli.yml` alias from [Pointing WP-CLI at the site](#pointing-wp-cli-at-the-site) must be in the repository.

```yaml
# .gitlab-ci.yml
accessibility:
  stage: test
  image: php:8.3-cli
  variables:
    PAGES: "/ /about/ /contact/"
  before_script:
    - apt-get update -qq && apt-get install -y -qq openssh-client curl > /dev/null
    - curl -sSLo /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && chmod +x /usr/local/bin/wp
    - install -m 700 -d ~/.ssh
    - install -m 600 "$STAGING_SSH_KEY" ~/.ssh/id_ed25519
    - ssh-keyscan -H "$STAGING_HOST" >> ~/.ssh/known_hosts
  script:
    - mkdir -p reports
    - status=0
    - |
      for page in $PAGES; do
        name=$(echo "$page" | tr -c 'a-zA-Z0-9\n' '-')
        wp @staging lumtera check --page="$page" --format=junit > "reports/lumtera${name}.xml" || status=1
        wp @staging lumtera check --page="$page" --format=sarif --fail-on=none > "reports/lumtera${name}.sarif"
      done
    - exit $status
  artifacts:
    when: always
    paths:
      - reports/
    reports:
      junit: reports/*.xml
```

- JUnit failures are the issues at or above `--fail-on`. Everything else is listed as skipped, with its details in the test's output.
- Each page is fetched twice: once for each format. The SARIF run uses `--fail-on=none`, so only the JUnit run decides the result.
- If a page can't be fetched, the SARIF line exits with `2` and the job stops there.

## Other CI tools

Any tool that reads JUnit XML works the same way. Examples are Jenkins' `junit` step, Azure Pipelines' `PublishTestResults` task and CircleCI's `store_test_results`. Run:

```sh
wp @staging lumtera check --page=/ --format=junit > lumtera.xml
```

Then publish `lumtera.xml` as a test result, and use the exit code to pass or fail the build.

## Audit mode {#audit-mode}

Review mode and Pro page checks run Lumtera's browser engine on a page loaded in **audit mode**: the page's address with `?lumtera-audit=<nonce>` added.

- It works only for a signed-in user who may use review mode, with a nonce made for that user. People who can see the site-wide reports may audit any page. Anyone else may audit only a page that shows a post they can edit.
- The admin bar is left out, so the page is laid out as visitors see it.
- The response is excluded from page caches.
- The engine's scripts are added, and a `lumtera-audit-ready` event fires on `window` once they have loaded. `window.lumteraAudit` then runs the checks. See [Hooks: JavaScript](/developers/hooks#javascript).

Visitors never get any of this. Without a valid nonce and the capability, the request is left exactly as it was.

## Limits

- `check` reads the HTML as served. It doesn't run JavaScript or load CSS, so it can't measure rendered color contrast or layout. [Review mode](/review-mode) and [Pro page checks](/pro/page-checks) measure those in a browser, and `--stored` adds their results.
- Automated checks find only some accessibility barriers. A clean report doesn't mean a page is accessible or conforms to WCAG. Keep testing key pages by hand: use only the keyboard, zoom to 200% and try a screen reader. See [Manual testing](/manual-testing).
