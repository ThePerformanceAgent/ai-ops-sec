---
title: "The 35% you don't see: why \"price unchanged\" can be a disguised increase"
description: "The vendor announces \"price unchanged\". Your bill goes up 35%. How the tokenizer changes between versions and yields more tokens for the same text, and how to measure the factor in your operation."
pubDate: 2026-06-02
lang: en
area: tokenizacao
translationKey: preco-inalterado-mais-tokens
tags: [tokenization, tokenizer, ai-cost, finops, tokens, anthropic, claude-opus, model-upgrade]
series: "The Token Economy"
cover: tokenizer-split
status: published
sources:
  - title: "Original publication at Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/preco-inalterado-mais-tokens"
    accessed: 2026-09-16
verified:
  - "Imported from the original publication without content changes. Removed: signature and next-article note. Renamed: Brain App to Prism, the engine public name since June 2026."
verifiedOn: 2026-06-02
changelog:
  - date: 2026-06-02
    note: "Original publication at tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republished at André Silva Lab, Tokenization area."
---

> *Article 2 of 10 in **The Token Economy** series. The vendor announces "same price". Your bill goes up. Both can be true at the same time, and the reason is hidden somewhere nobody audits.*

---

## Hook

Your AI vendor launched a new model and assured you: "price per token unchanged". You believed it. The bill went up 35% anyway. Nobody lied. You were just measuring the wrong thing.

---

## The question nobody asks on upgrade day

When an AI vendor ships a new model version, the first thing everyone does is look at the price sheet. If the price per million tokens didn't move, the team breathes. "No budget impact." On to the next meeting.

There is a root error here, and it's expensive: **you're assuming price per token is the only variable. It isn't.** What you pay is price per token multiplied by number of tokens. And the number of tokens a sentence consumes is not a universal constant. It's an engineering decision that changes from model to model.

The right question, on upgrade day, is not "did the price per token change?". It's this one: **"for the same text, does this new model produce more or fewer tokens than the previous one?"** If it produces more, your cost went up, no matter what the price sheet says.

In article 1 of this series I showed that a token has five different prices. Today I show something more uncomfortable: the number of tokens itself is unstable, and that instability is a cost variable almost nobody tracks.

---

## The concept: the tokenizer is a cost variable, not a constant

Before an AI model reads a single word, there is an invisible step: your sentence is split into pieces called tokens. The algorithm doing the cutting is the tokenizer. It decides whether "relatório" is one token, two, or three.

This matters for a simple, brutal reason: **you pay per token, but it's the tokenizer that decides how many tokens exist.** The tokenizer sits between you and the bill, and you never see it.

There are two consequences that change your cost math.

### Consequence 1: Portuguese pays a structural tax

The sentence "o cliente quer um relatório" consumes about seven tokens in English and close to ten in Portuguese. Same meaning, around forty percent more tokens (approximate number, varies with the text, confirm in your vendor's token counter). It's not a bug. The tokenizers of the big models were trained mostly on English text, so they cut English efficiently and everything else more expensively.

If your operation runs in Portuguese, Spanish or any non-English language, you're paying a tokenization surcharge on every call, every day, since forever. Most Portuguese companies using AI don't know this tax exists, let alone how much they're paying for it.

### Consequence 2: the tokenizer changes between model versions

This is the part that catches teams off guard. When the vendor releases a new model, they can swap the tokenizer. A different tokenizer splits the same text into a different number of tokens. For better or worse.

When it's worse, the opening scenario happens: the price sheet stays the same, but the same work now consumes more tokens. Real cost goes up without a single line of the rate card moving.

That's why "price unchanged" can be, at the same time, **literally true and functionally false.** Price per token didn't change. The number of tokens did. Your bill follows the product of the two, not just the first.

The vendor doesn't have to deceive you for this to happen. It's enough to communicate the metric that favours them (price per token) and leave the other one (tokens per text) in the dark, where it has always been.

---

## Why nobody puts this variable in front of you

It's worth asking why a variable with this much impact stays hidden for so long. The answer is not conspiracy. It's incentive.

The vendor has every interest in communicating the metric they control and that favours them: price per token. It's a clean number, comparable across competitors, and one they can keep "unchanged" in an announcement. The number of tokens per text, that one, depends on your content, your language and their tokenizer. It's messy, not comparable across vendors, and moves in ways that don't help the "cheaper than ever" narrative. So it stays out of the communication. Not out of bad faith, out of marketing.

On the tooling side, the silence has a different cause. Most cost dashboards were designed by engineers for engineers, and they show tokens and dollars, not the *variation* of tokens per text across versions. You already need to know the problem exists in order to want to instrument it. And whoever doesn't know it exists doesn't measure it.

The result is the same on both sides: the variable exists, moves your money, and nobody puts it in front of you. You have to ask for the number, or measure it. That's exactly what the next section shows you.

---

## The data: the factor I applied to my own operation

In Prism, the proprietary engine I built to measure the real cost of every token I consume, I applied to the dominant model (Opus 4.7) a **tokenization inflation factor of 1.35**. In other words: I assumed that the same workload corpus consumes thirty-five percent more tokens on this model than it would on a reference tokenizer.

And this isn't my estimate. Anthropic itself, in the Opus 4.7 migration guide, writes that the new tokenizer **"may use roughly 1x to 1.35x as many tokens"** for the same text, up to about 35% more depending on content, and recommends verbatim **"re-benchmark end-to-end cost"** before migrating. The 1.35 I applied is the top of that official range. Independent measurements found even more, 1.45 to 1.47x in technical documentation. Price per token didn't change. The number of tokens, by the vendor's own word, went up by as much as 35%. The magnitude in your case depends on your content, and the rest of this article shows you how to measure it.

A distinction you need to keep clean: this factor (between versions of the same model) is not the same as the language tax from the previous section (between Portuguese and English). One compares versions, the other compares languages. They are two distinct phenomena and adding them up would inflate the scare. We treat each for what it is.

The point that matters is the effect on your wallet. Take the real snapshot of my application (490 tasks, May 14 to June 1, 2026):

- API cost consumed in the period: **$1,140**.
- If tokenization inflates by 35% and you didn't measure it, $1,140 should have been budgeted as ~$845 before the upgrade. The difference of almost $300 shows up nowhere as an "increase". It shows up as "we consumed more this month", and dies in a conversation about usage, not about price.

Multiply this by a serious operation. If your annual base was €40,000 and a model upgrade brought 35% more tokens that nobody detected, that's €14,000 walking out the door classified as "usage", when in truth it's price. For twelve months, nobody asks why, because the price sheet swears nothing changed.

### A caveat: it moves in both directions

Let's be fair to the vendors. Tokenization doesn't always get worse. Historically, new generations actually tend to cut text more efficiently. Opus 4.7 was the case where it went up, and for a reason Anthropic owns: smaller tokens force more attention and improve instruction-following. 4.8, right after, kept the same tokenizer, no new rise. That is, tokenization moves in both directions, and you never know which way without measuring. Most teams don't measure. It's a tail risk that costs almost nothing to check and a lot of money to ignore.

And don't take my word for it. The number I gave you is mine, from my operation. You'll hear that this is FinOps alarmism, that 35% on a single model is overstated. Maybe. That's why the number has to be yours: run your corpus and dismiss me with data, not intuition.

### How this looks in practice

Imagine a customer support operation running in Portuguese, ten thousand conversations a month. The vendor ships a new model, "same price", and the team migrates without thinking twice. The following month, AI cost goes up by twenty-something percent. The next meeting spends an hour discussing "why we consumed more": volume gets the blame, then seasonality, then a difficult customer. Nobody looks at the tokenizer, because nobody knows it changed.

The regression corpus would have caught it. A hundred typical conversations, counted on both versions, before migrating. The factor would have shown up in half an afternoon, the migration decision would have included the surcharge, and that hour-long meeting was unnecessary. The difference between the two operations isn't team talent. It's a ruler one has and the other doesn't. (Illustrative scenario, not a real customer, but it's the exact pattern this series exists to prevent.)

---

## The framework: detecting tokenization inflation (tokenizer-driven cost shift)

The good news is this is measurable, and cheap to measure. I call it the hidden variable in API cost: the tokenization inflation factor. Here is the minimum sequence to put it under watch.

### Step 1: build a regression corpus

Gather a hundred typical prompts from your operation. Not invented: the real ones, the ones your team runs every day. Report requests, summaries, classifications, customer replies, whatever your bread and butter is. A hundred is enough to get signal and trivial to assemble.

Keep this corpus as a fixed asset. It's your ruler. You'll use it every time the vendor touches the model.

### Step 2: count tokens per version

For each prompt in the corpus, count how many tokens it consumes on the current version of the model and on the new version. You're not looking at the response or at quality. You're just counting input and output in tokens, prompt by prompt.

Most vendors expose the token count on the API response. If you build on top of a subscription and don't have that direct access, there are gateways that count for you (LiteLLM, Helicone, Portkey). My Prism has a model comparator that runs exactly this test.

### Step 3: calculate the factor

```
Inflation factor = total tokens (new version) / total tokens (old version)
```

- **1.00** means neutral. The upgrade didn't move your tokenization cost.
- **Below 1.00** is good. The new model is more efficient at tokenizing your kind of text. Rare, but it happens.
- **Above 1.10** is a warning sign. There is a real cost increase hidden behind an "unchanged" rate card, and you have to bring it into the migration decision.

Notice this factor is yours, not the market's. It depends on the language, the type of prompt, the weight of code vs text in your operation. That's why reading the vendor's announcement isn't enough: the real impact only appears when you run your own corpus.

### Where this fits in the bigger picture

In this series' cost model, the Token Resilience Architecture (TRA), the API cost you pay is the product of three things: price per token, number of tokens, and the cache and amplification multipliers. The tokenization inflation factor is a variable hidden inside the number of tokens, and it's the quietest of all, because it has no line of its own on any bill. It's hidden inside the number of tokens, and the number of tokens is hidden inside "consumption". Two layers of invisibility. That's why it survives for so long undetected.

---

## The decision for this week

Three concrete actions for anyone who recognises the problem.

**1. Treat every model upgrade as a cost event, not a feature event.**

When the vendor announces a new model, your team will read the list of improvements. Add a mandatory line to that evaluation: "what is the tokenization inflation factor for our corpus?". Without that answer, the migration is not evaluated, it's just wanted.

**2. Run the regression corpus before migrating, not after.**

It's a few hours of work, once the corpus is set up. Compare that with discovering a 35% increase three months later, when it's already baked into the budget and nobody knows where it came from. Measure first, decide with the number in hand.

**3. If you work in Portuguese, budget with a language buffer.**

You don't have to wait for an upgrade. The language penalty is already running in your operation right now. The realistic action isn't "switch everything to English" (it degrades quality and nobody does it). It's measuring your language surcharge once and putting it in the budget as an explicit buffer, instead of discovering it as "they consumed more" at the end of the quarter. Knowing it's twenty, thirty or forty percent also tells you where it pays to shorten prompts and cache context more aggressively.

**And one non-action, as important as the others:**

Don't accept "price unchanged" as a synonym for "cost unchanged". They are different statements about different variables. The first is about the rate card. The second is about your bill. Only the second pays salaries.

---

## The number to follow

> **Tokenization inflation factor = tokens (new model) / tokens (old model), on your corpus.**
> 1.00 is neutral. Above 1.10, you have a hidden cost increase behind a "price unchanged". Measure it on every upgrade.

---

## Next article

Article 3 attacks the biggest of the invisible costs: agentic amplification. You'll see why, in a system with agents, between fifty and ninety percent of the tokens you pay for never reach anyone's eyes. It's called alpha, and in my own application it hits 11.1x. For every response token I read, there are eleven the machine generated talking to itself. And all of them count on the bill.

---

## Sources and notes

- **Opus 4.7 tokenizer (official source):** Anthropic, migration guide, section *Migrating to Claude Opus 4.7* > *Updated token counting*: the new tokenizer *"may use roughly 1x to 1.35x as many tokens when processing text... (up to ~35% more, varying by content)"* and Anthropic recommends *"re-benchmark end-to-end cost"*. [platform.claude.com/docs/en/about-claude/models/migration-guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide). **Opus 4.8 keeps the 4.7 tokenizer** (no new rise).
- **Independent measurements** of the 4.7 tokenizer (1.45 to 1.47x in technical documentation and CLAUDE.md): claudecodecamp.com, finout.io.
- **Rate card:** Opus 4.7 = $5/M input, $25/M output, cache read at 10%. [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing).
- **Check your factor:** Anthropic Token counting endpoint [platform.claude.com/docs/en/build-with-claude/token-counting](https://platform.claude.com/docs/en/build-with-claude/token-counting).
- **Prism numbers:** single source [DATA-SNAPSHOT.md](../DATA-SNAPSHOT.md) (snapshot 2026-06-01, 490 tasks, $1,140 API cost; `default_model: opus-4-7`).
- **Portuguese tokenization tax:** the ratio ~7 tokens (English) vs ~10 tokens (Portuguese) is approximate and illustrative (example from article 1); verifiable in the vendor's token counter.
