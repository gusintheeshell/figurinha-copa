# Figurinhas Copa

PWA mobile-first para controlar o álbum de figurinhas da Copa do Mundo 2026. Marque coletadas, faltantes e repetidas por seleção, com progresso salvo automaticamente no dispositivo.

## Funcionalidades

- **Álbum completo** — FWC, Coca-Cola e 48 seleções (grupos A–L), com nomenclatura oficial (`FWC1`, `BRA7`, etc.)
- **Progresso global e por time** — percentual, coletadas, faltantes e repetidas
- **Filtros** — todas, faltando ou repetidas
- **Interações touch** — toque para marcar/desmarcar; pressione e segure para editar quantidade
- **PWA instalável** — funciona offline, splash screen e ícones para iOS/Android
- **Multi-idioma** — português, inglês e espanhol
- **SEO** — meta tags, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml`

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS (tema Gruvbox)
- Zustand (persistência em `localStorage`)
- vite-plugin-pwa

## Pré-requisitos

- Node.js 20+
- npm

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173).

## Scripts

| Comando                   | Descrição                                       |
| ------------------------- | ----------------------------------------------- |
| `npm run dev`             | Servidor de desenvolvimento                     |
| `npm run build`           | Build de produção                               |
| `npm run preview`         | Preview do build local                          |
| `npm run lint`            | ESLint                                          |
| `npm run generate:splash` | Regenera splash screens iOS em `public/splash/` |

## Build para GitHub Pages

Em repositórios de projeto (`usuario/figurinha-copa`), defina o base path:

```bash
VITE_BASE_PATH=/figurinha-copa/ \
VITE_SITE_URL=https://usuario.github.io/figurinha-copa \
npm run build
```

Para site pessoal (`usuario.github.io`):

```bash
VITE_BASE_PATH=/ \
VITE_SITE_URL=https://usuario.github.io \
npm run build
```

## Deploy (GitHub Pages)

O GitHub Pages no plano gratuito exige repositório **público**. Ao criar o repo no GitHub, escolha **Public** — ou altere depois em **Settings → General → Danger Zone → Change repository visibility**.

1. Crie um repositório **público** e envie o código para a branch `main`
2. Em **Settings → Pages**, selecione **GitHub Actions** como source
3. O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica automaticamente a cada push

URL esperada: `https://<usuario>.github.io/<repositorio>/`

> Contas pagas do GitHub permitem Pages em repositórios privados; no plano free, o repositório precisa ser público.

## Instalar no celular

1. Abra o app no **Safari** (iOS) ou **Chrome** (Android)
2. **iOS:** Compartilhar → Adicionar à Tela de Início
3. **Android:** Menu → Instalar app / Adicionar à tela inicial

> A splash nativa e o service worker funcionam melhor quando o app é aberto pelo ícone instalado, não pela aba do navegador.

## Estrutura do projeto

Organizado no padrão [bulletproof-react](https://github.com/alan2207/bulletproof-react) por feature:

```
src/
  app/                    # App shell e providers
  components/Elements/    # UI reutilizável (Button, Accordion, Toggle…)
  features/stickers/      # Domínio: store, hooks, componentes, dados
  lib/i18n/               # Traduções PT/EN/ES
  lib/seo/                # Meta tags e structured data
  stores/                 # Stores globais (locale)
public/                   # Ícones, splash screens, assets estáticos
```

## Persistência

O progresso é salvo em `localStorage` com a chave `figurinhas-copa-v1`. O idioma escolhido fica em `figurinhas-copa-locale-v1`. Os dados ficam apenas no navegador/dispositivo de cada usuário — nada é enviado a um servidor.

## Licença

Repositório público. O código-fonte fica aberto para uso e contribuição no GitHub.
