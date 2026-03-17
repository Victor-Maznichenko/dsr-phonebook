
# 📒DSR Phonebook

**Корпоративная телефонная книга**

[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB.svg?logo=react)](https://react.dev)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E.svg?logo=nestjs)](https://nestjs.com)
[![Turborepo](https://img.shields.io/badge/build-turborepo-EF4444.svg?logo=turbo)](https://turbo.build)
[![Bun](https://img.shields.io/badge/runtime-bun-000000.svg?logo=bun)](https://bun.sh)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🔎 Демо
Демо: [dsr-phonebook.netlify.app](https://dsr-phonebook.netlify.app/)  

**Аккаунты для демонстрации:**

1. **Админ**
    - email: `admin@mail.ru`
    - password: `Password!23`
        
2. **Пользователь**
    - email: `user@mail.ru`
    - password: `Password!23`

> Примечание: эти учётные записи доступны на демо-сборке. <br>При проблемах с доступом проверьте состояние сервиса или следуйте инструкции по локальному запуску ниже.

<br>

---
## Технические требования

- Node.js v22.17.0
- bun

---
<br>

## Быстрый старт

### 👷1. Локальный запуск
```bash
# Клонировать репозиторий  
git clone https://github.com/Victor-Maznichenko/dsr-phonebook.git  
cd dsr-phonebook  
  
# Установить зависимости  
bun install  
  
# Запустить dev-сервер  
bun run dev
```

Перед запуском:
- разверните `PostgreSQL`
- заполните `.env` для frontend и backend (примеры уже есть в проекте)

---

### 🐳 2. Через Docker

```bash
# Клонировать репозиторий  
git clone https://github.com/Victor-Maznichenko/dsr-phonebook.git  
cd dsr-phonebook  
  
# Запуск  
docker compose up --build
```

Приложение будет доступно:
- 🌐 **Frontend**: http://localhost:5173
- 🔌 **Backend API**: http://localhost:7000
- 📖 **Swagger**: http://localhost:7000/api
- 🗄️ **pgAdmin**: http://localhost:5050


---
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


---
<br>

# 🏗️ Архитектура
Проект построен по принципу **монорепозитория** с использованием [Turborepo](https://turbo.build):
```
dsr-phonebook/
├── apps/
│   ├── frontend/   
│   └── backend/     
├── docker-compose.yml
└── package.json
```

---

## Frontend

**Библиотеки:**
- `React 19` + `TypeScript` — современные возможности React
- `Effector` — state management
- `Atomic Router` — маршрутизация
- `React Hook Form` + `Zod` — работа с формами и валидация
- `Storybook` — документация компонентов

**Архитектура FSD (Feature-Sliced Design):**

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
│   │   # UI-компоненты
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
│   │   ├── textarea/
│   │   ├── tooltip/
│   │   └── typography/
└── main.tsx
```

---

## Backend

**Библиотеки:**
- `NestJS` — масштабируемый `Node.js` фреймворк
- `PostgreSQL` + `Sequelize` — база данных и ORM
- `JWT` — аутентификация
- `Swagger` — API документация
- `class-validator` — валидация данных


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


---

## 📄 Лицензия
MIT License

---

<div align="center">

**Создано с ❤️ для удобного управления корпоративными контактами**

</div>
