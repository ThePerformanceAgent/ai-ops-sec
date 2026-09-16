---
title: "5 preços para 1 token: o que estás mesmo a pagar pela tua IA"
description: "Pago €99 por mês de subscrição. No mesmo período, consumi $565 em valor equivalente de API. Cinco componentes, cinco preços, e porque é que o agregado mente."
pubDate: 2026-05-27
lang: pt
area: tokenizacao
translationKey: 5-precos-um-token
tags: [token-economy, token, cost, finops, pricing, cache, economics, cfo]
series: "The Token Economy"
cover: cost-meter
status: published
sources:
  - title: "Publicação original no Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/5-precos-um-token"
    accessed: 2026-09-16
verified:
  - "Importado da publicação original sem alterações de conteúdo. Retirados: assinatura e nota de próximo artigo. Renomeado: Brain App para Prism, o nome público da engine desde Junho de 2026."
verifiedOn: 2026-05-27
changelog:
  - date: 2026-05-27
    note: "Publicação original em tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republicado no André Silva Lab, área Tokenização."
---

> *Artigo 1 de 10 da série **The Token Economy**. Decomposição com números reais do meu próprio uso de Claude Code ao longo de 8 dias.*

---

Pago €99 por mês de subscrição. No mesmo período, consumi $565 em valor equivalente de API. Cinco componentes diferentes, cinco preços. Se o teu CFO lê apenas uma linha no dashboard, está a ler ficção financeira.

---

## A pergunta que o teu CFO devia fazer

Todas as terças-feiras alguém na tua empresa faz a mesma pergunta: *"Quanto está a IA a custar?"*

A resposta que recebe é, normalmente, um único número: a fatura da subscrição, a soma dos seats, o valor pago ao fornecedor. Esse número não está errado, responde a uma pergunta diferente da que interessa.

A pergunta que interessa para um CFO é esta: **de cada euro que a IA consome, quanto vai para cada componente da operação?** Sem essa decomposição não há FinOps de IA. Há orçamento e fé.

A maioria das equipas técnicas só consegue dar o número agregado porque é o único que o fornecedor entrega sem instrumentação adicional. Por baixo desse número único vivem, no mínimo, cinco actividades económicas distintas, com preços muito diferentes entre si. Ignorá-las é não saber onde está a sangrar a margem.

Este é o primeiro artigo de uma série de dez. O objectivo é dar ao decisor não-técnico a literacia mínima para conversar de igual para igual com o CTO e, sobretudo, para tomar decisões de governance que não dependam da boa-fé de quem implementa.

Antes de avançar, uma honestidade calibrada: a *decomposição* é conhecida. Equipas maduras fazem *cost allocation* por SKU em cloud há uma década. O que esta série acrescenta é a **tradução editorial** para linguagem de CFO, a **sequência por planos** com value gates entre cada um, e a aplicação às particularidades da economia de tokens (cinco preços, amplificação agêntica, subsídio de subscrição, cliff na migração para API). Isto é *higiene epistémica* aplicada a AI FinOps: **o agregado mente; a decomposição não**.

Começo pelo princípio: o que é, mesmo, um token, e porque é que um único token tem cinco preços?

## O que é, mesmo, um token

Um token é uma unidade de informação que o modelo processa. Pode ser uma palavra completa, um pedaço de palavra ou um símbolo. A frase *"O cliente quer um relatório"* tem cerca de dez tokens em português e sete em inglês. Esta diferença, por si só, já tem implicações de custo a que voltarei noutro artigo.

O que importa agora é isto: um token não tem um preço. Tem cinco, dependendo da sua **posição económica** na conversa.

Vou usar os preços oficiais da Anthropic para o Claude Opus 4.7, em vigor em Maio de 2026, porque é a stack que uso na Prism referida neste artigo. Os multiplicadores aplicam-se a qualquer modelo; os valores absolutos mudam.

### Componente 1: Input tokens ($5 por milhão)

São os tokens que envias ao modelo na chamada: o prompt, o histórico da conversa, o documento que colas, as instruções. Aquilo que pedes ao modelo para considerar antes de responder.

É o preço-base. Os outros quatro componentes calculam-se como múltiplos deste.

Sinal económico: input alto significa prompts longos, eventualmente verbosos, ou histórico que devia ser servido a partir de cache.

### Componente 2: Cache write 5 minutos ($6,25 por milhão = 1,25× input)

A Anthropic permite armazenar o contexto que envias para reutilização em chamadas subsequentes. A primeira vez que o sistema o guarda pagas 25% mais do que pagarias por input normal. Em troca, leituras seguintes do mesmo contexto custam quase nada.

A janela curta dura 5 minutos. Faz sentido em sessões interactivas em que o utilizador faz várias perguntas seguidas sobre o mesmo material.

Sinal económico: cache write 5m a crescer pode indicar que o contexto está a mudar demasiado entre chamadas, anulando o benefício do caching.

### Componente 3: Cache write 1 hora ($10 por milhão = 2× input)

A versão de janela longa. Pagas o dobro do input para guardar contexto que vive até uma hora. É o que o Claude Code usa por defeito, e por boa razão: sessões de desenvolvimento e análise costumam durar mais de cinco minutos.

A matemática só compensa se o contexto for lido pelo menos duas vezes. Caso contrário, estás a pagar o dobro do input por nada.

Sinal económico: cache write 1h dominante na tua factura é normal num workflow de sessão longa. Se também aparecer alto em aplicações de prioridade curta, há um mismatch entre padrão de uso e estratégia de caching.

### Componente 4: Cache read ($0,50 por milhão = 0,1× input = 10% do preço-base)

Quando o modelo lê contexto já armazenado, pagas apenas 10% do preço normal. É aqui que a economia de caching faz sentido.

É, sem dúvida, o componente mais subestimado pela maioria das equipas. Também é, tipicamente, o que domina o volume total de tokens em sistemas com sessões longas, exactamente porque o contexto é re-lido em cada turn.

Sinal económico: cache read a representar a maior fatia do volume é saudável. Significa que estás a reutilizar trabalho computacional em vez de o repetir.

### Componente 5: Output tokens ($25 por milhão = 5× input)

São os tokens que o modelo gera em resposta. O texto da resposta, as tools que decide invocar, tudo o que sai do modelo.

Output é o componente mais caro por unidade. Cinco vezes mais caro que input. A intuição interessa: pedir ao modelo para ser conciso poupa-te dinheiro de forma desproporcional ao tamanho da resposta.

Sinal económico: output excessivo face a input pode indicar que o modelo está sub-utilizado em capacidades de tool use ou structured output, está a *falar* em vez de *agir*.

### Nota lateral: server-side tools

Não são preços de tokens. São linhas separadas que correm nos servidores da Anthropic e aparecem em paralelo na tua factura. As duas relevantes:

- **Web search:** $10 por mil pesquisas, ou $0,01 por pesquisa
- **Web fetch:** sem custo adicional além dos tokens do conteúdo trazido

Estas linhas raramente aparecem em dashboards genéricos. Aparecem na tua factura.

---

Uma nota antes de avançar: o multiplicador de 0,1× para cache read é específico da Anthropic. A OpenAI faz caching automático sem cobrar cache write (só o desconto na leitura). A Gemini tem Context Caching desde 2024 com modelo diferente: storage por hora e leitura como fracção do input, sem fee fixo de cache write. As três mecânicas não são equivalentes. Os números absolutos deste artigo precisam de ser recalculados para o teu fornecedor. O framework das cinco posições económicas e a lógica da decomposição aplicam-se a qualquer modelo.

A consequência prática desta decomposição é simples. Quando alguém na tua organização diz *"o nosso custo de IA foi X,"* esse X é a soma destes cinco componentes mais tools. Sem ver cada linha, não consegues optimizar. Pior: nem sequer consegues dizer onde está a sangrar.

## Os meus números reais

Em Maio de 2026 construí uma ferramenta local que faz parsing dos transcripts do Claude Code e calcula esta decomposição à minha escala individual. Chamo-lhe Prism e é o caso vivo deste artigo. Os números abaixo são reais, medidos ao longo de 16 sessões do meu trabalho diário em 8 dias.

**Nota metodológica:** são números de uma pessoa, num workflow (desenvolvimento e análise com contexto longo em Claude Code), em 8 dias. N=1 não é estatística. É uma demonstração reprodutível. Os rácios que extraio (53% em cache read, 0,1% de input puro) são *deste* workflow; um agente de suporte com sessões curtas terá um perfil radicalmente diferente. Usa-os para calibrar o método, não como benchmarks para a tua organização.

**Volume total:** 233 tarefas, 2.469 turns do assistente, 626 milhões de tokens processados.

**Custo simulado de API:** $565,67. Calculado à tarifa oficial da Anthropic como se o uso tivesse sido facturado por API. Importante: na realidade pago apenas a subscrição mensal de €99. Os $565 são o que esta mesma actividade custaria se fosse facturada por consumo. Voltarei a este ponto.

Decomposição por componente:

| Componente | Tokens | Custo | % do total |
|---|---:|---:|---:|
| Input | 122.857 | $0,61 | 0,1% |
| Cache write 5m | 3.220.569 | $20,13 | 3,5% |
| Cache write 1h | 16.987.141 | $169,87 | 29,9% |
| Cache read | 606.843.890 | $303,42 | **53,4%** |
| Output | 2.964.869 | $74,12 | 13,0% |
| **Total** | **630.139.326** | **$568,15** | 100% |

*Nota de honestidade contabilística: a tabela aplica a tarifa de Opus 4.7 a todos os tokens (modelo dominante no meu uso). O cálculo turn-a-turn, com a tarifa exacta de cada modelo invocado, dá $565,67 do lead. A diferença de $2,48 (0,4%) vem de turns Sonnet 4.6 (input $3 vs $5) e turns `synthetic` sem custo. Snapshot Prism de 2026-05-22.*

O número que devia chamar a atenção é os **53,4% em cache read**. Mais de metade do meu custo veio de re-leituras de contexto já armazenado, e isso é boa notícia. Está a custar-me um décimo do que custaria sem caching.

Se ignorarmos o caching e recalcularmos o custo como se cada cache read fosse um input novo a $5 por milhão, o total saltaria para cerca de $3.290. A poupança por caching neste período foi de **$2.725**, ou seja, cinco vezes o que efectivamente paguei em custo simulado de API.

Esta é a alavanca financeira mais sub-utilizada em aplicações de IA generativa. Se o teu fornecedor não te mostra a poupança por caching numa linha autónoma, está a deixar-te no escuro sobre um quinto da tua factura.

Outro número para olhar de perto: **input puro foi 0,1%**. A esmagadora maioria dos tokens que entram no modelo já vem de cache. Significa que o meu workflow tem coerência de sessão e estou a reutilizar trabalho. Aplicações com input puro acima de 10% têm provavelmente prompts erráticos ou estratégia de caching mal desenhada.

### Distribuição entre tarefas

Não chega olhar para a soma. A média esconde a cauda. Das 233 tarefas, o custo mediano foi $1,01, mas o percentil 95 foi $9,70 e a tarefa mais cara chegou a $22,68. Há um factor de 80× entre a tarefa típica e a pior tarefa do período.

Para o CFO, isto importa porque qualquer projecção orçamental baseada em médias falha no momento crítico. Os próximos artigos da série voltam a este ponto com mais profundidade.

## O framework: o evento canónico da TRA

Conseguir esta decomposição não foi acaso. Foi consequência directa de ter o evento certo a ser escrito por chamada. Sem esse evento, qualquer factura agregada do fornecedor mistura todos os workflows, utilizadores, clientes e tools. Não se consegue alocar custo a uma equipa, projecto ou feature sem instrumentação adicional.

A solução que documentei como framework chama-se **Token Resilience Architecture**, ou TRA. É uma síntese do meu próprio trabalho de instrumentação combinada com uma reorganização de padrões que extraí das 16 talks do Day 1 do AI Week 2026 Milano. O componente central, e o único que precisas de manter registado como decisor não-técnico, é este: o **evento canónico** (CTE, *Canonical Token Event*).

O evento canónico é o objecto de dados que descreve cada chamada que a tua organização faz ao modelo. Uma linha por chamada. Os campos não-negociáveis:

1. **`workflow_id`**: a tarefa de negócio a que a chamada pertence. *"support.triage_agent"*, *"product.recommender"*, *"legal.summarizer"*. Sem este campo etiquetado pela aplicação, nada se aloca.
2. **`model`**: o modelo usado. A tarifa correcta tem de ser aplicada por chamada, não como média.
3. **Tokens decompostos**: as cinco colunas, input, cache_write_5m, cache_write_1h, cache_read, output.
4. **`price_snapshot`**: o preço em vigor no momento da chamada, registado no evento. Os preços mudam. O histórico só é honesto se o snapshot acompanhar o evento.
5. **`trace_id`**: identifica qual o conjunto de chamadas que pertence à mesma tarefa do utilizador. É este campo que permite responder *"quanto custou aquela operação?"* em sistemas com agentes.
6. **`user_visible`**: flag que indica se a resposta desta chamada é mostrada a um humano ou é um passo interno do sistema. Em sistemas com agentes, a maioria das chamadas é invisível, e esse será o tema do terceiro artigo desta série.

A regra de ouro que separa as organizações que conhecem os seus custos das que não conhecem é esta: **o evento canónico é emitido pelo gateway, não pela aplicação**. Centralizar a captura num único ponto torna a observabilidade independente do código de cada agente, e elimina a dependência do fornecedor para te dar visibilidade.

Se a tua organização ainda não tem um AI gateway ou tooling equivalente (Helicone, Portkey, Langfuse), esta é a primeira tarefa de FinOps. Existe open-source maduro: o LiteLLM Proxy resolve isto em 1 a 2 dias de trabalho técnico puro, ou semanas se for preciso integrar SSO, audit logs e compliance. A partir do dia em que o CTE começa a ser escrito, todas as métricas que descrevo nos próximos artigos passam a ser computáveis.

A TRA tem três planos de dados. Este artigo cobre apenas o plano 1, telemetria pura. Os planos seguintes, correlação por trace e junção com sinais de negócio, são tema do artigo 9. Mas a sequência de construção é clara: vendes valor no plano 1, constróis por planos, com value gates validados entre cada salto.

**Honestidade sobre o que a TRA é e o que não é.** Ferramentas open-source maduras (LiteLLM, Helicone, Langfuse, Portkey) já materializam estes campos num produto pronto a usar. A TRA não substitui o tooling. É um framework editorial. O que acrescenta é a ordem de construção (três planos com value gates validados entre cada um) e a tradução de métricas para o vocabulário que um CFO usa numa reunião de board. Se já tens Helicone ou Langfuse a correr, estás no plano 1; o que estas tools provavelmente **não** te mostram é: o rácio entre output visível e output total (essa amplificação agêntica α que veremos no artigo 3), custo por tarefa de negócio com sucesso vs falha (CPSO), e o multiplicador de cliff que diz quanto a tua aplicação cresce em custo no dia da migração para API. É aí que o framework ajuda: não a recolher dados, a lê-los.

## Decisão para esta semana

Na próxima reunião de produto ou finanças em que IA apareça:

**1. Pede a decomposição.** Os últimos 30 dias, em cinco colunas: input, cache write 5m, cache write 1h, cache read, output. E, em linha separada, server-side tools.

**2. Se a resposta for "não temos esses números":** a tarefa zero é instrumentar o gateway (assumindo que ainda não há um). LiteLLM, Portkey ou Helicone resolvem em dias num caso simples; semanas em ambientes com compliance e SSO. Sem isto, toda a conversa de optimização é opinião.

**3. Se trazem números mas só agregados por equipa ou cliente:** falta o `workflow_id` no CTE. Sem essa etiqueta não conseguem alocar custo a features, e portanto não conseguem governar prioridades. Pede re-instrumentação.

**4. Calcula a poupança por caching.** Se a tua factura é dominada por cache read e a poupança por caching é maior que o custo efectivo (como na minha, em 5×), tens caching saudável. Se cache read é negligível, ou estás a perder dinheiro, ou tens um padrão de uso ainda por optimizar.

**Objecção comum: "já temos o dashboard do fornecedor, isso chega?"**

Não chega. O Admin API da Anthropic e a Usage API da OpenAI dão totais agregados, suficientes para orçamento de tesouraria. Não dão `workflow_id`, não dão `trace_id`, não dão `user_visible`. Servem para o CFO saber quanto se gastou. Não servem para alocar custo a uma feature, auditar uma migração para API metered, ou negociar prioridades com uma equipa de produto. O dashboard do fornecedor é exactamente o número agregado que este artigo descreve como insuficiente.

> **O próximo número, mensal:**
> **% do custo total em cache read.** Alvo: acima de 60%.
> Sub-número: **% de input puro.** Se acima de 10%, prompts erráticos.

---

**⚠ Aviso a quem migra (Claude Code → API):**

*Com um seat de Claude Code, os cinco componentes que descrevi neste artigo estão escondidos por trás de um preço flat (€99 a €200 por mês). Em facturação por API, cada um é uma linha cobrada. Pior: o caching que me poupou $2.725 neste artigo tem de ser instrumentado por ti em produção, e quem o configura mal paga input cheio em vez de 10%. Não migres uma aplicação para API metered sem antes ter os cinco componentes a ser reportados em produção, durante pelo menos uma semana, com volume realista.*

*Este é o tema central do artigo 7 da série, onde mostro a matemática completa do cliff.*

---

## Próximo artigo

A Anthropic anunciou que o Opus 4.7 manteve o mesmo preço por token face ao 4.6. O titular é literalmente verdadeiro. Então porque é que o mesmo prompt consome 35% mais tokens por baixo?

A resposta está no tokenizer. O artigo 2 da série explica como detectar e modelar isto, com a metodologia para correr a regressão sobre a tua própria base de uso.

---

## Fontes e notas

- **Preços oficiais Anthropic, versão Maio 2026:** [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing). Snapshot tarifário deste artigo tirado.
- **Anthropic Admin API · usage & cost:** [docs.anthropic.com/en/api/admin-api/usage-cost](https://docs.anthropic.com/en/api/admin-api/usage-cost). Confirma agregação por workspace/projecto sem alocação por workflow.
- **OpenAI · prompt caching:** [platform.openai.com/docs/guides/prompt-caching](https://platform.openai.com/docs/guides/prompt-caching). Caching automático, sem fee fixo de cache write.
- **OpenAI Usage API:** [platform.openai.com/docs/api-reference/usage](https://platform.openai.com/docs/api-reference/usage).
- **Google Gemini · Context Caching:** [ai.google.dev/gemini-api/docs/caching](https://ai.google.dev/gemini-api/docs/caching). Modelo de storage-por-hora + desconto de leitura, em produção desde 2024.
- **Gateways e observabilidade comparáveis:** [LiteLLM](https://docs.litellm.ai/), [Helicone](https://www.helicone.ai/), [Langfuse](https://langfuse.com/), [Portkey](https://portkey.ai/). Todos com decomposição de tokens por componente e metadata custom equivalente a `workflow_id`.
- **Prism:** ferramenta local que construí para fazer parsing de transcripts do Claude Code para SQLite e expor métricas TRA num dashboard React. Os números deste artigo derivam directamente dela. Fará parte do **Token Economy Diagnostic** aberto na semana do artigo 7.
- **Token Resilience Architecture (TRA) e Canonical Token Event (CTE):** documentação interna em curso. Versão pública prevista durante esta série, com referência às 16 talks do Day 1 do AI Week 2026 Milano que alimentaram a síntese.
- **Karpathy, Andrej, "Let's build the GPT Tokenizer":** referência fundacional para quem queira aprofundar a mecânica de tokenização. Vídeo em [youtube.com/watch?v=zduSFxRajkE](https://www.youtube.com/watch?v=zduSFxRajkE).
