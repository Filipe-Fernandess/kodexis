# Kodexis

Site institucional em português, com visual escuro, logo original e quatro demonstrações que funcionam inteiramente no navegador.

Site: [kodexis.com.br](https://kodexis.com.br/) · Hospedagem alternativa: [kodexis.pages.dev](https://kodexis.pages.dev/).

## Demonstrações

- **Fluxo:** receitas e despesas, criação/edição/exclusão, filtros, totais, gráficos e exportação CSV.
- **FORMA:** catálogo, categorias, busca, ordenação, carrinho com limites de estoque, cupom `KODEXIS10`, frete e pedido de teste.
- **ContaHub:** visões de contador e cliente, empresas fictícias, solicitações, registro local do nome de arquivos e revisão de documentos.
- **NetLab:** topologia interativa, cenários de rede operacional, latência e servidor desconectado; terminal com `help`, `scan`, `ping`, `traceroute`, `status`, `diagnostico` e `clear`.

As demonstrações usam dados fictícios. Não há autenticação, pagamentos, entrega de produtos ou envio de arquivos. O NetLab não acessa a rede. Dados de finanças, carrinho e documentos ficam no `localStorage` deste navegador e podem ser restaurados pelos controles de cada página.

## Desenvolvimento

Requer Node.js 22 ou posterior.

```sh
npm ci
npm run dev
```

O servidor local abre em `http://127.0.0.1:8788`. É possível servir os arquivos diretamente com qualquer servidor HTTP estático.

## Testes

```sh
npx playwright install chromium
npm test
npm run build
```

No Windows local, os testes utilizam o Chrome instalado; no CI, o Chromium do Playwright. Os testes cobrem os quatro fluxos de demonstração, persistência, valores financeiros, descontos, layout em 1440/768/390/320 px, console e análise de HTML/CSS.

## Publicação na Cloudflare Pages

O build `npm run build` produz a pasta `dist/`. Ela contém somente o site público, sem dependências, testes ou credenciais. Pode ser publicada por Direct Upload ou Wrangler. Não há servidor de aplicação e nenhuma variável secreta é necessária.

O cabeçalho `Cache-Control: public, max-age=0, must-revalidate, no-transform` preserva o HTML original e impede a injeção automática do beacon de estatísticas pelo proxy Cloudflare. A política de segurança permite scripts apenas do próprio site.

Para integração Git, use o comando de build `npm run build` e a pasta de saída `dist`. Projetos de Direct Upload têm um modelo de integração separado; consulte a documentação da Cloudflare antes de mudar de estratégia.

O domínio planejado é `kodexis.com.br`. A conexão do domínio requer controle do DNS. Preserve registros de e-mail e verificação ao alterar os apontamentos.

## Estrutura

```text
assets/       estilos, módulos JavaScript e logo
demos/        páginas das quatro demonstrações
scripts/      servidor local e build estático
tests/        verificações funcionais e estáticas
_headers      cabeçalhos de segurança para Cloudflare Pages
```

A logo original foi fornecida pelo proprietário. O código e a identidade visual são da Kodexis; nenhuma licença de redistribuição foi concedida neste repositório.
