---
title: "O prompt é o produto"
description: "Tratar o system prompt como um artefacto de primeira classe, versionado, testado e assumido pela equipa que o lança."
pubDate: 2026-05-13
updatedDate: 2026-05-27
lang: pt
area: tokenizacao
translationKey: prompt-is-the-product
tags: [token-economy, prompt, prompt-engineering, llm, reasoning, product]
series: "The Token Economy"
cover: prompt-craft
status: published
sources:
  - title: "Publicação original no Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/prompt-is-the-product"
    accessed: 2026-09-16
verified:
  - "Importado da publicação original sem alterações de conteúdo. Retirados: assinatura e nota de próximo artigo. Renomeado: Brain App para Prism, o nome público da engine desde Junho de 2026."
verifiedOn: 2026-05-13
changelog:
  - date: 2026-05-13
    note: "Publicação original em tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republicado no André Silva Lab, área Tokenização."
---

## Uma pequena mudança de enquadramento

Para a maioria das equipas que lançam funcionalidades agentic, o modelo é uma commodity. O prompt não é. O prompt codifica a decisão de produto.

## Trata-o como código

- Versiona-o. Um `system.md` no repositório é melhor do que um documento no Notion que ninguém encontra.
- Testa-o. Regista snapshots das respostas que importam e compara-as em cada alteração.
- Revê-o. Mudanças ao prompt merecem o mesmo escrutínio que migrações de schema.

## O problema da fronteira da equipa

Quando o prompt pertence a "quem mexeu nele por último", a qualidade regride em cada release. Escolhe um responsável da mesma forma que escolherias um responsável pela camada de autenticação.

> "Não lançamos o modelo. Lançamos o prompt à volta do modelo."

## Como isto se parece na prática

Uma pequena pasta `prompts/`, um passo de CI que corre casos de avaliação e uma revisão semanal das 20 piores respostas. É isso. A maior parte do trabalho é aparecer para olhar para aquilo que o sistema realmente disse.
