´´´
# Engram Memory System

´´´
## Goal

Maintain continuity of context between sessions and agents.

## Availability

If the **Engram MCP server is not enabled** in this Cursor workspace, **do not** attempt `mem_search` / `mem_save` / related tools. Continue the AI Dev Team pipeline normally without blocking on memory.

---

## Memory Reading (mem_search)

Always execute before:

- designing features
- making architectural decisions
- modifying existing code

Search for:

- feature
- module
- previous bug
- pattern

---

## Memory Writing (mem_save)

Save ONLY when:

- a relevant decision is made
- a complex bug is resolved
- architecture is defined
- a reusable pattern is detected

Format:

title: <short summary>
content:

- context
- decision
- reasoning
- impact

---

## Critical Rules

- DO NOT save trivial information
- DO NOT duplicate memories
- ALWAYS prioritize quality over quantity
- USE clear technical language

IF (complex decision OR critical bug OR reusable pattern)
-> candidate for memory
ELSE -> ignore

## Memory Gatekeeper

If multiple agents generate insights:
-> consolidate into ONE high-level memory

## Reviewer

If mem_search returns a relevant result:
-> adapt, DO NOT reinvent

## Executors (backend/frontend/db-dev/styling)

Don't think about memory; just consume context and execute
