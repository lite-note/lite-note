# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Remanso is a Vue 3 + TypeScript web app that displays markdown notes from GitHub repositories with Zettelkasten-style backlinks. Users access notes via `https://litenote.space/{user}/{repo}`. Supports both public repos (direct access) and private repos (GitHub OAuth).

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm test         # Run Vitest tests
pnpm lint         # ESLint with auto-fix
pnpm types        # TypeScript type-check
```

## Architecture

### Tech Stack

- **Vue 3** with Composition API, **Pinia** for state, **Vue Router**
- **Vite** build tool, **TypeScript** strict mode
- **Tailwind CSS** + **DaisyUI** for styling
- **PouchDB** (IndexedDB) for local persistence
- **Octokit** for GitHub API integration
- **markdown-it** with plugins (KaTeX, Shikiji, Mermaid, checkboxes, GitHub alerts)

### Directory Structure

```sh
src/
├── views/           # Page components (FluxNoteView, FleetingNotes, etc.)
├── components/      # Reusable UI components
├── modules/         # Feature domains
│   ├── note/        # Note models, hooks, caching
│   ├── repo/        # GitHub repo integration (Pinia store, Octokit service)
│   ├── user/        # Authentication, user settings
│   ├── card/        # Spaced repetition
│   └── history/     # Edit history tracking
├── hooks/           # Composition hooks (useMarkdown, useBacklinks, useGitHubContent, etc.)
├── data/            # PouchDB wrapper and data models
├── utils/           # Utilities including custom markdown-it plugins
├── locales/         # i18n (English/French)
└── bus/             # Event buses for inter-component communication
```

### Key Files

- `src/router/router.ts` - Route definitions, main route is `/:user/:repo`
- `src/modules/repo/store/userRepo.store.ts` - Central Pinia store for repo/file state
- `src/modules/repo/services/octo.ts` - Octokit wrapper for GitHub API
- `src/hooks/useMarkdown.hook.ts` - Markdown rendering with all plugins
- `src/data/data.ts` - PouchDB database wrapper

### Patterns

- All components use Composition API
- Custom hooks encapsulate feature logic (`use*.hook.ts` or `use*.ts`)
- Event buses (`noteEventBus`, `backlinkEventBus`) for cross-component communication
- Path alias: `@` maps to `src/`
