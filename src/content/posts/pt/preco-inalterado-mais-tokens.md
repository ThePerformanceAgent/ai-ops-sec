---
title: "Os 35% que não vês: porque \"preço inalterado\" pode ser um aumento disfarçado"
description: "O vendor anuncia \"preço inalterado\". A tua factura sobe 35%. Como o tokenizer muda entre versões e gera mais tokens para o mesmo texto, e como medir o factor na tua operação."
pubDate: 2026-06-02
lang: pt
area: tokenizacao
translationKey: preco-inalterado-mais-tokens
tags: [tokenization, tokenizer, ai-cost, finops, tokens, anthropic, claude-opus, model-upgrade]
series: "The Token Economy"
cover: tokenizer-split
status: published
sources:
  - title: "Publicação original no Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/preco-inalterado-mais-tokens"
    accessed: 2026-09-16
verified:
  - "Importado da publicação original sem alterações de conteúdo. Retirados: assinatura e nota de próximo artigo. Renomeado: Brain App para Prism, o nome público da engine desde Junho de 2026."
verifiedOn: 2026-06-02
changelog:
  - date: 2026-06-02
    note: "Publicação original em tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republicado no André Silva Lab, área Tokenização."
---

> *Artigo 2 de 10 da série **The Token Economy**. O vendor anuncia "mesmo preço". A tua factura sobe. As duas coisas podem ser verdade ao mesmo tempo, e a razão está escondida num sítio que ninguém audita.*

---

## Hook

O teu fornecedor de IA lançou um modelo novo e garantiu: "preço por token inalterado". Acreditaste. A factura subiu 35% à mesma. Ninguém mentiu. Tu é que estavas a medir a coisa errada.

---

## A pergunta que ninguém faz no dia do upgrade

Quando um fornecedor de IA lança uma versão nova do modelo, a primeira coisa que toda a gente faz é olhar para a tabela de preços. Se o preço por milhão de tokens não mexeu, a equipa respira. "Não há impacto no orçamento." Passa-se à próxima reunião.

Há aqui um erro de raiz, e custa caro: **estás a assumir que o preço por token é a única variável. Não é.** O que pagas é o preço por token multiplicado pelo número de tokens. E o número de tokens que uma frase consome não é uma constante do universo. É uma decisão de engenharia que muda de modelo para modelo.

A pergunta certa, no dia do upgrade, não é "o preço por token mudou?". É esta: **"para o mesmo texto, este modelo novo gera mais ou menos tokens do que o anterior?"** Se gera mais, o teu custo subiu, por muito que a tabela de preços diga o contrário.

No artigo 1 desta série mostrei que um token tem cinco preços diferentes. Hoje mostro algo mais incómodo: o próprio número de tokens é instável, e essa instabilidade é uma variável de custo que quase ninguém segue.

---

## O conceito: o tokenizer é uma variável de custo, não uma constante

Antes de um modelo de IA ler uma única palavra, há um passo invisível: a tua frase é partida em pedaços chamados tokens. O algoritmo que faz esse corte chama-se tokenizer. É ele que decide se "relatório" é um token, dois, ou três.

Isto importa por uma razão simples e brutal: **pagas por token, mas é o tokenizer que decide quantos tokens existem.** O tokenizer está entre ti e a factura, e tu nunca o vês.

Há duas consequências que mudam a tua matemática de custo.

### Consequência 1: o português paga um imposto estrutural

A frase "o cliente quer um relatório" consome cerca de sete tokens em inglês e perto de dez em português. Mesmo significado, à volta de mais quarenta por cento de tokens (número aproximado, varia com o texto, confirma no contador de tokens do teu fornecedor). Não é um bug. Os tokenizers dos grandes modelos foram treinados sobretudo em texto inglês, por isso cortam o inglês de forma eficiente e tudo o resto de forma mais cara.

Se a tua operação trabalha em português, espanhol ou qualquer língua que não o inglês, estás a pagar um sobrecusto de tokenização em cada chamada, todos os dias, desde sempre. A maioria das empresas portuguesas que usa IA não sabe que este imposto existe, quanto mais quanto está a pagar por ele.

### Consequência 2: o tokenizer muda entre versões de modelo

Esta é a parte que apanha as equipas desprevenidas. Quando o fornecedor lança um modelo novo, pode trocar o tokenizer. Um tokenizer diferente parte o mesmo texto num número diferente de tokens. Para melhor ou para pior.

Quando é para pior, acontece o cenário do início: a tabela de preços fica igual, mas o mesmo trabalho passa a consumir mais tokens. O custo real sobe sem que uma única linha da rate card mude.

É por isto que "preço inalterado" pode ser, ao mesmo tempo, **literalmente verdadeiro e funcionalmente falso.** O preço por token não mudou. O número de tokens mudou. A tua factura segue o produto dos dois, não o primeiro.

O fornecedor não tem de te enganar para isto acontecer. Basta comunicar a métrica que o favorece (preço por token) e deixar a outra (tokens por texto) no escuro, onde ela sempre esteve.

---

## Porque é que ninguém te põe esta variável à frente

Vale a pena perguntar porque é que uma variável com este impacto fica escondida tanto tempo. A resposta não é conspiração. É incentivo.

O fornecedor tem todo o interesse em comunicar a métrica que controla e que o favorece: o preço por token. É um número limpo, comparável entre concorrentes, e que ele pode manter "inalterado" num anúncio. O número de tokens por texto, esse, depende do teu conteúdo, da tua língua e do tokenizer dele. É confuso, não é comparável entre fornecedores, e move-se de formas que não ajudam a narrativa de "mais barato que nunca". Por isso fica de fora da comunicação. Não por má-fé, por marketing.

Do lado das ferramentas, o silêncio tem outra causa. A maioria dos dashboards de custo foi desenhada por engenheiros para engenheiros, e mostra tokens e dólares, não a *variação* de tokens por texto entre versões. É preciso já saber que o problema existe para o querer instrumentar. E quem não sabe que existe, não o mede.

O resultado é o mesmo dos dois lados: a variável existe, mexe no teu dinheiro, e ninguém a põe à tua frente. Tens de ser tu a pedir o número, ou a medi-lo. É exactamente isso que a próxima secção te mostra.

---

## Os dados: o factor que apliquei à minha própria operação

No Prism, a engine proprietária que construí para medir o custo real de cada token que consumo, apliquei ao modelo dominante (Opus 4.7) um **factor de inflação de tokenização de 1.35**. Por outras palavras: assumi que o mesmo corpus de trabalho consome mais trinta e cinco por cento de tokens neste modelo do que consumiria num tokenizer de referência.

E isto não é estimativa minha. A própria Anthropic, no guia de migração do Opus 4.7, escreve que o novo tokenizer **"may use roughly 1x to 1.35x as many tokens"** para o mesmo texto, até cerca de 35% mais consoante o conteúdo, e recomenda à letra **"re-benchmark end-to-end cost"** antes de migrar. O 1.35 que apliquei é o topo desse intervalo oficial. Medições independentes encontraram ainda mais, 1.45 a 1.47x em documentação técnica. O preço por token não mudou. O número de tokens, pela palavra do próprio fornecedor, subiu até 35%. A magnitude no teu caso depende do teu conteúdo, e o resto deste artigo mostra-te como a medir.

Uma distinção que tens de manter limpa: este factor (entre versões do mesmo modelo) não é o mesmo que o imposto de língua da secção anterior (entre o português e o inglês). Um compara versões, o outro compara línguas. São dois fenómenos distintos e somá-los seria inflar o susto. Tratamos cada um pelo que é.

O ponto que interessa é o efeito no bolso. Pega no snapshot real da minha aplicação (490 tarefas, 14 de Maio a 1 de Junho de 2026):

- Custo-API consumido no período: **$1.140**.
- Se a tokenização inflaciona 35% e tu não a mediste, $1.140 deviam ter sido orçamentados como ~$845 antes do upgrade. A diferença de quase $300 não aparece em lado nenhum como "aumento". Aparece como "consumimos mais este mês", e morre numa conversa sobre uso, não sobre preço.

Multiplica isto por uma operação a sério. Se a tua base anual era €40.000 e um upgrade de modelo trouxe 35% mais tokens que ninguém detectou, são €14.000 a sair pela porta classificados como "uso", quando na verdade são preço. Durante doze meses, ninguém pergunta porquê, porque a tabela de preços jura que nada mudou.

### Uma ressalva: move-se nos dois sentidos

Sejamos justos com os fornecedores. A tokenização nem sempre piora. Historicamente, as gerações novas até tendem a cortar o texto de forma mais eficiente. O Opus 4.7 foi o caso em que subiu, e por uma razão que a Anthropic assume: tokens mais pequenos forçam mais atenção e melhoram o instruction-following. O 4.8, logo a seguir, manteve o mesmo tokenizer, sem nova subida. Ou seja, a tokenização move-se nos dois sentidos, e nunca sabes para que lado sem medir. A maioria das equipas não mede. É um risco de cauda que custa quase nada verificar e muito dinheiro ignorar.

E não acredites em mim. O número que te dei é o meu, da minha operação. Vais ouvir que isto é alarmismo de FinOps, que 35% num modelo é exagero. Talvez. Por isso é que o número tem de ser teu: corre o teu corpus e descarta-me com dados, não com intuição.

### Como isto se parece na prática

Imagina uma operação de apoio ao cliente que corre em português, dez mil conversas por mês. O fornecedor lança um modelo novo, "mesmo preço", e a equipa migra sem pensar duas vezes. No mês seguinte, o custo de IA sobe vinte e tal por cento. A reunião que se segue gasta uma hora a discutir "porque é que consumimos mais": culpa-se o volume, a sazonalidade, um cliente difícil. Ninguém olha para o tokenizer, porque ninguém sabe que ele mudou.

Bastava o corpus de regressão. Cem conversas típicas, contadas nas duas versões, antes de migrar. O factor teria aparecido em meia tarde, a decisão de migração teria incluído o sobrecusto, e aquela hora de reunião era escusada. A diferença entre as duas operações não é o talento da equipa. É uma régua que uma tem e a outra não. (Cenário ilustrativo, não um cliente real, mas é o padrão exacto que esta série existe para evitar.)

---

## O framework: detectar a inflação de tokenização (tokenizer-driven cost shift)

A boa notícia é que isto é mensurável, e barato de medir. Chamo-lhe a variável escondida do custo-API: o factor de inflação de tokenização. Aqui está a sequência mínima para o pores debaixo de olho.

### Passo 1: constrói um corpus de regressão

Junta cem prompts típicos da tua operação. Não inventados: os reais, os que a tua equipa corre todos os dias. Pedidos de relatório, resumos, classificações, respostas a clientes, o que for o teu pão. Cem chega para ter sinal e é trivial de montar.

Guarda este corpus como um activo fixo. É a tua régua. Vais usá-la sempre que o vendor mexer no modelo.

### Passo 2: conta os tokens por versão

Para cada prompt do corpus, conta quantos tokens consome na versão atual do modelo e na versão nova. Não estás a olhar para a resposta nem para a qualidade. Estás só a contar a entrada e a saída em tokens, prompt a prompt.

A maioria dos fornecedores expõe a contagem de tokens na resposta da API. Se constróis em cima de uma subscrição e não tens esse acesso directo, há gateways que fazem a contagem por ti (LiteLLM, Helicone, Portkey). O meu Prism tem um comparador de modelos que corre exactamente este teste.

### Passo 3: calcula o factor

```
Factor de inflação = tokens totais (versão nova) / tokens totais (versão antiga)
```

- **1.00** significa neutro. O upgrade não mexeu no teu custo de tokenização.
- **Abaixo de 1.00** é bom. O modelo novo é mais eficiente a tokenizar o teu tipo de texto. Raro, mas acontece.
- **Acima de 1.10** é um sinal de alerta. Há um aumento de custo real escondido por trás de uma rate card "inalterada", e tens de o levar para a decisão de migração.

Repara que este factor é teu, não do mercado. Depende da língua, do tipo de prompt, do peso de código vs texto na tua operação. Por isso é que não chega ler o anúncio do vendor: o impacto real só aparece quando corres o teu próprio corpus.

### Onde isto encaixa no quadro maior

No modelo de custo desta série, o Token Resilience Architecture (TRA), o custo-API que pagas é o produto de três coisas: preço por token, número de tokens, e os multiplicadores de cache e amplificação. O factor de inflação de tokenização é uma variável escondida dentro do número de tokens, e é a mais silenciosa de todas, porque não tem uma linha própria em nenhuma factura. Está escondido dentro do número de tokens, e o número de tokens está escondido dentro de "consumo". Duas camadas de invisibilidade. É por isso que sobrevive tanto tempo sem ser detectado.

---

## A decisão para esta semana

Três acções concretas para quem reconhece o problema.

**1. Trata cada upgrade de modelo como um evento de custo, não como um evento de features.**

Quando o vendor anuncia um modelo novo, a tua equipa vai ler a lista de melhorias. Acrescenta uma linha obrigatória a essa avaliação: "qual é o factor de inflação de tokenização para o nosso corpus?". Sem essa resposta, a migração não está avaliada, está só desejada.

**2. Corre o corpus de regressão antes de migrar, não depois.**

São algumas horas de trabalho, uma vez montado o corpus. Compara isso com descobrir um aumento de 35% três meses depois, quando já está cozido no orçamento e ninguém sabe de onde veio. Mede antes, decide com o número na mão.

**3. Se trabalhas em português, orçamenta com um buffer de língua.**

Não precisas de esperar por um upgrade. A penalização de língua já está a correr na tua operação neste momento. A acção realista não é "passar tudo para inglês" (degrada qualidade e ninguém o faz). É medir o teu sobrecusto de língua uma vez e metê-lo no orçamento como um buffer explícito, em vez de o descobrires como um "consumiram mais" no fim do trimestre. Saber que é vinte, trinta ou quarenta por cento também te diz onde vale a pena encurtar prompts e cachear contexto com mais agressividade.

**E uma não-acção, que é tão importante como as outras:**

Não aceites "preço inalterado" como sinónimo de "custo inalterado". São afirmações diferentes sobre variáveis diferentes. A primeira é sobre a rate card. A segunda é sobre a tua factura. Só a segunda paga salários.

---

## O número a seguir

> **Factor de inflação de tokenização = tokens (modelo novo) / tokens (modelo antigo), no teu corpus.**
> 1.00 é neutro. Acima de 1.10, tens um aumento de custo escondido por trás de um "preço inalterado". Mede-o a cada upgrade.

---

## Próximo artigo

O artigo 3 ataca o maior dos custos invisíveis: a amplificação agêntica. Vais ver porque é que, num sistema com agentes, entre cinquenta e noventa por cento dos tokens que pagas nunca chegam a ser vistos por ninguém. Chama-se alfa, e na minha própria aplicação chega a 11.1 vezes. Por cada token de resposta que leio, há onze que a máquina gerou a falar consigo própria. E todos contam para a factura.

---

## Fontes e notas

- **Tokenizer do Opus 4.7 (fonte oficial):** Anthropic, guia de migração, secção *Migrating to Claude Opus 4.7* > *Updated token counting*: o novo tokenizer *"may use roughly 1x to 1.35x as many tokens when processing text... (up to ~35% more, varying by content)"* e a Anthropic recomenda *"re-benchmark end-to-end cost"*. [platform.claude.com/docs/en/about-claude/models/migration-guide](https://platform.claude.com/docs/en/about-claude/models/migration-guide). O **Opus 4.8 mantém o tokenizer do 4.7** (sem nova subida).
- **Medições independentes** do tokenizer 4.7 (1.45 a 1.47x em documentação técnica e CLAUDE.md): claudecodecamp.com, finout.io.
- **Rate card:** Opus 4.7 = $5/M input, $25/M output, cache read a 10%. [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing).
- **Verifica o teu factor:** Anthropic Token counting endpoint [platform.claude.com/docs/en/build-with-claude/token-counting](https://platform.claude.com/docs/en/build-with-claude/token-counting).
- **Números do Prism:** fonte única [DATA-SNAPSHOT.md](../DATA-SNAPSHOT.md) (snapshot 2026-06-01, 490 tarefas, $1.140 custo-API; `default_model: opus-4-7`).
- **Imposto de tokenização do português:** a relação ~7 tokens (inglês) vs ~10 tokens (português) é aproximada e ilustrativa (exemplo do artigo 1); verificável no contador de tokens do fornecedor.
