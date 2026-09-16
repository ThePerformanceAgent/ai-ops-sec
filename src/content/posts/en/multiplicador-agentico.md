---
title: "The agentic multiplier: where your tokens REALLY go"
description: "In an agentic system, most of the tokens you pay for are never seen by anyone. It is called alpha, and in my own operation it reaches 11.1×. Here is how to measure it before the bill measures it for…"
pubDate: 2026-06-09
updatedDate: 2026-06-10
lang: en
area: tokenizacao
translationKey: multiplicador-agentico
tags: [token-economy, alfa, amplificacao-agentica, finops-de-ia, custo-de-agentes, subagentes, cfo, tra]
series: "The Token Economy"
cover: agentic-alpha
status: published
sources:
  - title: "Original publication at Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/multiplicador-agentico"
    accessed: 2026-09-16
verified:
  - "Imported from the original publication without content changes. Removed: signature and next-article note. Renamed: Brain App to Prism, the engine public name since June 2026."
verifiedOn: 2026-06-09
changelog:
  - date: 2026-06-09
    note: "Original publication at tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republished at André Silva Lab, Tokenization area."
---

> *Article 3 of 10 in **The Token Economy** series. You pay for one answer. You receive one answer. Between the two, the machine spoke to itself ten times, and every word of that internal conversation landed on your invoice.*

You think you pay for what the AI answers you. In my own operation, for every response token I read, I pay for ten more I never see. It is not waste. It is how systems with agents work. The problem is that almost no one measures it.

## The question your dashboard does not answer

You open your AI tool''s usage panel. You see a token number and a dollar number. It looks like transparency. It is not.

That number aggregates two things that should be separate: the tokens that produced something a human read, and the tokens the machine spent talking to itself to get there. In a simple chatbot, the second part is small. In a system with agents, it is the largest slice of the bill, and it is completely hidden inside a total that looks innocent.

The right question is not "how many tokens did I spend?". It is this: **"for every useful response token, how many internal tokens did I pay for?"** That ratio has a name, has a formula, and in most teams no one knows it by heart. It is the number that separates those who control agentic cost from those who are just hoping the bill does not grow.

In article 1 of this series I showed that a token has five prices. In article 2, that the token count itself is unstable between versions. Today I attack the largest invisible cost: the volume of tokens an agentic system generates just to function, and that you pay for in full.

## The concept: the machine spends most of its time talking to itself

A simple AI model works as one question and one answer. You write, it replies, you pay for both sides of the conversation. Clean and predictable.

An agentic system does not work that way. When you give it a task, it does not answer at once. It decomposes the request, calls tools, reads files, writes intermediate results, checks its own work, corrects, and sometimes delegates parts to other agents that repeat the whole cycle. Each of these steps is a call to the model. Each call generates tokens. Each token lands on the bill.

The consequence is counter-intuitive and expensive: **most of the tokens you pay for in an agentic system are never seen by anyone.** They are internal traffic. The machine planning, re-reading, passing context from one step to the next, talking to itself in a voice you never read.

This is not a defect. It is what makes agents useful. An agent that checks its own work produces better results than one that fires from the hip. But every check costs tokens, and those tokens are real. The mistake is not having internal work. The mistake is not measuring it, and then being surprised when the bill of an agentic system is five, ten or fifteen times larger than the volume of visible answers suggested.

I give it a name so you can track it: **alpha**, the agentic amplification. It is a simple ratio.

```
alpha = total tokens generated / tokens visible to the user
```

An alpha of 1 means there is no internal work: everything the machine produced, you read. An alpha of 11 means that for every token that reached your eyes, the machine generated ten more along the way. The higher the alpha, the bigger the slice of your bill that pays for conversation that never leaves the machine.

## Why this number stays hidden

It is worth asking why a ratio with this impact is not on everyone''s table. The answer, again, is not conspiracy. It is design.

Vendor usage panels show what is easy to aggregate: total tokens and total cost. Separating visible tokens from internal tokens requires knowing what counts as "visible", and that depends on your application, not on theirs. A vendor does not know which of your tokens were read by a human and which stayed inside your agent''s internal loop. So it shows the total and leaves the separation to you. Comfortable for them, opaque for you.

On the monitoring side, the problem is similar to the previous article: most tools were designed to measure individual calls, not to reconstruct that twenty calls and three subagents all belong to the same task the user asked for. Without that reconstruction, you cannot calculate alpha, because you do not know where a task starts and ends. You see a list of calls, not a ratio.

And there is a third, more uncomfortable reason. While you build on top of a flat-price subscription, alpha does not hurt. You pay your ninety-nine euros a month and the system generates whatever internal tokens it wants, because the marginal cost of each token, for you, is zero. Alpha is there, as high as ever, but you have no incentive to measure it. Until the day you move off the subscription. We will come back to that.

## The data: 11.1× in my own operation

In Prism, the proprietary engine I built to measure the real cost of every token I consume, alpha is not a theory. It is a reading.

Take the real snapshot, frozen on June 1, 2026: **490 tasks, 42 sessions, 18 working days** (May 14 to June 1). In this period:

- The model generated about **5.87 million output tokens** in total.
- Of these, only **530 thousand were visible tokens**, answers I actually read.
- Alpha = 5.87 million divided by 530 thousand = **11.1×.**

In other words: **about 91% of all the output I paid for was never seen by anyone.** It was the machine planning, re-reading files, checking itself, passing context between steps, delegating to subagents. Ten out of every eleven response tokens I paid for were internal conversation.

The API-cost for the period was **\$1,140**, calculated at official prices as if billed via API. If I were only counting visible tokens, I would have budgeted a fraction of this and gotten a shock at the end of the month. Alpha is the difference between what it looks like it costs and what it costs.

### Subagents are the expensive tail

Inside this number there is a layer that deserves its own attention: subagents. When an agent delegates part of a task to another agent, that second agent runs its own complete cycle, with its own context and its own tokens.

In the same snapshot, subagents were **60 instances** that consumed **\$55.64**, around **4.9% of total cost**. At first glance it looks small. But the average misleads, as we have seen across this series: that cost is not spread evenly. It concentrates in the heavy tasks, the ones that decompose a lot and delegate a lot. In a light task, subagents do not show up. In a research or multi-step analysis task, they can be the bulk of that task''s cost. The global slice is small; the slice on the tasks that delegate most is not.

The lesson is not "subagents are expensive". It is "subagent cost lives in the tails, not in the average, and if you only look at the average you do not see the task that cost you ten times more than the others".

### What this number is not

The 11.1 is mine, from my operation, from my usage pattern. Your alpha will be different, and probably lower, because I run an intensive agentic system with a lot of delegation and a lot of verification. A customer-support chatbot has a much smaller alpha. A RAG pipeline sits in the middle. The point is not that your alpha is 11. It is that you do not know what it is, and you should.

And do not take my word for it. The number that matters is the one you measure yourself. The next section shows you how, and the rest is up to you: run your operation, calculate your ratio, and if it is low, great, you can rest easy with data instead of faith.

## The framework: measuring alpha per workflow

The good news is that alpha is measurable, and the method is the same regardless of the tool you use. Here is the minimum sequence.

### Step 1: define the boundary of a task

Before counting tokens, you need to know what "a task" is. It is the request a human made: "summarise this document", "reply to this customer", "analyse this account". Everything the machine does between receiving that request and returning the final answer belongs to that task, no matter how many internal calls and subagents that implies.

This is the part most tools do not do for you. You have to tag each call with an identifier for the task it belongs to. Without that, you have a list of loose calls and you can never close the ratio.

### Step 2: separate visible tokens from total tokens

For each task, add two things: the total output tokens the machine generated, and the part of that output a human actually read (the final answer, not the intermediate steps). The first sum includes everything: planning, checks, subagents, internal context. The second includes only what went to the user.

You do not need to build anything from scratch for this. AI gateways that already count tokens (LiteLLM, Helicone, Portkey) expose the total per call; they only lack the task tagging from step 1 for you to close the ratio. My Prism does both in one place, but the ruler is the same with any tool: what counts is separating what the machine generated from what a human read.

### Step 3: compute the ratio and compare it to the ruler

```
alpha = total output tokens / tokens visible to the user
```

An isolated alpha tells you nothing. An alpha compared with an expectation tells you everything. This is the ruler I use, and that I propose as a starting point, not as law:

- **Simple chat: alpha below 5.** Question and answer with little internal work. If it goes higher, there are extra loops.
- **RAG or retrieval: alpha below 8.** There is search and context reading, so it rises, but there is a reasonable ceiling.
- **Multi-agent: alpha below 15.** Delegation and verification cost, and here it is expected. Above this, it is worth asking whether each subagent is earning its place.

The ruler is yours to adjust to your reality. What is not negotiable is having one. Without an expectation, any alpha looks normal, and that is how systems with alpha 30 go for months without anyone noticing.

### Where this fits in the bigger picture

In this series'' cost model, the Token Resilience Architecture (TRA), your API-cost is the product of several forces: price per token (article 1), the number of tokens each piece of text consumes (article 2), and now the multipliers that inflate that number. Alpha is the largest of those multipliers in any system with agents. It is what turns a visible-token cost that looks controllable into a real bill that is five to fifteen times bigger. And unlike price per token, which sits in a public table, alpha only exists if you measure it. No one hands it to you.

## A warning for the migrator: from Claude Code to API

This is the part that makes alpha explosive, and it is why it lives hidden for so long.

While your application runs inside a flat-price subscription, alpha costs you zero extra euros. You already paid the monthly flat. The system can generate eleven internal tokens for every visible token and you do not feel it, because the marginal cost of each token is zero for whoever pays a monthly fee. Alpha is there, high, but painless.

The day that application leaves the subscription and starts being billed via metered API, alpha stops being a curious number and becomes a direct multiplier on your bill. An application with alpha 11 does not pay eleven percent more. It pays eleven times the tokens that the "apparent usage" suggested. And if that application, which lived on your desktop, goes on to serve 100 users in production, you do not add, you multiply: 100 users times alpha 11 is more than a thousand times the token volume your subscription panel ever showed you.

This is why so many applications built on top of agentic subscriptions miss their numbers six months after going to production. It is not that cost went up. It is that alpha was always there, painless in the subscription, devastating in API, and no one measured it before migrating. Measure your alpha today, while it does not yet hurt. It is the cheapest way to avoid the most expensive bill.

## The decision for this week

Three concrete actions for whoever recognises the problem.

**1. Ask for the alpha of every workflow that runs AI.**

Not total cost, not total tokens. The ratio between total tokens and visible tokens, by task type. If no one on your team can answer, you are not measuring the agentic system, you are paying for it blind. The question alone tells you where you stand: if it creates silence in the room, you found the hole.

**2. Tag tasks before you need the number.**

The reason no one calculates alpha is almost always technical and mundane: calls are not tagged with the task they belong to, so it is impossible to group them afterwards. Solve this now, with cold instrumentation, and the number is available when the board asks for it. Instrumenting after the question is too late.

**3. Put a ceiling per workflow, not just a global ceiling.**

A global spend limit does not protect you from the task that over-delegates and blows up alpha. Set a ceiling per workflow type, aligned with the ruler from the previous section, and trigger an alert when a task crosses it. It is the difference between catching the problem in the moment and catching it on the invoice.

**And one non-action, as important as the others:**

Do not confuse a high alpha with a bad system. A high alpha can be exactly what you need, if each internal token is buying quality that pays off. The mistake is not having a high alpha. It is having a high alpha without knowing it, without having decided it, and without being able to justify it when someone asks where the money went.

## The number to track

> **Alpha = total output tokens / tokens visible to the user, per workflow.**
> Chat below 5, RAG below 8, multi-agent below 15. If you do not know your alpha, you are not measuring agentic cost, you are guessing it.

## Next article

Article 4 flips the coin. After three articles on costs that rise in silence, the next one is about the biggest lever you have to bring them down: cache. You will see why prompt caching is the AI equivalent of treasury management, and how, in my own operation, it avoided more than five thousand dollars of cost on eleven hundred dollars of actual spend. If you are not measuring your cache savings, you are leaving most of the margin on the table.
