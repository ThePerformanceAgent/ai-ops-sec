---
title: "O multiplicador agêntico: onde os teus tokens REALMENTE vão"
description: "Num sistema com agentes, a maior parte dos tokens que pagas nunca chega a ser vista por ninguém. Chama-se alfa, e na minha própria operação chega a 11.1 vezes. Aqui está como medi-lo antes que a…"
pubDate: 2026-06-09
updatedDate: 2026-06-10
lang: pt
area: tokenizacao
translationKey: multiplicador-agentico
tags: [token-economy, alfa, amplificacao-agentica, finops-de-ia, custo-de-agentes, subagentes, cfo, tra]
series: "The Token Economy"
cover: agentic-alpha
status: published
sources:
  - title: "Publicação original no Tokenization Economy"
    url: "https://tokenizationeconomy.org/research/multiplicador-agentico"
    accessed: 2026-09-16
verified:
  - "Importado da publicação original sem alterações de conteúdo. Retirados: assinatura e nota de próximo artigo. Renomeado: Brain App para Prism, o nome público da engine desde Junho de 2026."
verifiedOn: 2026-06-09
changelog:
  - date: 2026-06-09
    note: "Publicação original em tokenizationeconomy.org."
  - date: 2026-09-16
    note: "Republicado no André Silva Lab, área Tokenização."
---

> *Artigo 3 de 10 da série **The Token Economy**. Pagas por uma resposta. Recebes uma resposta. Entre as duas, a máquina falou consigo própria dez vezes, e cada palavra dessa conversa interna entrou na tua factura.*

Achas que pagas pelo que a IA te responde. Na minha própria operação, por cada token de resposta que leio, pago mais dez que nunca vejo. Não é desperdício. É como os sistemas com agentes funcionam. O problema é que quase ninguém o mede.

## A pergunta que o teu dashboard não responde

Abres o painel de uso da tua ferramenta de IA. Vês um número de tokens e um número de dólares. Parece transparência. Não é.

Esse número agrega duas coisas que deviam estar separadas: os tokens que produziram algo que um humano leu, e os tokens que a máquina gastou a falar consigo própria para lá chegar. Num chatbot simples, a segunda parte é pequena. Num sistema com agentes, é a maior fatia da factura, e está completamente escondida dentro de um total que parece inocente.

A pergunta certa não é "quantos tokens gastei?". É esta: **"por cada token de resposta útil, quantos tokens internos é que paguei?"** Esse rácio tem nome, tem uma fórmula, e na maioria das equipas ninguém o sabe de cor. É o número que separa quem controla o custo agêntico de quem está só a torcer para que a factura não cresça.

No artigo 1 desta série mostrei que um token tem cinco preços. No artigo 2, que o próprio número de tokens é instável entre versões. Hoje ataco o maior dos custos invisíveis: o volume de tokens que um sistema agêntico gera só para funcionar, e que tu pagas na íntegra.

## O conceito: a máquina passa a maior parte do tempo a falar consigo própria

Um modelo de IA simples funciona como uma pergunta e uma resposta. Escreves, ele responde, pagas pelos dois lados da conversa. Limpo e previsível.

Um sistema agêntico não funciona assim. Quando lhe dás uma tarefa, ele não responde de uma vez. Decompõe o pedido, chama ferramentas, lê ficheiros, escreve resultados intermédios, verifica o próprio trabalho, corrige, e às vezes delega partes a outros agentes que repetem o ciclo todo. Cada um destes passos é uma chamada ao modelo. Cada chamada gera tokens. Cada token entra na factura.

A consequência é contra-intuitiva e cara: **a maior parte dos tokens que pagas num sistema agêntico nunca chega a ser vista por ninguém.** São tráfego interno. A máquina a planear, a reler, a passar contexto de um passo para o outro, a falar consigo própria em voz que tu nunca lês.

Isto não é um defeito. É o que torna os agentes úteis. Um agente que verifica o próprio trabalho produz melhores resultados do que um que dispara à primeira. Mas cada verificação custa tokens, e esses tokens são reais. O erro não é ter trabalho interno. O erro é não o medir, e depois ficar surpreendido quando a factura de um sistema agêntico é cinco, dez ou quinze vezes maior do que o volume de respostas visíveis sugeria.

Dou-lhe um nome para o poderes seguir: **alfa**, a amplificação agêntica. É um rácio simples.

```
alfa = total de tokens gerados / tokens visíveis ao utilizador
```

Um alfa de 1 significa que não há trabalho interno: tudo o que a máquina produziu, tu leste. Um alfa de 11 significa que por cada token que chegou aos teus olhos, a máquina gerou outros dez pelo caminho. Quanto maior o alfa, maior a fatia da tua factura que paga conversa que nunca sai da máquina.

## Porque é que este número fica escondido

Vale a pena perguntar porque é que um rácio com este impacto não está em cima da mesa de toda a gente. A resposta, outra vez, não é conspiração. É design.

Os painéis de uso dos fornecedores mostram o que é fácil de agregar: tokens totais e custo total. Separar tokens visíveis de tokens internos exige saber o que conta como "visível", e isso depende da tua aplicação, não da deles. Um fornecedor não sabe quais dos teus tokens foram lidos por um humano e quais ficaram no loop interno do teu agente. Então mostra o total e deixa a separação contigo. Confortável para ele, opaco para ti.

Do lado das ferramentas de monitorização, o problema é parecido com o do artigo anterior: a maioria foi desenhada para medir chamadas individuais, não para reconstruir que vinte chamadas e três subagentes pertencem todos à mesma tarefa que o utilizador pediu. Sem essa reconstrução, não consegues calcular alfa, porque não sabes onde começa e acaba uma tarefa. Vês uma lista de chamadas, não um rácio.

E há um terceiro motivo, mais incómodo. Enquanto constróis em cima de uma subscrição de preço fixo, o alfa não dói. Pagas os teus noventa e nove euros por mês e o sistema gera os tokens internos que quiser, porque o custo marginal de cada token, para ti, é zero. O alfa está lá, alto como sempre, mas não tens incentivo nenhum para o medir. Até ao dia em que sais da subscrição. Lá voltamos.

## Os dados: 11.1 vezes na minha própria operação

No Prism, a engine proprietária que construí para medir o custo real de cada token que consumo, o alfa não é uma teoria. É uma leitura.

Pega no snapshot real, congelado a 1 de Junho de 2026: **490 tarefas, 42 sessões, 18 dias de trabalho** (14 de Maio a 1 de Junho). Neste período:

- O modelo gerou cerca de **5,87 milhões de tokens de output** no total.
- Destes, apenas **530 mil foram tokens visíveis**, respostas que eu efectivamente li.
- Alfa = 5,87 milhões a dividir por 530 mil = **11.1 vezes.**

Por outras palavras: **cerca de 91% de todo o output que paguei nunca foi visto por ninguém.** Foi a máquina a planear, a reler ficheiros, a verificar-se, a passar contexto entre passos, a delegar a subagentes. Dez em cada onze tokens de resposta que paguei foram conversa interna.

O custo-API do período foi **$1.140**, calculado a preço oficial como se fosse facturado via API. Se eu só estivesse a contar os tokens visíveis, teria orçamentado uma fracção disto e levado um susto no fim do mês. O alfa é a diferença entre o que parece que custa e o que custa.

### Os subagentes são a cauda cara

Dentro deste número há uma camada que merece atenção própria: os subagentes. Quando um agente delega parte de uma tarefa a outro agente, esse segundo agente corre o seu próprio ciclo completo, com o seu próprio contexto, os seus próprios tokens.

No mesmo snapshot, os subagentes foram **60 instâncias** que consumiram **$55,64**, à volta de **4,9% do custo global**. À primeira vista parece pouco. Mas a média engana, como já vimos no resto desta série: esse custo não está espalhado por igual. Concentra-se nas tarefas pesadas, as que decompõem muito e delegam muito. Numa tarefa leve, os subagentes não aparecem. Numa tarefa de investigação ou de análise multi-passo, podem ser a maior parte do custo dessa tarefa. A fatia global é pequena; a fatia das tarefas que mais delegam não é.

A lição não é "subagentes são caros". É "o custo dos subagentes vive nas extremidades, não na média, e se só olhas para a média não vês a tarefa que te custou dez vezes mais do que as outras".

### O que este número não é

O 11.1 é o meu, da minha operação, do meu padrão de uso. O teu alfa vai ser diferente, e provavelmente mais baixo, porque eu corro um sistema agêntico intensivo, com muita delegação e muita verificação. Um chatbot de apoio ao cliente tem um alfa muito menor. Um pipeline de RAG fica no meio. O ponto não é que o teu alfa seja 11. É que tu não sabes qual é, e devias.

E não acredites em mim por eu o dizer. O número que interessa é o que tu mesmo medes. A secção seguinte mostra-te como, e o resto é contigo: corre a tua operação, calcula o teu rácio, e se for baixo, óptimo, ficas descansado com dados em vez de fé.

## O framework: medir alfa por workflow

A boa notícia é que alfa é mensurável, e o método é o mesmo independentemente da ferramenta que usas. Aqui está a sequência mínima.

### Passo 1: define a fronteira de uma tarefa

Antes de contar tokens, tens de saber o que é "uma tarefa". É o pedido que um humano fez: "resume este documento", "responde a este cliente", "analisa esta conta". Tudo o que a máquina faz entre receber esse pedido e devolver a resposta final pertence a essa tarefa, por muitas chamadas internas e subagentes que isso implique.

Esta é a parte que a maioria das ferramentas não faz por ti. Tens de marcar cada chamada com um identificador da tarefa a que pertence. Sem isso, tens uma lista de chamadas soltas e nunca consegues fechar o rácio.

### Passo 2: separa tokens visíveis de tokens totais

Para cada tarefa, soma duas coisas: o total de tokens de output que a máquina gerou, e a parte desse output que um humano efectivamente leu (a resposta final, não os passos intermédios). A primeira soma inclui tudo: planeamento, verificações, subagentes, contexto interno. A segunda inclui só o que saiu para o utilizador.

Não precisas de construir nada de raiz para isto. Os gateways de IA que já fazem a contagem de tokens (LiteLLM, Helicone, Portkey) expõem o total por chamada; falta-lhes só a marcação de tarefa do passo 1 para fechares o rácio. O meu Prism faz as duas coisas no mesmo sítio, mas a régua é a mesma com qualquer ferramenta: o que conta é separares o que a máquina gerou do que um humano leu.

### Passo 3: calcula o rácio e compara com a régua

```
alfa = tokens totais de output / tokens visíveis ao utilizador
```

Um alfa isolado não te diz nada. Um alfa comparado com uma expectativa diz tudo. Esta é a régua que uso, e que te proponho como ponto de partida, não como lei:

- **Chat simples: alfa abaixo de 5.** Pergunta e resposta com pouco trabalho interno. Se passa disto, há loops a mais.
- **RAG ou retrieval: alfa abaixo de 8.** Há busca e leitura de contexto, por isso sobe, mas há um tecto razoável.
- **Multi-agente: alfa abaixo de 15.** Delegação e verificação custam, e aqui é esperado. Acima disto, vale a pena perguntar se cada subagente está a ganhar o seu lugar.

A régua é tua para ajustares à tua realidade. O que não é negociável é teres uma. Sem expectativa, qualquer alfa parece normal, e é assim que sistemas com alfa 30 passam meses sem ninguém reparar.

### Onde isto encaixa no quadro maior

No modelo de custo desta série, o Token Resilience Architecture (TRA), o teu custo-API é o produto de várias forças: o preço por token (artigo 1), o número de tokens que cada texto consome (artigo 2), e agora os multiplicadores que inflam esse número. Alfa é o maior desses multiplicadores em qualquer sistema com agentes. É o que transforma um custo de tokens visíveis que parece controlável numa factura real que é cinco a quinze vezes maior. E ao contrário do preço por token, que está numa tabela pública, alfa só existe se tu o medires. Ninguém to entrega.

## Aviso ao migrador: de Claude Code para API

Esta é a parte que torna o alfa explosivo, e é o motivo pelo qual ele vive escondido tanto tempo.

Enquanto a tua aplicação corre dentro de uma subscrição de preço fixo, alfa custa-te zero euros adicionais. Já pagaste o flat mensal. O sistema pode gerar onze tokens internos por cada token visível que tu nem sentes, porque o custo marginal de cada token é zero para quem paga uma mensalidade. O alfa está lá, alto, mas indolor.

No dia em que essa aplicação sai da subscrição e passa a ser facturada via API metered, alfa deixa de ser um número curioso e passa a ser um multiplicador directo da tua factura. Uma aplicação com alfa 11 não paga onze por cento a mais. Paga onze vezes os tokens que o "uso aparente" sugeria. E se essa aplicação, que vivia no teu desktop, passa a servir 100 utilizadores em produção, não somas, multiplicas: 100 utilizadores vezes alfa 11 são mais de mil vezes o volume de tokens que o teu painel de subscrição alguma vez te mostrou.

É por isto que tantas aplicações construídas em cima de subscrições com agentes falham as suas contas seis meses depois de ir para produção. Não é que o custo tenha subido. É que o alfa sempre lá esteve, indolor na subscrição, devastador em API, e ninguém o mediu antes de migrar. Mede o teu alfa hoje, enquanto ele ainda não dói. É a forma mais barata de evitar a conta mais cara.

## A decisão para esta semana

Três acções concretas para quem reconhece o problema.

**1. Pede o alfa de cada workflow que corre IA.**

Não o custo total, não os tokens totais. O rácio entre tokens totais e tokens visíveis, por tipo de tarefa. Se ninguém na tua equipa sabe responder, não estás a medir o sistema agêntico, estás a pagá-lo às cegas. A pergunta sozinha já te diz em que pé estás: se gera silêncio na sala, encontraste o buraco.

**2. Marca as tarefas antes de precisares do número.**

A razão pela qual ninguém calcula alfa é quase sempre técnica e mundana: as chamadas não estão marcadas com a tarefa a que pertencem, por isso é impossível agrupá-las depois. Resolve isto agora, com a instrumentação a frio, e o número fica disponível quando o board o pedir. Instrumentar depois da pergunta é tarde.

**3. Põe um tecto por workflow, não só um tecto global.**

Um limite de gasto global não te protege da tarefa que delega de mais e dispara o alfa. Define um tecto por tipo de workflow, alinhado com a régua da secção anterior, e faz saltar um alerta quando uma tarefa o ultrapassa. É a diferença entre descobrir o problema no momento e descobri-lo na factura.

**E uma não-acção, tão importante como as outras:**

Não confundas um alfa alto com um sistema mau. Um alfa alto pode ser exactamente o que precisas, se cada token interno está a comprar qualidade que compensa. O erro não é ter alfa alto. É ter alfa alto sem saber, sem o ter decidido, e sem o conseguir justificar quando alguém pergunta para onde foi o dinheiro.

## O número a seguir

> **Alfa = tokens totais de output / tokens visíveis ao utilizador, por workflow.**
> Chat abaixo de 5, RAG abaixo de 8, multi-agente abaixo de 15. Se não sabes o teu alfa, não estás a medir o custo agêntico, estás a adivinhá-lo.

## Próximo artigo

O artigo 4 vira a moeda. Depois de três artigos sobre custos que sobem em silêncio, o próximo é sobre a maior alavanca que tens para os baixar: o cache. Vais ver porque é que o prompt caching é o equivalente de IA à gestão de tesouraria, e como, na minha própria operação, evitou mais de cinco mil dólares de custo sobre mil e cem dólares de gasto real. Se não estás a medir a tua poupança de cache, estás a deixar a maior parte da margem em cima da mesa.
