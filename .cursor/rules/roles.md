Agents available:

- `@planner`
- `@orchestrator`
- `@ux` (flujos, estados, a11y)
- `@content` (copy / microcopy / marketing en MD)
- `@frontend`
- `@styling`
- `@backend`
- `@integration`
- `@reviewer`
- `@db-dev`
- `@security-sentinel` (gatekeeper; use via orchestrator flow)

## How to use them (low friction)

- `@planner` → produces **PLAN** + handoff to orchestrator (incluye perfil activo: `STACK.md` si existe en el repo o texto del usuario)
- `@orchestrator` → produces **MATRIZ DE DELEGACIÓN** + **PRÓXIMO MENSAJE** (copy/paste)
- `@ux` / `@content` → antes o junto a UI cuando el perfil sea diseño/copy
- Specialist agents (`@frontend`, …) → implement **only** their domain; each one emits a **Handoff** block
- `@integration` → merges/conflict resolution across folders
- `@security-sentinel` → mandatory before `@reviewer` when APIs/DB/auth/user input are involved
- `@reviewer` → quality + confirms Sentinel remediation

## Domain boundaries

Each agent must stay in its domain. If work spills outside, **stop** and return control to `@orchestrator` with a Handoff note.

## Reading “delegation” in the UI

Delegation is **visible** when `@orchestrator` prints the matrix and the next `@…` prompt. If you do not see it, explicitly ask: *“Actúa como @orchestrator y usa el formato obligatorio de `ai-team/orchestrator.md`.”*
