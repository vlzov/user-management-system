# 🚀 User Management System

Production-ready пример корпоративного веб-приложения, построенного по принципам чистой архитектуры и enterprise-разработки.

Проект демонстрирует:

- Модульную структуру
- App Factory pattern
- Service Layer
- Централизованную обработку ошибок
- Стандартизированный REST API
- Разделение frontend / backend
- Чистый vanilla JavaScript + Bootstrap
- Production-ориентированный подход

---

# 📌 О проекте

**User Management System** — это полнофункциональная система управления пользователями (User Management System), реализованная с соблюдением принципов:

- Separation of Concerns  
- DRY  
- KISS  
- Clean Architecture  
- RESTful API Design  

Проект предназначен как:

- Демонстрация архитектурного подхода
- Шаблон для корпоративных Flask-проектов
- Портфолио-пример backend-разработчика
- База для масштабируемого SaaS

---

# 🏗 Архитектура

## Backend (Flask)

```
Client (Browser)
        │
        ▼
Vanilla JS (Fetch API)
        │
        ▼
Flask Blueprint (Controllers)
        │
        ▼
Service Layer (Business Logic)
        │
        ▼
SQLAlchemy (ORM)
        │
        ▼
SQLite Database
```

### Архитектурные принципы:

- **App Factory Pattern**
- **Blueprint-based modular API**
- **Service Layer abstraction**
- **Centralized error handling**
- **Unified API response format**
- **Config class**
- **Environment variables (.env)**

---

## Frontend

```
index.html
    │
    ▼
main.js (DOM + Events)
    │
    ▼
api.js (HTTP abstraction layer)
    │
    ▼
Backend REST API
```

Принципы:

- Разделение API и UI логики
- Без перезагрузки страницы (SPA-подход)
- Bootstrap 5
- Чистый ES6 modules

---

# 📂 Структура проекта

```
corporate_app/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── utils/
│   │   ├── config.py
│   │   ├── extensions.py
│   │   └── errors.py
│   │
│   ├── run.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── index.html
    └── js/
        ├── api.js
        └── main.js
```

---

# 🔌 API Contract

Все ответы стандартизированы:

```json
{
  "status": "success | error",
  "data": {},
  "message": "optional message"
}
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|------------|
| GET    | /users/ | Get all users |
| GET    | /users/<id> | Get user by ID |
| POST   | /users/ | Create user |
| PUT    | /users/<id> | Update user |
| DELETE | /users/<id> | Delete user |

---

# ⚙️ Запуск проекта

## 🔹 Часть 1 — Backend

### 1. Перейти в backend

```bash
cd user-management-system/backend
```

### 2. Создать виртуальное окружение

```bash
python -m venv venv
```

### 3. Активировать окружение

Linux / macOS:
```bash
source venv/bin/activate
```

Windows:
```bash
venv\Scripts\activate
```

### 4. Установить зависимости

```bash
pip install -r requirements.txt
```

### 5. Создать .env

```bash
cp .env.example .env
```

### 6. Запустить сервер

```bash
python run.py
```

Backend будет доступен:

```
http://127.0.0.1:5000
```

---

## 🔹 Часть 2 — Frontend

Перейти в папку frontend:

```bash
cd user-management-system/frontend
```

Запустить встроенный HTTP сервер:

```bash
python -m http.server 5500
```

Открыть в браузере:

```
http://127.0.0.1:5500
```

---

# 🧱 Используемый стек

## Backend

- Python 3.x
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Marshmallow
- SQLite
- Flask-CORS
- python-dotenv

## Frontend

- HTML5
- Bootstrap 5
- Vanilla JavaScript (ES6 modules)
- Fetch API

---

# 🚀 Production-ориентированная инфраструктура

Проект легко масштабируется:

### Gunicorn

```bash
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

### Nginx

- Reverse Proxy
- SSL termination
- Static serving

### Docker (рекомендуется)

- backend container
- database container
- nginx container

### Миграции

```bash
flask db init
flask db migrate -m "init"
flask db upgrade
```

---

# 📈 Возможности для расширения

- JWT Authentication
- RBAC
- Pagination
- Search & filtering
- Logging (structlog)
- Pytest + coverage
- CI/CD (GitHub Actions)
- PostgreSQL вместо SQLite
- Docker Compose

---

# 💼 Почему этот проект полезен работодателю

Проект демонстрирует:

- Понимание архитектурных паттернов
- Работа с REST API
- ORM и валидация данных
- Чистую организацию кода
- Разделение ответственности
- Готовность к production-деплою
- Навыки frontend + backend интеграции

Это не просто CRUD — это архитектурный фундамент для enterprise-системы.

---

# 📜 License

MIT

---

# 👨‍💻 Author

@vlzov
Open to scalable architecture challenges 🚀
