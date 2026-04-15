# sinan-frontend

Frontend inicial do SINAN com Next.js App Router, TypeScript, Tailwind CSS,
shadcn/ui, React Hook Form, Zod, TanStack Query, Axios, Recharts e Lucide React.

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`.

## API Laravel

Por padrao o app usa mocks locais:

```env
NEXT_PUBLIC_USE_MOCKS=true
```

Para consumir a API real:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_USE_MOCKS=false
```

O cliente Axios fica em `src/services/api.ts`. O token e enviado via
`Authorization: Bearer <token>` quando existe sessao salva.

## Tema

As cores do sistema ficam centralizadas em `src/styles/theme.css`.

Use tokens semanticos nos componentes, por exemplo:

- `bg-brand`
- `hover:bg-brand-hover`
- `text-muted-foreground`
- `text-destructive`
- `bg-govbr`
- `from-brand-hero-from`
- `to-brand-hero-to`

Para mudar a identidade visual, altere as variaveis CSS desse arquivo em vez de
usar classes diretas como `blue-600` ou valores hexadecimais nos componentes.

## Rotas iniciais

- `/`
- `/login`
- `/dashboard`
- `/notifications`
- `/notifications/new`
- `/notifications/[id]`
- `/patients`
- `/patients/new`
- `/patients/[id]`
- `/units`
- `/units/new`
- `/units/[id]`
- `/reports`
- `/settings`

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```
