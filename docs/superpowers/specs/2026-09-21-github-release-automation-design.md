# GitHub and npm release automation design

## Goal

Host `neobrut-vue` in a public GitHub repository and publish `@neobrut-vue/core` from GitHub Actions without a stored npm write token. The first automated release will be `0.1.1`.

## Repository

GitHub CLI will authenticate interactively. The authenticated account returned by `gh api user --jq .login` will own a new public repository named `neobrut-vue`.

The current history will become the repository's `main` branch. The repository URL will be the single source for package metadata, README links, issues, and npm provenance.

## Package and documentation

`package.json` will move from `0.1.0` to `0.1.1` and add:

- `repository` pointing to the exact GitHub repository URL;
- `homepage` pointing to the repository README;
- `bugs` pointing to GitHub Issues.

The README will add npm version, CI, and license badges plus direct links to npm, GitHub, and Issues. The changelog will record the metadata and automation work under `0.1.1`. No temporary ngrok URL will be published as a permanent project link.

## Continuous integration

`.github/workflows/ci.yml` will run for pull requests and pushes to `main`. It will:

1. check out the repository;
2. install Bun;
3. install dependencies with the frozen lockfile;
4. run `bun run check`, which executes tests, TypeScript validation, and the production build.

Workflow permissions will be read-only.

## Continuous delivery

`.github/workflows/publish.yml` will run only for tags matching `v*`. It will use a GitHub-hosted runner, Node 24, a current npm CLI that supports trusted publishing, and Bun for the existing build lifecycle.

The workflow will grant only `contents: read` and `id-token: write`. `npm publish --access public` will use npm trusted publishing through OIDC. No npm token will be created or stored. npm will generate package provenance automatically because both the repository and package are public.

The npm trusted publisher will be restricted to the exact GitHub owner, repository, and `publish.yml` workflow, with direct publish permission.

## Release flow

For `0.1.1`:

1. authenticate GitHub CLI;
2. create and push the public repository;
3. configure the npm trusted publisher;
4. verify CI succeeds on `main`;
5. create and push tag `v0.1.1`;
6. wait for the publish workflow;
7. verify npm reports `0.1.1` as `latest` and the package page links back to GitHub.

Future releases will update the package version and changelog, merge to `main`, then push a matching version tag.

## Failure handling

- Repository creation stops if GitHub authentication fails or the repository name is already owned by another project.
- Trusted publisher setup stops if npm cannot match the exact public repository and workflow filename.
- CI or publish failures do not trigger a manual fallback publish; the workflow error is fixed and the same unpublished version is retried.
- A tag is not created until the repository, package metadata, workflows, and local checks are complete.
- npm publication is verified from the public registry before the release is declared complete.

## Verification

- Local `bun run check` passes.
- `npm pack --dry-run` contains only the documented release files and generated distribution.
- GitHub CI succeeds on `main`.
- The tag-triggered publish workflow succeeds with OIDC and provenance.
- `npm view @neobrut-vue/core@0.1.1` returns the new release.
- The local working tree is clean and the remote `main` and `v0.1.1` tag resolve to the intended commits.
