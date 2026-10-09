# Perfiles de proyecto (stack)

Usa **un perfil activo** por feature o por repo. El `@planner` y el `@orchestrator` deben leerlo y ajustar tareas (sin mezclar stacks).

## Perfil A — `next-tailwind` (por defecto en esta plantilla)

- **Stack:** Next.js, JavaScript, Tailwind CSS
- **Agentes típicos:** `@planner` → `@orchestrator` → `@frontend` / `@styling` / `@backend` / `@db-dev` → `@integration` → `@security-sentinel` (si aplica) → `@reviewer`
- **Cuándo:** aplicaciones web con esta plantilla

## Perfil B — `design-ux` (producto / diseño de experiencia)

- **Enfoque:** flujos, jerarquía, estados vacíos/error, accesibilidad, microcopy de UI
- **Agentes típicos:** `@ux` antes o en paralelo con `@frontend`; `@content` para textos finales
- **Cuándo:** proyectos donde el riesgo principal es **claridad y usabilidad**, no solo código

## Perfil C — `content-marketing` (copy sin app)

- **Enfoque:** mensajes, tono, estructura de página de marketing, SEO on-page (sin prometer rankings)
- **Agentes típicos:** `@content` → `@reviewer` (calidad editorial); código mínimo o ninguno
- **Cuándo:** landings, decks de copy, emails (como documentos en repo)

## Cómo activar un perfil

En el primer mensaje del feature, indica explícitamente:

```text
Perfil activo: next-tailwind
```

o

```text
Perfil activo: design-ux
```

El `@planner` debe reflejar el perfil en **PLAN → Architecture** (una línea).

`(node "C:\Users\USUARIO\Desktop\02 DEV\01-PROYECTOS\my-team\scripts\setup-cursor.cjs" .)`
