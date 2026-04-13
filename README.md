
# 📒DSR Phonebook 

Техническое задание: <a target="_blank" href="task.pdf">тык</a>

<span><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge"></span>
<span><img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS logo" title="NestJS" style="height: 25px" /></span>
<span><img src="https://img.shields.io/badge/Turbo-EF4444?style=for-the-badge&logo=turbo&logoColor=white" alt="turbo logo" title="turbo" style="height: 25px" /></span>
<span><img src="https://img.shields.io/badge/bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="bun logo" title="turbo" style="height: 25px" /></span>
<span><img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&logo=license-MIT-blue.svg&logoColor=white" alt="bun logo" title="turbo" style="height: 25px" /></span>

## 🔎 Демо
Демо: <a target="_blank" href="https://dsr-phonebook.netlify.app/">dsr-phonebook.netlify.app</a><br>
Storybook: <a target="_blank" href="https://dsr-phonebook-storybook.netlify.app/">https://dsr-phonebook-storybook.netlify.app/</a><br>
Swagger: <a target="_blank" href="https://backend-production-b18b.up.railway.app/api/docs">https://backend-production-b18b.up.railway.app/api/docs</a>

**Аккаунты для демонстрации:**
> Доступны на деплое по ссылке выше. 

1. **Админ**
    - email: `admin@mail.ru`
    - password: `Password!23`
        
2. **Пользователь**
    - email: `user@mail.ru`
    - password: `Password!23`


<br>

## Быстрый старт

### Технические требования

- Node.js v22.17.0
- bun

### 👷1. Локальный запуск
```bash
git clone https://github.com/Victor-Maznichenko/dsr-phonebook.git  
cd dsr-phonebook  
bun install  
bun run dev
```

Перед запуском:
- разверните `PostgreSQL`
- заполните `.env` для frontend и backend (cм. .env.example)

---

### 🐳 2. Через Docker

```bash
git clone https://github.com/Victor-Maznichenko/dsr-phonebook.git  
cd dsr-phonebook  
docker compose up --build
```

Приложение будет доступно:
- **Frontend**: http://localhost:5173/
- **Backend API**: http://localhost:7000/api/
- **Swagger**: http://localhost:7000/api/docs/
- **pgAdmin**: http://localhost:5050/        


<br>

## 📜 Доступные скрипты

### Корневой уровень

| Скрипт | Описание |
|--------|----------|
| `bun run dev` | Запуск frontend и backend в режиме разработки |
| `bun run build` | Сборка production-версии |
| `bun run lint` | Проверка кода линтером |
| `bun run lint:fix` | Автоматическое исправление ошибок линтера |

### Frontend (`apps/frontend`)

| Скрипт | Описание |
|--------|----------|
| `bun run dev` | Запуск dev-сервера Vite |
| `bun run build` | Сборка production-версии |
| `bun run preview` | Превью production-сборки |
| `bun run storybook` | Запуск Storybook (порт 6006) |
| `bun run build-storybook` | Сборка Storybook |

### Backend (`apps/backend`)

| Скрипт | Описание |
|--------|----------|
| `bun run dev` | Запуск в режиме разработки с watch |
| `bun run start` | Запуск production-версии |
| `bun run seed` | Заполнение БД тестовыми данными |
| `bun run lint` | Проверка кода линтером |


<br>

# 🏗️ Архитектура
Проект является монорепозиторием:
```
dsr-phonebook/
├── apps/
│   ├── frontend/   
│   └── backend/     
├── docker-compose.yml
└── package.json
```


## Frontend

**Основные библиотеки:**
- `React 19` + `TypeScript` 
- `Effector` — State management
- `Atomic Router` — Маршрутизация
- `React Hook Form` + `Zod` — Работа с формами и валидация
- `Storybook` — Документация ui-kit-а

**Архитектура фронтенда:**

```
# Типы предопределенные во всем приложении
@types
├── api.d.ts                  
└── utils.d.ts             

# Основная кодовая база
src/
│   # Инициализация приложения
├── app/                     
│
│   # Страницы
├── pages/                   
│   ├── home/
│   ├── login/
│   ├── register/
│   ├── requests/
│   └── user/
│
│   # Самостоятельные блоки
├── widgets/                 
│   ├── footer/
│   ├── header/
│   ├── page-spinner/
│   └── user-card/
│
│   # Функциональные модули
├── features/                
│   └── theme-switcher
│
│   # Переиспользуемые компоненты и утилиты
├── shared/                  
│   ├── api/                 
│   ├── config/
│   ├── lib/
│   ├── session/
│   ├── styles/
│   │
│   │   # UI-компоненты (без бизнес логики)
│   ├── ui/                  
│   │   ├── action-button/
│   │   ├── avatar/
│   │   ├── button/
│   │   ├── condition/
│   │   ├── icons/
│   │   ├── input-text/
│   │   ├── menu/
│   │   ├── modal/
│   │   ├── select/
│   │   ├── skeletons/
│   │   ├── spinner/
│   │   ├── table/
│   │   ├── toast/
│   │   ├── textarea/
│   │   ├── tooltip/
│   │   └── typography/
└── main.tsx
```


## Backend

**Основные библиотеки:**
- `NestJS` — `Node.js` фреймворк
- `PostgreSQL` + `Sequelize` — БД и ORM
- `JWT` — Аутентификация
- `Swagger` — API документация
- `class-validator` — Валидация данных


**Архитектура бэкенда:**
```
# Типы предопределенные во всем приложении
@types
├── api.d.ts                  
└── utils.d.ts             

# Основная кодовая база
src/
├── modules/
│   ├── access-requests/
│   ├── auth/
│   ├── files/
│   ├── users/
│   └── index.ts
├── shared/
│   └── utils/
├── constants.ts
├── app.module.ts
├── main.ts
└── seed.command.ts
```
