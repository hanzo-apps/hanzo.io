# hanzo.io

The 2016 Hanzo marketing site. Last substantive commit is 2018-04-19 ("Revert to
old design, no redirects"); everything since is documentation.

## We do not control this domain

`hanzo.io` is a parked, for-sale domain. Its nameservers are
`ns1.afternic.com` / `ns2.afternic.com`, `https://hanzo.io/` answers with a
114-byte stub that redirects to `/lander`, and `/lander` 307s to
`forsale.godaddy.com/forsale/hanzo.io`.

So this repo gets **no Dockerfile, no deploy workflow, and no App CR**. Building
an image and declaring an ingress host would only produce something that can
never answer, on a name that is not ours. That is the whole reason this repo's
migration looks different from its siblings (hanzo.sh, hanzo.network, hanzo.one),
which are Pages/CF-Pages kills with a real host to take over.

The correct next step is to archive the repo, or reacquire the domain first.

## What migration did happen

`.github/workflows/` now holds `sync.yml` and nothing else — the one workflow
GitHub is permitted to run, which carries pushed refs to git.hanzo.ai, the
canonical forge. There is nothing for it to build there; the repo is code at rest.

`circle.yml` was deleted: a three-line CircleCI stub pinning `node: 5.1.0`, for a
CI service we do not use and have never run this repo on. There has never been a
GitHub Actions run in this repo, so nothing was moved — there was nothing to move.

## Stack (historical)

CoffeeScript, built by `sake-cli` (`Sakefile`) which shells out to `bebop
compile`. `.nvmrc` pins Node 5.1.0. Sources in `src/`, output for `bebop` to
serve.

```bash
npm install
npm run build   # sake build -> bebop compile
```

This toolchain is a decade old and is not expected to run on a current Node.
