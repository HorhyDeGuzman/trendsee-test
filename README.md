# Trendsee

Сервис ленты публикаций с кэшированием и авторизацией через JWT.

## Стек технологий

| Слой | Технологии |
|------|-----------|
| **Backend** | Python 3.12, FastAPI, asyncpg, PyJWT |
| **Frontend** | Vue 3, TypeScript, Pinia, Vue Router, Vite |
| **База данных** | PostgreSQL 16 |
| **Кэш** | Redis 7 |
| **Инфраструктура** | Docker, Docker Compose |

## Структура проекта

```
trendsee/
├── backend/
│   ├── app/
│   │   ├── main.py              # Точка входа, lifespan, CORS
│   │   ├── config.py            # Настройки через env-переменные
│   │   ├── database.py          # Async пул соединений PostgreSQL
│   │   ├── redis_client.py      # Async Redis клиент
│   │   ├── auth.py              # JWT: создание и верификация токенов
│   │   ├── dependencies.py      # DI: get_db, get_redis, get_current_user
│   │   ├── schemas.py           # Pydantic-схемы валидации
│   │   └── routes/
│   │       ├── users.py         # CRUD пользователей
│   │       └── posts.py         # CRUD публикаций + кэширование
│   ├── init.sql                 # SQL: таблицы и индексы
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── core/                # Router, API-клиент
│   │   ├── common/              # UI-компоненты, стили, composables
│   │   ├── modules/             # Модули: auth, feed, home, video-screen, analysis
│   │   ├── pages/               # Страницы приложения
│   │   └── layouts/             # Header, Sidebar
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── trendsee.postman_collection.json
└── README.md
```

## Запуск

### Backend (Docker)

```bash
docker-compose up --build
```

Поднимаются 3 сервиса: PostgreSQL, Redis, Backend. Таблицы создаются автоматически из `init.sql`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Доступ

| Сервис | URL |
|--------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/docs |
| ReDoc | http://localhost:8000/redoc |

## API

### Пользователи

| Метод | Эндпоинт | Описание | Авторизация |
|-------|----------|----------|-------------|
| `POST` | `/api/users` | Создать пользователя (возвращает JWT) | -- |
| `GET` | `/api/users/{id}/token` | Получить токен по id | -- |
| `PATCH` | `/api/users/{id}` | Изменить имя | Bearer |
| `DELETE` | `/api/users/{id}` | Удалить пользователя | Bearer |

### Публикации

| Метод | Эндпоинт | Описание | Авторизация |
|-------|----------|----------|-------------|
| `POST` | `/api/posts` | Создать публикацию | Bearer |
| `GET` | `/api/posts/user/{id}` | Публикации пользователя | -- |
| `PATCH` | `/api/posts/{id}` | Изменить публикацию | Bearer |
| `DELETE` | `/api/posts/{id}` | Удалить публикацию | Bearer |

### Health Check

```
GET /health -> { "status": "ok" }
```

## Авторизация (JWT)

Токен возвращается при создании пользователя или через `GET /api/users/{id}/token`.

Для защищённых запросов:
```
Authorization: Bearer <token>
```

## Кэширование

- Публикации кэшируются в Redis на **10 минут** (TTL 600 сек)
- При cache hit — ответ мгновенный, `source: "redis"`
- При cache miss — запрос в PostgreSQL с задержкой **2 сек** (симуляция нагрузки), `source: "postgres"`
- Кэш инвалидируется при создании, изменении или удалении публикации

## Frontend

- **Лента публикаций** — список постов с бэкенда (заголовок, текст, дата)
- **Модальное окно** — полная информация о посте, Vue Transition (fade + slide), закрытие по оверлею/кнопке
- **Infinite scroll** — автозагрузка при 500px до конца, индикатор загрузки, остановка при отсутствии постов
- **Вёрстка по Figma** — 2 страницы (Видео экран, Анализ видео), адаптивность под мобильные
- **Авторизация** — регистрация, вход по ID, управление профилем

## Postman

Коллекция для тестирования: [`trendsee.postman_collection.json`](trendsee.postman_collection.json)

Также доступен интерактивный Swagger UI: http://localhost:8000/docs
