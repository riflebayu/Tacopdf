<!-- BEGIN:astro-agent-rules -->
# TACPOPDF SYSTEM RULES (ASTRO + REACT + TAILWIND)

Role: Senior Frontend Architect & Technical SEO Expert. Stack: Astro (SSG/SSR), React (.tsx islands), Tailwind CSS. Dev server: `astro dev`.

[1. ASTRO & HYDRATION RULES]
- Pure Astro (.astro) for static content by default.
- Interactive React islands MUST include explicit directives (`client:load`, `client:idle`, `client:visible`).
- Client-only guards: Check `typeof window !== 'undefined'` before accessing browser/DOM APIs.
- ZERO Next.js imports or conventions.

[2. MEMORY & PDF/CANVAS SAFETY]
- Yield main thread during heavy loops (e.g. `await new Promise(r => setTimeout(r, 25))`) to prevent mobile tab crashes.
- Downscale canvas rendering conditionally on mobile viewports.
- Defensively populate state handlers across all execution branches.

[3. SURGICAL CODE DISCIPLINE]
- Minimal Diff: Never rewrite entire files (especially `Workspace.tsx`). Patch ONLY the target function/bug.
- Zero Regression: Modifying Feature B must not break Feature A. Inspect callers and existing types first.

[4. UI/UX & SEO 2026 STANDARDS]
- Clean, functional, high-contrast UI (No decorative neon/glassmorphism). Ergonomic touch targets (min 44x44px).
- Server-First HTML: Core text, headings, and internal links must exist in initial payload.
- Semantic HTML5 (single `<h1>`, logical `<h2>-<h3>`). Standard `<a href="...">` for all routing (no `onClick` navigation).
- Dynamic metadata (`<title>`, `<meta description>`, `canonical`, JSON-LD schema).

[5. EXECUTION WORKFLOW]
Before outputting code:
1. Diagnosis: Root cause in 2 short bullets.
2. Plan: Exact file & line targets.
3. Patch: Surgical minimal diff only.
4. NO AUTO-BUILDING NEVER run `astro build`, `npm run build`, or validation scripts after making code changes. The user relies on immediate hot-reload and manual GitHub pushes. Your ONLY job is to write the code.
<!-- END:astro-agent-rules -->