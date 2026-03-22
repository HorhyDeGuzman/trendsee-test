# Trendsee Frontend

Клиентская часть сервиса ленты публикаций.

## Стек

- Vue 3.5 (Composition API, `<script setup>`)
- TypeScript 5.9
- Vite 7
- Pinia 3 (state management)
- Vue Router 5
- @hey-api/openapi-ts (типизированный API-клиент)

## Запуск

```bash
npm install
npm run dev
```

Приложение будет доступно: http://localhost:5173

> Backend должен быть запущен на http://localhost:8000 (см. корневой README)

## Команды

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер с HMR |
| `npm run build` | Type-check + production сборка |
| `npm run preview` | Превью production сборки |
| `npm run type-check` | Проверка типов (vue-tsc) |
| `npm run lint` | ESLint с автофиксом |
| `npm run format` | Prettier форматирование |
| `npm run api:generate` | Перегенерация OpenAPI клиента |

## Архитектура

Модульная архитектура с изоляцией через public API (`index.ts`).

```
src/
├── core/                  # Bootstrap: router, API-клиент
│   ├── api/client.ts
│   └── router/index.ts
├── common/                # Общее между модулями
│   ├── ui/                # UI-примитивы (ModalDialog, ModalPanel, AppLoader)
│   ├── composables/       # Shared composables (useModalOverlay)
│   ├── models/types/      # Общие типы
│   └── styles/            # globals.css, variables.css
├── modules/               # Feature-модули
│   ├── auth/              # Авторизация: store, UserModal
│   ├── feed/              # Лента: store, PostCard, модалки, infinite scroll
│   ├── home/              # Главная: навигационные карточки
│   ├── video-screen/      # Видео экран: VideoCard, BloggerInfo
│   └── analysis/          # Анализ видео: секции, боковая панель
├── pages/                 # Страницы (сборщики модулей)
├── layouts/               # AppHeader, AppSidebar
└── assets/                # Иконки (SVG-компоненты), изображения
```

### Структура модуля

```
src/modules/{name}/
├── index.ts               # Public API (barrel export)
├── components/            # Vue-компоненты
├── composables/           # Composables (use*.ts)
├── store/                 # Pinia store (*.store.ts)
├── modals/                # Модальные окна
├── models/                # Типы
├── helpers/               # Утилиты
└── consts/                # Константы
```

### Правила импортов

- Внешние потребители импортируют только через `@/modules/{name}` (public API)
- Внутри модуля — относительные импорты
- `../` между модулями запрещён — используется `@/` alias
