# Release Process

1. Ensure CI is green (lint, typecheck, build, smoke).
2. Update `CHANGELOG.md` with a new version section and notable changes.
3. Bump version in `package.json` if publishing a package; commit as `chore(release): vX.Y.Z`.
4. Create a GitHub release tag `vX.Y.Z` with notes.
5. Announce updates in README/docs if user-facing changes occurred. 