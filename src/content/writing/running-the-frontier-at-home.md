---
title: "Running the frontier at home"
description: "What it actually takes — in gigabytes and dollars — to self-host open-weight models in mid-2026, from Kimi and GLM down to the 20B models eating the low end."
date: "2026-07-20"
tags: ["sovereignty", "llm", "hardware", "self-hosting"]
featured: true
heroImage: "/images/running-the-frontier-at-home.png"
ogImage: "/og-images/running-the-frontier-at-home.png"
---

> Prices and specs below were researched and, where possible, verified
> against primary sources on **July 20, 2026**. This market moves ~30%
> in a month. If you're reading this in 2027, treat it as archaeology.

So you've heard the hype. Kimi K2.6 trading blows with the closed
frontier. GLM-5.2 dropped with an MIT license. DeepSeek V4 shipped
open weights with a million tokens of context. And somewhere between
the third podcast and the fourth "open source has caught up" thread,
you asked the only question that matters to a sovereign engineer:
*what would it take to run that bad boy myself?*

Well, that's what I thought anyway, so I went and priced it. The 
answer has three tiers, one law, and a plot twist at the bottom end.

## The one law: memory is the wall

Every current frontier open model is a mixture-of-experts (MoE). Kimi K2.6
is ~1 trillion parameters with only 32B active per token; [GLM-5.2](https://www.nxcode.io/resources/news/glm-5-open-source-744b-model-complete-guide-2026)
is 753B with ~40B active; [DeepSeek V4 Pro](https://artificialanalysis.ai/articles/deepseek-is-back-among-the-leading-open-weights-models-with-v4-pro-and-v4-flash)
is 1.6T with 49B active. The active count buys you speed but no gain
on memory: **every expert must be resident**, because you
don't know which eight the router will want for the next token. A
1T-parameter MoE computes like a 32B model and *consumes* memory like a
1T model.

So the question "can I run it?" is really "how many gigabytes of
fast memory can I summon, and at what bandwidth?" Everything else is
detail.

## The tiers, in one table

Footprints are the [Unsloth](https://unsloth.ai/docs/models/kimi-k2.6)
dynamic GGUF sizes where available (the de facto standard for local
quants). "Minimum realistic hardware" means usable interactive speeds,
not a tech demo that grinds out a token while you make coffee.

| Model (release) | Params (total / active) | Footprint | GPUs / machines that run it | Approx. cost (Jul 2026) |
|---|---|---|---|---|
| DeepSeek V4 Pro (Apr 2026) | 1.6T / 49B | ~0.8 TB @ Q4 (est.) | 8× H200 141GB or B200-class server; not a home proposition | Six figures |
| Kimi K2.6 (2026) | ~1.04T / 32B | 340 GB @ Q2 · **584 GB @ Q4** | 4× H200 141GB (35–45 tok/s); 8× H100 80GB for Q4; EPYC + 384GB DDR5 + RTX 4090 offload (5–12 tok/s); used 512 GB M3 Ultra Mac Studio | $55k+ serious; ~$5k for single-digit tok/s |
| GLM-5.2 (Jun 2026) | 753B / ~40B | 241 GB @ Q2 · 476 GB @ Q4 | 6× RTX PRO 6000 96GB for Q4; 4× H200; 256–512 GB M3 Ultra at Q2 (3–9 tok/s) | ~$15k (unified) · $70k+ (GPU) |
| Qwen3.5-397B (Feb 2026) | 397B / 17B | ~214 GB @ Q4 | Mac Studio M3 Ultra 256GB; 3× RTX PRO 6000 96GB; or RTX 3090/4090 + 256 GB DDR5 offload (25+ tok/s) | ~$7K-$30k |
| gpt-oss-120b (2025) | 117B / 5.1B | ~63 GB native MXFP4 | 1× RTX PRO 6000 96GB; 1× H100 80GB; 2× RTX 5090 32GB; 128 GB Mac Studio / Strix Halo box | ~$5k–$13k |
| Llama 3.3 70B (dense) | 70B / 70B | ~40 GB @ Q4 | 2× RTX 3090 24GB; 1× RTX A6000 48GB; 2× Tesla P40 (slow but solvent); 64 GB+ M-series Mac | ~$4k-$10k |
| Gemma 4 31B / 26B-MoE (Apr 2026) | 31B dense · 26B / 3.8B | BF16 on one H100; ~16–19 GB @ Q4 | 1× RTX 3090 / 4090 24GB; RTX 5060 Ti 16GB (MoE); 2× Tesla P40 24GB; 32 GB M-series Mac | ~$1k–$4k |
| Qwen3.6 35B-A3B / 27B (Apr 2026) | 35B / 3B · 27B dense | 23 GB · 18 GB @ Q4 | 1× RTX 3090 / 4090 / 5090; 2× Tesla P40; RTX PRO 6000 hits 160–240 tok/s with MTP | ~$1k–$4k |
| gpt-oss-20b (2025) | 21B / 3.6B | ~15–16 GB | RTX 5060 Ti 16GB (111 tok/s); RTX 3090 (161); RTX 4090 (225); RX 7900 XT; any 16 GB M-series laptop | ~$$1.5K-$3k |

What those numbers feel like in practice, from people who've done it:
a 4× H200 box runs Kimi K2's 2-bit quant at [35–45 tok/s](https://hackmd.io/msiciwuST9mn3sgSPSyENw) —
lovely, and roughly the price of a car. A single RTX 4090 with 256 GB
of system RAM runs the same quant at ~5–6 tok/s. A
[$2,000 used-EPYC build](https://digitalspaceport.com/running-deepseek-r1-locally-not-a-distilled-qwen-or-llama/)
with 512 GB of DDR4 ran the full 671B DeepSeek R1 at ~3.5–4 tok/s,
and one memorable maniac ran it on
[fourteen RTX 3090s](https://www.ahmadosman.com/blog/r1-ktransformers-inference-livestream/)
at ~8 tok/s with KTransformers. Jeff Geerling clustered four 512 GB
Mac Studios over Thunderbolt and got
[~28 tok/s on Kimi K2 Thinking](https://developer.tenten.co/how-to-run-kimi-k25-locally-on-mac-studio-m3-ultra-with-512gb)
under 500 watts — the most elegant of the lot, with one problem we'll
get to.

Single digits per second is fine for chat. For agentic coding — the
thing you probably actually want — it's a long lunch per PR. Be honest
with yourself about which you're buying.

## The awkward part: you picked the worst year to shop

Here is what the sovereignty tax looks like in July 2026:

- The RTX 5090 (32 GB, $1,999 MSRP) [streets at $4,100–$4,300 new](https://videocardprices.com/) — more than double list.
- The RTX PRO 6000 Blackwell 96 GB — the single-card sweet spot for
  everything up to gpt-oss-120b — [jumped ~30% in one month](https://wccftech.com/nvidia-96-gb-rtx-pro-6000-blackwell-price-hits-13250-over-50-percent-hike/)
  to a $13,250 list price, ~55% over its launch MSRP.
- Apple [pulled the 512 GB Mac Studio option entirely](https://www.tomshardware.com/tech-industry/apple-pulls-512-mac-studio-upgrade-option)
  in March — the memory went to AI accelerators — and raised the 256 GB
  upgrade to $2,000. The best frontier-class home machine ever shipped
  is now a used listing.

The memory shortage that makes these models possible is the same one
making the hardware to run them absurd. Fab relief is forecast for
2027–2028. Plan accordingly.

## Break-even depends on who's buying

The comparison everyone actually faces: a frontier-lab subscription is
[$20/month for Claude Pro, $100–200 for Max](https://claude.com/pricing)
(ChatGPT [prices similarly](https://chatgpt.com/pricing/): $20 Plus,
$200 Pro). For a **solo user** against one $200/month seat:

| Your usage | On-prem rig that covers it | Hardware cost | Breaks even vs. one $200/mo seat |
|---|---|---|---|
| Casual daily chat | gpt-oss-20b on hardware you own | ~$0 | Immediately |
| Serious daily driver (30B class) | One RTX 3090 box — or 2× Tesla P40 | ~$0.8k–$3k | 4–15 months |
| 70B–120B, quality local coding | RTX PRO 6000 96GB + host | ~$14k–$16k | ~6–7 years |
| True frontier (Kimi/GLM class) | 350 GB+ memory rig | ~$10k–$25k | 4–10 years |

For an individual, the honest reading of that last column is that
frontier-class on-prem never pays for itself on money alone — you're
buying privacy, unmetered tokens, and the particular pleasure of
owning the means of inference. I think those are worth real money -
if you have it to spare in this economy. 

**Change the denominator, though, and the big rig changes character.**
A business isn't comparing a rig to one seat; it's comparing it to a
stack of them. Ten Max-class seats is $2,000 a month, $24,000 a year,
every year, forever. Against that, a ~$15k box with an RTX PRO 6000
serving gpt-oss-120b or Qwen3.6 to the whole office through vLLM
breaks even in about **eight months**. Even the $25k frontier-class
rig — Kimi or GLM at real quality — amortizes in roughly **a year**,
and unlike seats it doesn't rate-limit: agent fleets can run around
the clock at the marginal cost of electricity, tokens stop being a
metered anxiety, and the model becomes a capital asset instead of an
operating drip. Then there's the column the spreadsheet doesn't have:
for legal, health, finance and anyone under NDA-shaped gravity, *the
data never leaves the building* is not a preference — it's the
precondition that makes the project allowed to exist. The accountant
says a year to break even; the compliance officer says buy it
regardless.

The honest caveat survives the reframe: the open model you serve
in-house runs a season behind the closed frontier. For plenty of
business workloads — internal search, drafting, coding against your
own codebase, the entire plumbing layer of an agent fleet — a season
behind is more than good enough.

## Or: rent the metal

The third door, and for burst workloads the smart one. On
[Modal](https://modal.com/pricing) (per-second billing, verified July
20): an A100 80 GB is ~$2.50/hr, the 96 GB RTX PRO 6000 is ~$3.03/hr,
H100 ~$3.95/hr, H200 ~$4.54/hr, B200 ~$6.25/hr.
[RunPod](https://www.runpod.io/pricing) community cloud goes lower
still: a 3090 for $0.46/hr, a 5090 for $0.99/hr, the 96 GB PRO 6000
for $1.99/hr, B200 for $5.89/hr.

The arithmetic against buying is brutal. That $12,400 street-price
PRO 6000 buys ~4,100 hours on Modal's identical card:

| GPU-hours/day | Buying beats renting after |
|---|---|
| 1 | ~11 years |
| 2 | ~5.6 years |
| 4 | ~2.8 years |
| 8 (a workday) | ~17 months |
| 24/7 sustained | ~6 months |

Unless the card is hot most of the day, every day, rent it. And if you
just want tokens, skip GPUs entirely: Kimi K2.6 is served at
[$0.75 in / $3.50 out per million tokens](https://deepinfra.com/blog/kimi-k2-6-pricing-guide-deployment-tradeoffs)
on DeepInfra, DeepSeek V4 Pro at $1.74/$3.48 first-party. Open weights
mean the hosting market competes for you — which is, quietly, half the
sovereignty win already: no lock-in, a dozen interchangeable vendors,
and the weights are *right there* the day you decide to bring them
home.

And if the fiat rails are the part that bothers you, there is now a
properly sovereign on-ramp: [Routstr](https://routstr.com/), an
open-source protocol for decentralized inference routing. Providers
announce their models over Nostr relays; you point any
OpenAI-compatible client at them with a Cashu ecash token as the API
key, and cost is deducted per token in sats. No account, no email, no
card — a bearer token and a model. What's on offer ebbs and flows with
whoever's announcing, which is rather the point. It's the lightest way
I know to audition this month's open-weight releases without telling
anyone your name — and it cuts the other way too: run the Routstr
proxy in a Docker container beside your own rig, connect a mint, and
the box that serves your agents by day can earn sats serving strangers
by night. Open weights, owned hardware, permissionless payment — the
loop closes.

## The coda, and the real headline

While everyone stares at the trillion-parameter monsters, the bottom
of the market is improving faster than any other tier — and that's
where the sovereignty story turns from expensive hobby into default.

[gpt-oss-20b](https://openai.com/index/introducing-gpt-oss/) is 21B
total, 3.6B active, fits in ~16 GB, and does
[225 tok/s on a 4090, 161 on an old 3090, 111 on a $450 5060 Ti](https://runaihome.com/blog/gpt-oss-20b-local-ai-hardware-guide-2026/).
[Gemma 4](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)
(April 2026) ships a 26B MoE that activates 3.8B and a 31B dense that
sits third on the open-model leaderboard — while its E2B/E4B siblings
run offline on phones and Raspberry Pis. Qwen3.6-35B-A3B generates at
240 tok/s on one workstation card. These are not "small model"
experiences in the 2024 sense. They are competent, fast, cheap, and
they run on the laptop you already own — Strix Halo boxes with 128 GB
of unified memory go for ~$2,000–$3,300, and every M-series Mac with
32 GB is quietly a capable inference machine.

I'm not speculating from benchmarks here. My own home fleet runs on a
pair of Tesla P40s — 24 GB datacenter cards from 2016 that nobody
wanted until suddenly everybody did — in a box that cost less than
$1,000 all in. Forty-eight gigabytes between them, serving Gemma and
Qwen quants to multiple agents at once, daily. Two unglamorous
advances let a rig that old punch that far above its price. The first
is **sliding-window attention**: the Gemma lineage interleaves cheap
local-attention layers with occasional global ones (gpt-oss plays a
similar trick), so the KV cache no longer swallows your VRAM as
contexts grow — which is exactly what used to kill long agent sessions
on cheap cards. The second is **prompt caching**, which turns agents
from the worst-case workload into the best one: an agent resends the
same system prompt, tool schemas and working context on every single
call, so the server processes that prefix once and serves it from
cache forever after. My P40s spend their cycles generating new tokens,
not re-reading the same instructions for the hundredth time. The
bottom end isn't just getting better models — it's getting better
*serving economics*, and the two compound.

Eighteen months ago the honest answer to "can I run something good at
home?" was *no, not really*. Today it's *yes, up to about 120B, and
it's genuinely good*. The frontier will stay one budget-cycle out of
reach — that's what makes it the frontier. But the floor is rising
faster than the ceiling, the models are getting smaller-smarter
faster than the hardware is getting expensive, and the hardware won't
stay expensive forever either.

Buy the 24 GB card — or two pensioned-off P40s. Rent the H200s. Put
the shared rig in the office if you have colleagues to split it with.
Keep the subscription for the hard problems, for now. And check back
in a year — the table above will be wrong in the most encouraging
possible way.

---

*Sources and method: model footprints from Unsloth's quantization
docs and Hugging Face model cards; cloud and subscription prices
live-verified against vendor pricing pages on July 20, 2026; GPU
street prices from daily trackers (videocardprices.com,
bestvaluegpu.com) and reporting; homelab throughput from practitioner
write-ups linked inline. Key claims were adversarially verified
against primary sources; where sources conflicted (used-3090 prices,
DGX Spark throughput), I've left the numbers out rather than guess.*
