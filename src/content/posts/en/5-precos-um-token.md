---
title: "5 Prices for One Token: What You're Actually Paying for Your AI"
description: "I pay €99/month for a subscription. Over the same period I consumed $565 in API-equivalent value. Five components, five prices, and why the aggregate lies."
pubDate: 2026-05-27
lang: en
area: tokenizacao
translationKey: 5-precos-um-token
tags: [token-economy, token, cost, finops, pricing, cache, economics, cfo]
series: "The Token Economy"
cover: cost-meter
status: published
sources:
  - title: "Original publication at Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/5-precos-um-token"
    accessed: 2026-09-16
verified:
  - "Imported from the original publication without content changes. Removed: signature and next-article note. Renamed: Brain App to Prism, the engine public name since June 2026."
verifiedOn: 2026-05-27
changelog:
  - date: 2026-05-27
    note: "Original publication at tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republished at André Silva Lab, Tokenization area."
---

> *Article 1 of 10 in the series **The Token Economy**. Breakdown with real numbers from my own Claude Code usage over 8 days.*

---

I pay €99 per month for a subscription. Over the same period, I consumed $565 in API-equivalent value. Five different components, five prices. If your CFO reads only one line on the dashboard, they're reading financial fiction.

---

## The Question Your CFO Should Be Asking

Every Tuesday, someone in your company asks the same question: *"How much is AI costing?"*

The answer they receive is usually a single number: the subscription fee, the sum of seats, the amount paid to the vendor. This number isn't wrong, but it answers a different question from the one that matters.

The question that matters for a CFO is this: **of every euro AI consumes, how much goes to each component of the operation?** Without this breakdown, there is no AI FinOps. There's budget and faith.

Most technical teams can only provide the aggregate number because it's the only one the vendor provides without additional instrumentation. Beneath that single number lie at least five distinct economic activities with very different prices between them. Ignoring them means not knowing which one is bleeding margin.

This is the first article of a ten-part series. Its goal is to give the non-technical decision-maker the minimum literacy to converse with the CTO on equal footing, and more importantly, to make governance decisions that don't depend on the good faith of whoever implements.

Before moving forward, a calibrated honesty: the *decomposition* is well-known. Mature teams have done *cost allocation* by SKU in cloud for a decade. What this series adds is the **editorial translation** into CFO language, the **sequence by plans** with value gates between each, and the application to the peculiarities of token economics (five prices, agentic amplification, subscription subsidy, cliff in migration to API). This is *epistemic hygiene* applied to AI FinOps: **the aggregate lies; the decomposition does not**.

I begin with the principle: what is a token, really, and why does a single token have five prices?

## What Is a Token, Really

A token is a unit of information that the AI model processes. It can be a complete word, a piece of a word, or a symbol. The phrase *"The client wants a report"* has approximately seven tokens in English and ten in Portuguese. This difference alone already has cost implications that will return in another article.

What matters now is this: a token doesn't have one price. It has five, depending on its **economic position** in the conversation.

I'll use Anthropic's official prices for Claude Opus 4.7, effective May 2026, because it's the stack I use in the Prism referenced in this article. The multipliers apply to any model, but the absolute values change.

### Component 1: Input Tokens ($5 per million tokens)

These are the tokens you send to the model in your call: the prompt, the conversation history, the document you paste, the instructions. What you ask the model to consider before responding.

This is the base price. The other four components are calculated as multiples of it.

Economic signal: high input means you're sending long, possibly verbose prompts, or history that should be served from cache.

### Component 2: Cache Write 5 Minutes ($6.25 per million = 1.25× input)

Anthropic allows you to store the context you send for reuse in subsequent calls. The first time the system stores it, you pay 25% more than you would for normal input. In exchange, subsequent reads of the same context cost almost nothing.

The short cache window lasts 5 minutes. It makes sense for interactive sessions where the user asks several follow-up questions about the same material.

Economic signal: growing cache write 5m may indicate that context is changing too much between calls, nullifying the caching benefit.

### Component 3: Cache Write 1 Hour ($10 per million = 2× input)

The long-window version. You pay double the input to store context that lives up to one hour. This is what Claude Code uses by default, and for good reason: development and analysis sessions typically last more than five minutes.

The math only compensates if the context is read at least twice. Otherwise, you're paying double input for nothing.

Economic signal: dominant cache write 1h in your invoice is normal for a long-session workflow. If it's also high with short-priority applications, there's a mismatch between usage pattern and caching strategy.

### Component 4: Cache Read ($0.50 per million = 0.1× input = 10% of base price)

When the model reads context that was already stored, you pay only 10% of the normal price. This is where caching economics make sense.

This is, without a doubt, the most underestimated component by most teams. It's also what typically dominates total token volume in systems with long sessions, exactly because context is re-read every turn.

Economic signal: cache read representing the largest share of token volume is healthy. It means you're reusing computational work instead of repeating it.

### Component 5: Output Tokens ($25 per million = 5× input)

These are the tokens the model generates in response. The answer text, the tools it decides to invoke, anything that comes out of the model.

Output is the most expensive component per unit. Five times more expensive than input. The intuition here matters: asking the model to be concise saves you money disproportionately to the size of the response.

Economic signal: excessive output relative to input may indicate the model is under-utilized in tool use or structured output capabilities, and is *talking* instead of *acting*.

### Side note: server-side tools

These are not token prices. They're separate lines running on Anthropic's servers and appearing in parallel on your invoice. The two relevant ones:

- **Web search:** $10 per thousand searches, or $0.01 per search
- **Web fetch:** no additional cost beyond the tokens of the content brought in

These lines rarely appear in generic dashboards. They appear on your invoice.

---

A note before moving forward: the 0.1× multiplier for cache read is specific to Anthropic. OpenAI does automatic caching without charging cache write (only the discount on read). Gemini has Context Caching since 2024 with a different pricing model: storage per hour and read as a fraction of input, without a fixed cache write fee. The three mechanics are not equivalent. The absolute numbers in this article need to be recalculated for your vendor. The five economic positions framework and the decomposition logic apply to any model.

The practical consequence of this decomposition is simple. When someone in your organization says *"our AI cost was X,"* that X is the sum of these five components plus tools. Without seeing each line, you cannot optimize. Worse, you can't even say where the bleeding is.

## My Real Numbers

In May 2026, I built a local tool that parses Claude Code transcripts and calculates this decomposition at my individual scale. I call it the Prism, and it's the living case of this article. The numbers below are real, measured over 16 sessions of my daily work over 8 days.

**Methodology note:** these are numbers from one person, in one workflow (long-context development and analysis with Claude Code), over 8 days. N=1 is not statistics. It's a reproducible demonstration. The ratios I extract (53% in cache read, 0.1% pure input) are *this* workflow's; a support agent with short sessions will have a radically different profile. Use them to calibrate the method, not as benchmarks for your organization.

**Total volume:** 233 tasks, 2,469 assistant turns, 626 million tokens processed.

**Simulated API cost:** $565.67. Calculated at Anthropic's official rate as if usage had been billed via API. Important: in reality, I pay only the monthly subscription of €99. The $565 figure is what this same activity would cost if billed by consumption. I'll return to this point.

Breakdown by component:

| Component | Tokens | Cost | % of Total |
|---|---:|---:|---:|
| Input | 122,857 | $0.61 | 0.1% |
| Cache write 5m | 3,220,569 | $20.13 | 3.5% |
| Cache write 1h | 16,987,141 | $169.87 | 29.9% |
| Cache read | 606,843,890 | $303.42 | **53.4%** |
| Output | 2,964,869 | $74.12 | 13.0% |
| **Total** | **630,139,326** | **$568.15** | 100% |

*Accounting honesty note: the table above applies the Opus 4.7 rate to all tokens (the dominant model in my usage). The per-turn calculation, with the exact rate of each invoked model, gives $565.67 from the lead. The difference of $2.48 (0.4%) comes from Sonnet 4.6 turns (input $3 vs $5) and `synthetic` turns with no cost. Prism snapshot as of 2026-05-22.*

The number that should catch attention is the **53.4% in cache read**. More than half of my cost came from re-reads of already-stored context, and that's good news. It's costing me a tenth of what it would without caching.

If we ignore caching and recalculate the cost as if each cache read were a new input at $5 per million, the total would jump to approximately $3,290. The caching savings in this period were **$2,725**, meaning five times what I actually paid in simulated API cost.

This is the most underutilized financial lever in generative AI applications. If your vendor doesn't show you caching savings on a standalone line, they're keeping you in the dark about one-fifth of your invoice.

Another number worth looking at closely: **pure input was 0.1%**. The overwhelming majority of tokens entering the model already come from cache. This means my workflow has a coherent session and I'm reusing work. Applications with pure input above 10% likely have erratic prompts or poorly designed caching strategy.

### Distribution Across Tasks

It's not enough to look at the sum. The average hides the tail. Of 233 tasks, the median cost was $1.01, but the 95th percentile was $9.70 and the most expensive task reached $22.68. There's an 80× factor between the typical task and the worst task in the period.

For the CFO, this matters because any budget projection based on averages will fail at the critical moment. The following articles in this series return to this point with more depth.

## The Framework: The Canonical Event of TRA

Getting this decomposition is no accident. It was the direct consequence of having the right event being written per call. Without that event, any aggregate vendor invoice mixes all workflows, users, clients, and tools. You cannot allocate cost to a team, a project, or a feature without additional instrumentation.

The solution I documented as a framework is called **Token Resilience Architecture**, or TRA. It's a synthesis of my own instrumentation work combined with a reorganization of patterns I extracted from the 16 talks at Day 1 of AI Week 2026 Milano. The central component, and the only one you need to keep recorded as a non-technical decision-maker, is this: the **canonical event** (CTE, *Canonical Token Event*).

The canonical event is the data object that describes each call your organization makes to the model. One line per call. The non-negotiable fields:

1. **`workflow_id`**: the business task the call belongs to. *"support.triage_agent"*, *"product.recommender"*, *"legal.summarizer"*. Without this field labeled by the application, nothing can be allocated.
2. **`model`**: the model used. The correct rate must be applied per call, not as an average.
3. **Decomposed tokens**: the five columns: input, cache_write_5m, cache_write_1h, cache_read, output.
4. **`price_snapshot`**: the price in effect at the time of the call, recorded in the event. Prices change. History is only honest if the snapshot goes with the event.
5. **`trace_id`**: identifies which set of calls belongs to the same user task. This field is what allows answering *"how much did that operation cost?"* in systems with agents.
6. **`user_visible`**: flag indicating whether this call's response is shown to a human or is an internal system step. In systems with agents, most calls are invisible, and that will be the topic of the third article in this series.

The golden rule separating organizations that know their costs from those that don't is this: **the canonical event is emitted by the gateway, not the application**. Centralizing capture at a single point makes observability independent of each agent's code, and eliminates dependence on the vendor to give you visibility.

If your organization doesn't yet have an AI gateway or equivalent tooling (Helicone, Portkey, Langfuse), this is the first FinOps task. Mature open-source exists: the LiteLLM Proxy does this in one to two days of pure technical work, or weeks if SSO, audit logs, and compliance need integration. From the day the CTE starts being written, all the metrics I describe in the following articles become computable.

TRA has three data plans. This article covers only plan 1, pure telemetry. The following plans, correlation by trace and joining with business signals, are the topic of article 9. But the construction sequence is clear: you sell value in plan 1, build by plans, with validated value gates between each jump.

**Honesty about what TRA is, and what it isn't.** Mature open-source tools (LiteLLM, Helicone, Langfuse, Portkey) already materialize these fields in a product ready to use. TRA is not a replacement for tooling. It's an editorial framework. What it adds is the construction order (three plans with validated value gates between each) and the translation of metrics into a vocabulary a CFO uses in a board meeting. If you already have Helicone or Langfuse running, you're on plan 1; what these tools **don't** show you is probably: the ratio between visible output and total output (that agentic amplification α we'll see in article 3), cost per business task with success vs failure (CPSO), and the cliff multiplier that tells how much your app grows in cost on migration day to API. That's where the framework helps: not collecting data, reading it.

## Decision for This Week

At the next product or finance meeting where AI comes up:

**1. Ask for the breakdown.** The last 30 days, in five columns: input, cache write 5m, cache write 1h, cache read, output. Plus server-side tools on a separate line.

**2. If the answer is "we don't have those numbers":** task zero is to instrument the gateway (assuming there isn't one yet). LiteLLM, Portkey, or Helicone resolve in days for a simple case; weeks in environments with compliance and SSO. Without this, all optimization conversations are opinions.

**3. If they bring numbers but only aggregated by team or client:** the `workflow_id` is missing from the CTE. Without that label, they can't allocate cost to features, which means they can't govern priorities. Ask for re-instrumentation.

**4. Calculate caching savings.** If your invoice is dominated by cache read, and your caching savings are greater than effective cost (as in mine, at 5×), you have healthy caching. If cache read is negligible, you're either losing money or have a usage pattern you haven't yet optimized.

**Common objection: "we already have the vendor dashboard, is that enough?"**

Not enough. Anthropic's Admin API and OpenAI's Usage API give aggregate totals, sufficient for treasury budget. They don't give `workflow_id`, they don't give `trace_id`, they don't give `user_visible`. They serve for the CFO to know how much was spent. They don't serve to allocate cost to a feature, audit migration to metered API, or negotiate priorities with a product team. The vendor dashboard is exactly the aggregate number this article describes as insufficient.

> **The next number, monthly:**
> **% of total cost in cache read.** Target: above 60%.
> Sub-number: **% of pure input.** If above 10%, erratic prompts.

---

**⚠ Migrator warning (Claude Code → API):**

*With a Claude Code seat, the five components I described in this article are hidden behind a flat price (€99 to €200 per month). In API billing, each one is a charged line. Worse: the caching that saved me $2,725 in this article must be instrumented by yourself in production, and whoever configures it poorly pays full input instead of 10%. Do not migrate an application to metered API without first having the five components being reported in production, for at least one week, with realistic volume.*

*This is the central theme of article 7 in the series, where I will show the complete mathematics of the cliff.*

---

## Next Article

Anthropic announced that Opus 4.7 kept the same price per token relative to 4.6. The headline is literally true. So why does the same prompt consume 35% more tokens under the hood?

The answer is the tokenizer. Article 2 of the series explains how to detect and model this, with the methodology for running regression on your own usage base.

---

## Sources and Notes

- **Official Anthropic pricing, May 2026 version:** [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing). Rate card snapshot in this article was taken.
- **Anthropic Admin API · usage & cost:** [docs.anthropic.com/en/api/admin-api/usage-cost](https://docs.anthropic.com/en/api/admin-api/usage-cost). Confirms aggregation by workspace/project without allocation by workflow.
- **OpenAI · prompt caching:** [platform.openai.com/docs/guides/prompt-caching](https://platform.openai.com/docs/guides/prompt-caching). Automatic caching, no fixed cache-write fee.
- **OpenAI Usage API:** [platform.openai.com/docs/api-reference/usage](https://platform.openai.com/docs/api-reference/usage).
- **Google Gemini · Context Caching:** [ai.google.dev/gemini-api/docs/caching](https://ai.google.dev/gemini-api/docs/caching). Storage-per-hour model + read discount, in production since 2024.
- **Comparable gateways and observability:** [LiteLLM](https://docs.litellm.ai/), [Helicone](https://www.helicone.ai/), [Langfuse](https://langfuse.com/), [Portkey](https://portkey.ai/). All with decomposition of tokens by component and custom metadata equivalent to `workflow_id`.
- **Prism:** local tool I built to parse Claude Code transcripts into SQLite and expose TRA metrics on a React dashboard. The numbers in this article are derived directly from it. It will be part of the open **Token Economy Diagnostic** opening the week of article 7.
- **Token Resilience Architecture (TRA) and Canonical Token Event (CTE):** internal documentation in progress. Public version expected during this series, with reference to the 16 talks at Day 1 of AI Week 2026 Milano that fed the synthesis.
- **Karpathy, Andrej, "Let's build the GPT Tokenizer":** foundational reference for anyone wanting to deepen their understanding of tokenization mechanics. Video available at [youtube.com/watch?v=zduSFxRajkE](https://www.youtube.com/watch?v=zduSFxRajkE).
