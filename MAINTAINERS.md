# Maintainers Guide

## Roles
- Maintainers: triage issues, review PRs, manage releases
- Contributors: propose changes via PRs and issues

## Triage Policy
- Label new issues within 48 hours (e.g., `bug`, `enhancement`, `tool`, `docs`, `tutorial`, `hackathon`, `good first issue`, `help wanted`)
- Request minimal reproducible examples for bugs
- Convert vague requests into actionable tasks or close with guidance

## PR Review Policy
- CI must pass (lint, typecheck, build, smoke)
- Prefer small, focused PRs; ask to split large PRs
- Require 1 maintainer approval for non-critical changes; 2+ for core architectural changes
- Use squash merge by default; rebase/merge only if preserving history is valuable

## Release Cadence
- As-needed minor releases when user-facing features land
- Update `CHANGELOG.md` and tag `vX.Y.Z`

## Issue Labels
- `tool`, `docs`, `tutorial`, `ci`, `hackathon`, `enhancement`, `bug`, `good first issue`, `help wanted`

## Security
- See `SECURITY.md` for policy. Do not disclose vulnerabilities publicly before a fix. 