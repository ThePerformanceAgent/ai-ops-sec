---
title: "Construir sistemas multiagente que não colapsam"
description: "Padrões e anti-padrões aprendidos ao lançar loops agente coordenador–trabalhador em produção."
pubDate: 2026-05-20
updatedDate: 2026-05-27
lang: pt
area: agentes
translationKey: building-multi-agent-systems
tags: [token-economy, agent, agentic, multi-agent, orchestration, tool-use, autonomy]
series: "The Token Economy"
cover: agent-orbit
status: published
sources:
  - title: "Publicação original no Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/building-multi-agent-systems"
    accessed: 2026-09-16
verified:
  - "Importado da publicação original sem alterações de conteúdo. Retirados: assinatura e nota de próximo artigo. Renomeado: Brain App para Prism, o nome público da engine desde Junho de 2026."
verifiedOn: 2026-05-20
changelog:
  - date: 2026-05-20
    note: "Publicação original em tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republicado no André Silva Lab, área Tokenização."
---

## Porque falham tantos sistemas multiagente

Pelo mesmo motivo que falham muitos sistemas distribuídos: fan-out sem limites, contratos pouco claros entre atores e um coordenador que discretamente se torna um ponto único de falha.

## Um contrato de trabalho

Cada agente no sistema precisa de três coisas escritas:

1. **Um objetivo** que lhe pertence, expresso numa única frase.
2. **Uma interface**, as ferramentas que pode chamar e o schema do que devolve.
3. **Um orçamento**, tokens, tempo e profundidade de recursão.

Sem estas três coisas, não tens agentes. Tens ciclos while muito caros.

### O padrão coordenador

Um coordenador leve, que apenas encaminha e nunca faz o trabalho principal, tende a sobreviver a todos os orquestradores "inteligentes" que já testámos.

```ts
async function coordinate(task: Task) {
  const plan = await planner.run(task);
  for (const step of plan.steps) {
    await dispatch(step); // os trabalhadores fazem o trabalho
  }
}
```

## Coisas que reaprendemos vezes sem conta

- Determinismo nas margens, ambiguidade no meio.
- Os logs são o produto. Se não consegues reproduzir uma sessão, não consegues depurá-la.
- Humanos devem ser uma ferramenta que o agente pode chamar, não um fallback escondido atrás de um alerta.

## Fecho

Sistemas multiagente não justificam a sua existência por serem espertos. Justificam-na por serem legíveis.
