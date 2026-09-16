# AI Ops Sec

Segurança de agentes de IA e observabilidade, com prova. Blog estático em
[Astro](https://astro.build), bilingue (PT-PT por defeito, EN em `/en/`), sem trackers.

**Site:** https://andresilvalab.com/ (o `.dev` e o `www` redireccionam para aqui)

## Como está construído

| Camada | Escolha | Porquê |
|---|---|---|
| Gerador | Astro 7, saída 100% estática | HTML pronto, zero JS por omissão, indexa bem |
| Conteúdo | MDX em `src/content/posts/{pt,en}/`, schema Zod | cada artigo obriga a `sources`, `verified`, `changelog` |
| Pesquisa | Pagefind, índice gerado no build | pesquisa sem pedidos a terceiros |
| Imagens OG | satori + sharp, uma por artigo, no build | sem serviço externo |
| Fontes | auto-alojadas (`src/assets/fonts/`) | sem pedidos a CDNs de fontes |
| Descoberta | RSS por língua, sitemap com hreflang, `llms.txt`, `llms-full.txt`, JSON-LD | motores de busca e motores de resposta |
| Segurança | `public/_headers` (CSP, HSTS, etc.), meta CSP de reserva, `security.txt`, gitleaks + marcadores privados no CI, Dependabot | um blog de segurança tem de passar no próprio teste |
| Deploy | GitHub Actions → Cloudflare Workers (static assets) com `wrangler.jsonc` | o `_headers` (CSP, HSTS, COOP/CORP, cache) é aplicado de verdade; `www` e `.dev` redireccionam por Redirect Rules na zona; token limitado a Workers |

## Desenvolver

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # dist/ + índice Pagefind
npm run preview
npm run check:private
```

`SITE_URL` e `BASE_PATH` controlam o URL de produção (por defeito `https://andresilvalab.com` e `/`).

## Publicar um artigo

1. Ficheiro em `src/content/posts/<lang>/<slug>.mdx` com o frontmatter do schema (`src/content.config.ts`).
2. `status: draft` aparece só em `npm run dev`. `status: published` entra no build.
3. Pull request. O CI corre o build, o gitleaks e o portão de marcadores privados.
4. Merge em `main` publica.

Correcções de texto ou de facto são bem-vindas por pull request. Vulnerabilidades: ver [SECURITY.md](SECURITY.md).

## Licenças

Código MIT. Texto e imagens dos artigos CC BY 4.0. Ver [LICENSE](LICENSE).
