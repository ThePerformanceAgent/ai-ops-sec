---
title: "The five thousand dollars you never see on the invoice: why cache is your hidden balance sheet"
description: "Your invoice shows what you spent. It never shows what you avoided spending. In my own operation, what I avoided was four and a half times what I paid, and it appears nowhere."
pubDate: 2026-06-18
lang: en
area: tokenizacao
translationKey: balanco-escondido
tags: [cache, prompt-caching, e-cache, tokenization, token-economy, finops, tra, token-resilience-architecture]
series: "The Token Economy"
cover: hidden-balance
status: published
sources:
  - title: "Original publication at Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/balanco-escondido"
    accessed: 2026-09-16
verified:
  - "Imported from the original publication without content changes. Removed: signature and next-article note. Renamed: Brain App to Prism, the engine public name since June 2026."
verifiedOn: 2026-06-18
changelog:
  - date: 2026-06-18
    note: "Original publication at tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republished at André Silva Lab, Tokenization area."
---

> *Article 4 of 10 of **The Token Economy** series. Your invoice shows what you spent. It never shows what you avoided spending. In my operation, what I avoided was four and a half times what I paid, and it appears nowhere.*

After three articles on costs that rise in silence, this one flips the coin. Cache is the biggest lever you have to bring the AI bill down. In my operation it avoided five thousand dollars on top of eleven hundred of actual spend. And almost nobody measures it, because the saving never shows up on the bill.

## The question your balance sheet does not show

Your AI invoice is an income statement: it tells you what you spent this month. What it never tells you is the other side of the story, what you could have spent and did not because the system reused context instead of buying it back at full price. That value exists, it is large, and it is invisible.

It is called cache savings. It is money that did not leave your account because the provider "remembered" a chunk of context it had already read, instead of charging it again from scratch. In an agentic AI operation, where the same context (instructions, documents, history) is resent dozens of times per task, that saving can be several times bigger than the invoice itself. But because it does not show up as a line on the dashboard, most teams never calculate it, and therefore never know if they are capturing it or throwing it away.

The right question is not "how much did I spend on tokens?". It is this: **"of everything I resend to the model, how much am I paying at full price and how much am I paying at a discount?"** The answer to that question is your hidden balance sheet. And like any balance sheet, either you read it, or you have no idea how healthy your operation is.

In article 1 I showed that a token has five prices. In article 2, that the number of tokens is unstable between versions. In article 3, that an agentic system generates ten internal tokens for every one you read. Today I show the only one of these forces that plays in your favor: cache, the lever that turns the cost of repeated context into a fraction of what it would cost without it.

## The concept: cache is treasury, not technology

Forget the word "cache" for a minute. Think treasury management.

When you give a task to an AI system, much of what you send it repeats on every call: the system instructions, the document being analyzed, the conversation history, the examples. The model needs to "read" all of this before producing anything. Without cache, it reads it all again on every call, and you pay the full read each time, as if it were the first.

Cache changes the economics. The first time, the provider reads the context and stores it in short-term memory. That is called a cache write, and it costs a bit more than a normal read, it is the premium you pay to register. On every subsequent call that reuses the same context, the provider no longer rereads it: it fetches it from memory. That is called a cache read, and it costs **one tenth** of the price of a normal read. Ninety percent discount, on every reuse.

So you see the mechanics in numbers, with the model that dominates my operation:

| Operation on the context | Price per million tokens | Relative to input |
|---|---|---|
| Normal read (input) | $5.00 | 1× |
| Cache write (5 min) | $6.25 | 1.25× |
| Cache write (1 hour) | $10.00 | 2× |
| **Cache read** | **$0.50** | **0.1×** |


<figure class="anim-inline" data-anim="cache-discount" role="img" aria-label="Cache discount: normal read vs cache read, ten times cheaper">
<svg viewBox="0 0 480 200" style="display:block;width:100%">
<defs><linearGradient id="cdf" x1="0" x2="1"><stop offset="0" stop-color="var(--anim-soft)"/><stop offset="1" stop-color="var(--anim-accent)"/></linearGradient><linearGradient id="cdc" x1="0" x2="1"><stop offset="0" stop-color="var(--anim-accent)"/><stop offset="1" stop-color="var(--anim-deep)"/></linearGradient></defs>
<text x="24" y="32" font-size="13" fill="var(--anim-ink)" opacity="0.65" style="font-family:var(--font-mono)">input read · normal</text>
<text x="456" y="32" text-anchor="end" font-size="14" font-weight="700" fill="var(--anim-deep)" style="font-family:var(--font-mono)">$5.00 / 1M tk</text>
<rect x="24" y="44" width="360" height="22" rx="3" fill="var(--anim-card)" stroke="var(--anim-soft)" stroke-width="0.6"/>
<rect x="24" y="44" width="360" height="22" rx="3" fill="url(#cdf)" data-grow="w" data-cycle="4200" data-ease="1.2"/>
<text x="24" y="112" font-size="13" fill="var(--anim-ink)" opacity="0.65" style="font-family:var(--font-mono)">input read · cache</text>
<text x="456" y="112" text-anchor="end" font-size="14" font-weight="700" fill="var(--anim-deep)" style="font-family:var(--font-mono)">$0.50 / 1M tk</text>
<rect x="24" y="124" width="360" height="22" rx="3" fill="var(--anim-card)" stroke="var(--anim-soft)" stroke-width="0.6"/>
<rect x="24" y="124" width="36" height="22" rx="3" fill="url(#cdc)" data-grow="w" data-cycle="4200" data-ease="1.2"/>
<g transform="translate(396,118)"><rect width="60" height="36" rx="6" fill="var(--anim-deep)"/><text x="30" y="16" text-anchor="middle" font-size="9" fill="var(--anim-bg)" opacity="0.85" style="font-family:var(--font-mono)">discount</text><text x="30" y="30" text-anchor="middle" font-size="14" font-weight="700" fill="var(--anim-bg)" style="font-family:var(--font-mono)">10×</text></g>
<text x="24" y="180" font-size="11" fill="var(--anim-ink)" opacity="0.55" style="font-family:var(--font-mono)">same context, ten times cheaper on every reuse</text>
</svg>
</figure>


> Input and cache read: official Opus 4.7 prices, snapshot of June 1, 2026. Cache writes (1.25× and 2× of input): the 5-component structure from article 1. Cache only applies to input, to context; output (the generated response) is never cacheable and always costs full price. The prices and the ten-to-one ratio are from this model: with other providers the mechanics are the same (cache read much cheaper than fresh read) but the multipliers shift. What travels is the method, not the numbers.

It is exactly treasury management. You pay a small premium once to register the context (the write), and from then on each reuse yields a ninety percent discount (the read). Context resent at full price, call after call, is the equivalent of leaving capital sitting in a no-interest account: money is working against you instead of for you. Every token you could have served from cache and served at full price is margin you left on the table.

## Why this saving stays invisible

It is worth understanding why a lever this big is not on everyone's table. Again, it is not conspiracy. It is how the bill is presented.

The provider dashboard shows you what you paid. It does not show you the counterfactual, what you would have paid without cache, because that number is not an accounting fact, it is a calculation that depends on knowing how much of your input was served from cache and how much would have been a fresh read. The provider has the data to do it, but no incentive to present you with an estimate of the money it saved you. It shows the invoice, and the invoice is, by definition, only what went out.

There is a second reason, more technical. Cache savings is not a single number, it is the result of a ratio: how much of your context arrives as a cache read (cheap), how much arrives as a fresh read (expensive), and how much you spend writing to cache (the premium). To know if you are winning, you have to assemble these three pieces and put them in ratio. Most monitoring tools give you the loose numbers, but do not close the ratio for you. You see input, you see cache, but you do not see the health of the operation.

And there is a third one, the same that runs through this whole series. As long as you run on a flat-rate subscription, cache savings do not change your monthly bill: you pay the same flat with or without cache. So you have no incentive to measure it. Cache is working (or not working), but the price signal that would tell you is muffled by the monthly fee. We come back to this point later, because it is precisely on the day you leave the subscription that this lever decides whether your operation is viable.

## The data: $5,104 avoided on $1,140 spent

In Prism, the proprietary engine I built to measure the real cost of every token I consume, cache savings is not a vendor promise. It is a reading.

Take the real snapshot, frozen on June 1, 2026: **490 tasks, 42 sessions, 18 working days** (May 14 to June 1). In this period:

- My real API bill was **$1,140**, calculated at official price as if billed via API.
- Cache savings, the cost I avoided by serving context from cache instead of rereading it at full price, was **$5,104**.
- In other words: without cache, my total invoice would have been about **$6,244** instead of the $1,140 I paid. Cache cut close to **82%** off what the bill would have been.


<figure class="anim-inline" data-anim="hidden-balance-grow" role="img" aria-label="Hidden balance: 1140 paid versus 5104 avoided">
<svg viewBox="0 0 480 220" style="display:block;width:100%">
<defs><linearGradient id="hgp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--anim-soft)"/><stop offset="1" stop-color="var(--anim-accent)"/></linearGradient><linearGradient id="hga" x1="0" x2="0" y1="1" y2="0"><stop offset="0" stop-color="var(--anim-accent)"/><stop offset="1" stop-color="var(--anim-deep)"/></linearGradient></defs>
<g transform="translate(24,24)"><rect width="180" height="172" rx="6" fill="var(--anim-card)" stroke="var(--anim-deep)"/><text x="14" y="22" font-size="11" fill="var(--anim-ink)" opacity="0.6" style="font-family:var(--font-mono)">invoice · what you paid</text><line x1="14" y1="30" x2="166" y2="30" stroke="var(--anim-soft)" stroke-width="0.6"/><text x="90" y="78" text-anchor="middle" font-size="11" fill="var(--anim-ink)" opacity="0.55" style="font-family:var(--font-mono)">18 days · 490 tasks</text><text x="90" y="120" text-anchor="middle" font-size="36" font-weight="700" fill="var(--anim-deep)" style="font-family:var(--font-mono)">$1,140</text><text x="90" y="142" text-anchor="middle" font-size="10" fill="var(--anim-ink)" opacity="0.6" style="font-family:var(--font-mono)">paid · visible on the bill</text><rect x="14" y="156" width="152" height="6" rx="2" fill="url(#hgp)"/></g>
<g transform="translate(224,24)"><rect width="232" height="172" rx="6" fill="var(--anim-card)" stroke="var(--anim-deep)" stroke-dasharray="3 2"/><text x="14" y="22" font-size="11" font-weight="700" fill="var(--anim-deep)" opacity="0.9" style="font-family:var(--font-mono)">hidden ledger · what you avoided</text><line x1="14" y1="30" x2="218" y2="30" stroke="var(--anim-soft)" stroke-width="0.6"/><text x="116" y="78" text-anchor="middle" font-size="11" fill="var(--anim-ink)" opacity="0.55" style="font-family:var(--font-mono)">cache saved</text><text x="116" y="120" text-anchor="middle" font-size="36" font-weight="700" fill="var(--anim-deep)" style="font-family:var(--font-mono)" data-count="5104" data-prefix="$" data-cycle="5200" data-ease="1.18">$5,104</text><text x="116" y="142" text-anchor="middle" font-size="10" fill="var(--anim-ink)" opacity="0.6" style="font-family:var(--font-mono)">never on the invoice</text><rect x="14" y="156" width="204" height="6" rx="2" fill="var(--anim-card)" stroke="var(--anim-soft)" stroke-width="0.4"/><rect x="14" y="156" width="204" height="6" rx="2" fill="url(#hga)" data-grow="w" data-cycle="5200" data-ease="1.18"/></g>
<text x="240" y="212" text-anchor="middle" font-size="11" fill="var(--anim-ink)" opacity="0.6" style="font-family:var(--font-mono)">ratio avoided : paid = 4.48× · for every dollar paid, cache made another 4.48 unnecessary</text>
</svg>
</figure>


An honest caveat before you read this number as an invoice you dodged: this $6,244 is not a bill anyone sent me. It is what the same work would cost if I had reread all the context at full price, something nobody designs on purpose. The real value of cache is not "I dodged a six-thousand-dollar invoice", it is "cache makes unnecessary a cost you would otherwise have to budget". That cost you do not have to budget is what I call your hidden balance sheet.

Read it again, it is the same saving seen from the other side: **for every dollar I actually spent, cache made another four and a half unnecessary.** The lever is not marginal. It is the difference between an agentic AI operation that closes the books and one that bleeds margin without anyone noticing.

The number that sums up the health of this lever is called **E_cache**, cache efficiency. It is the fraction of my input that was served from cache instead of read fresh:

```
E_cache = cache reads / (fresh input + cache reads + cache writes)
```

In the snapshot, my E_cache was **96.2%**. Meaning more than ninety-six percent of all the context the system processed came from cheap memory, not from expensive reading. It is a high value, and it is high by design: my system reuses context aggressively and stably, which is exactly where cache pays off most.

### Freshness has a price

There is a trap inside this lever, and it is the flip side of the coin. Cache write is not free: it costs a premium over the normal read (1.25× for the five-minute memory, 2× for the one-hour memory, in the table above). If you rewrite cache context too often, for example because you change a comma in the instructions on every call and invalidate everything that was stored, you pay the write premium over and over without ever harvesting enough reads to compensate. Excessive freshness eats the saving.

But there is a flip side more dangerous than the write premium. Cache saves by serving context it already read, and context it already read is context that may have aged. A high E_cache obtained by never rewriting is not health: it is the risk of the system responding based on a price, a document, or a rule that has since changed. Freshness has two costs: the premium you pay extra when you rewrite, and the wrong answer you pay when you serve outdated context. The target is not maximum cache. It is maximum cache over context that is still true.

The practical rule: write only pays off if it is followed by enough reads to pay back the premium. The one-hour memory costs more to register (2× instead of 1.25×), but if you are going to reuse the same context across a long session, it pays back many times over, because it avoids rewrites. The five-minute one is enough for short bursts. The warning sign is simple: if your share of cache writes starts approaching your share of cache reads, you are not doing caching, you are paying the premium without the discount. Keep context stable enough to reuse it before replacing it.

### What this number is not

The 96.2% is mine, from my operation, from my usage pattern. Your E_cache will be different, and probably lower, because I run a system with heavily reused and very stable context. An application with always-different requests, no context shared between calls, has less to cache and a naturally lower E_cache. The point is not that yours should be 96%. The point is that you do not know what yours is, and that means you do not know how much margin you are leaving on the table. A low E_cache is not necessarily bad (it depends on your pattern), but an E_cache nobody measures is always a decision made blind.

## The framework: E_cache per workflow

The good news is this can be measured, and the ruler is the same whatever the tool. Here is the minimum sequence.

### Step 1: separate the three slices of input

For each workflow, sum three things instead of one: fresh-read tokens (full-price input), cache-read tokens (at 10%), and cache-write tokens (the premium). Most dashboards lump everything into a single "input". You have to separate them, because the relation between them tells the story. AI gateways that already count tokens (LiteLLM, Helicone, Portkey) expose these categories per call; what is missing, almost always, is someone summing them by workflow and closing the ratio.

### Step 2: calculate E_cache and the avoided saving

```
E_cache = cache reads / (fresh input + cache reads + cache writes)
saving  = cache reads × (input price − cache-read price)
```

E_cache tells you the health (what fraction of context comes from the cheap side). The saving tells you the value in dollars that health represents. Always present both: the ratio convinces the engineer, the dollar number convinces the CFO. They are the same fact in two languages.

### Step 3: compare against the ruler

An isolated E_cache says nothing. Compared against an expectation, it says everything. The ruler I use, and that I offer you as a starting point and not as law:

- **E_cache above 85%** on a workflow with repeated context (agents, RAG, assistants with fixed instructions). Below that, there is context being reread that should be in cache.
- **Cache-write share well below cache-read share.** If write approaches read, you are invalidating too much cache. Investigate what changes the context on every call.
- **Saving reported every month, in dollars.** If your AI cost report does not have a line for "cache cost avoided", you are missing half the balance sheet.
- **High E_cache only counts on live context.** Do not raise the ratio by serving outdated documents, prices, or rules. Cache of context that already changed is a wrong answer served cheaply, which is the most expensive way to save.

The ruler is yours to tune. What is not negotiable is having one. Without an expectation, any E_cache looks acceptable, and that is how operations leave thousands of dollars of margin on the table for months without anyone noticing.

### Where this fits in the larger picture

In the cost model of this series, the Token Resilience Architecture (TRA), API cost is the product of several forces: price per token (article 1), how many tokens each text consumes (article 2), the agentic multiplier that inflates volume (article 3). E_cache is the only one of these forces that plays in your favor: it is the divisor, the lever that lowers the effective cost of context. A high alpha (lots of internal traffic) with a high E_cache is manageable, because most of that repeated traffic is served cheaply. A high alpha with a low E_cache is bleeding. The two readings live side by side, and only make sense together.

## The saving that travels with you to the API

There is a reason why this lever matters far more than it seems, and it has to do with the theme that runs through the whole series: the day you leave the subscription.

While you run on flat rate, cache works in silence and you do not feel the difference, you pay the flat anyway. But the day your application moves to API billing, every token of resent context stops being painless and becomes a line on the bill. That is exactly the moment when E_cache decides whether your books close. An operation with E_cache of 96% pays, on the context side, a fraction of what an identical operation with E_cache of 40% pays for the same work. Same product, same response to the user, invoice several times different.

And unlike almost everything else in this series, this is the good news. The other forces (the tokenizer, the alpha, the worst-case tail) work against you and you have to contain them. Cache works in your favor, and the only thing you need to do is measure it and protect it. It is the lever already mounted on your operation waiting for someone to read it. Whoever arrives at migration day with a high and stable E_cache has a defense that the competitor who never measured it does not have. Measure it now, while the subscription still hides the signal, and you arrive at the API with the margin already secured.

## The decision for this week

Three concrete actions for whoever recognizes the problem.

**1. Ask for your cache saving for the month, in dollars.**

Not total spend, not total tokens. The value cache avoided you paying, and the E_cache that produced it. If the report comes back without that line, or worse, with "zero" or "n/a", you have two options: either you are not using cache at all (you are paying repeated context at full price), or you are using it and nobody measures it. Both cost money. The question alone already tells you where you stand. A caveat, if you still run on flat-rate subscription: your saving in dollars today is zero, you pay the same flat with or without cache, and that is fair. The number you are asking for now is not this month's invoice, it is the avoided cost calculated at API price, what this operation would cost if it were billed per token. Ask for it anyway: it is the rehearsal of the number that becomes real the day you migrate, and it is better to find out that your E_cache is low now, in rehearsal, than on the first API bill.

**2. Check the balance between write and read.**

Ask for the decomposition of input into three slices: fresh read, cache read, cache write. If write is close to read, you are invalidating too much cache, paying the premium without harvesting the discount. The cause is almost always context that changes when it did not need to (a timestamp, a rewritten instruction, a swapped order). Stabilize what is stable and the saving appears.

**3. Put E_cache in the recurring report, next to cost.**

Cache savings cannot be a calculation somebody does once out of curiosity. It has to be a fixed line on the AI cost report, every month, per workflow. It is the only way degradation appears while it is still cheap to fix, instead of appearing on the API bill six months later.

**And a non-action, as important as the others:**

Do not chase an E_cache of 100% on principle. Cache is a tool for repeated context, not an end in itself. There are workflows where every request is genuinely different and there is almost nothing to cache, and forcing caching there only makes you pay useless write premiums. The mistake is not having a low E_cache on a workflow that does not repeat context. It is not knowing which of the two cases is yours.

## The number to track

> **E_cache = cache reads / (fresh input + cache reads + cache writes), per workflow.**
> Above 85% where there is repeated context. And report the saving in dollars next to it, every month. If your AI invoice does not have a line for the money cache saved you, you are reading half the bill.

## Next article

Article 5 goes to the number that separates the experienced CFO from the optimistic one: the worst case. So far we talked about averages and totals, but the average lies, it hides the tail. You will see why the 95th percentile of cost per task, and not the average, is the number you should budget, and how a single out-of-control task (a chatbot without a limit, an agent in a loop) can cost more in a day than the rest of the month combined. Whoever budgets by the average wakes up to the tail's bill.
