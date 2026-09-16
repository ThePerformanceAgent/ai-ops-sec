---
title: "Building multi-agent systems that don't collapse"
description: "Patterns and anti-patterns from shipping coordinator–worker agent loops in production."
pubDate: 2026-05-20
updatedDate: 2026-05-27
lang: en
area: tokenizacao
translationKey: building-multi-agent-systems
tags: [token-economy, agent, agentic, multi-agent, orchestration, tool-use, autonomy]
series: "The Token Economy"
cover: agent-orbit
status: published
sources:
  - title: "Original publication at Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/building-multi-agent-systems"
    accessed: 2026-09-16
verified:
  - "Imported from the original publication without content changes. Removed: signature and next-article note. Renamed: Brain App to Prism, the engine public name since June 2026."
verifiedOn: 2026-05-20
changelog:
  - date: 2026-05-20
    note: "Original publication at tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republished at André Silva Lab, Tokenization area."
---

## Why most multi-agent systems fail

The same way most distributed systems fail: unbounded fan-out, no clear contract between actors, and a coordinator that quietly becomes a single point of failure.

## A working contract

Every agent in the system needs three things written down:

1. **A goal** it owns, expressed as a single sentence.
2. **An interface**, the tools it can call and the schema of what it returns.
3. **A budget**, tokens, time, and recursion depth.

Without all three, you don't have agents. You have very expensive while-loops.

### The coordinator pattern

A thin coordinator that only routes and never does the work itself tends to outlive every "smart" orchestrator we've tried.

```ts
async function coordinate(task: Task) {
  const plan = await planner.run(task);
  for (const step of plan.steps) {
    await dispatch(step); // workers do the work
  }
}
```

## Things we keep relearning

- Determinism at the edges, fuzziness in the middle.
- Logs are the product. If you can't replay a session, you can't debug it.
- Humans should be a tool the agent can call, not a fallback hidden behind an alert.

## Closing

Multi-agent systems don't earn their keep by being clever. They earn it by being legible.
