# Miraplay Backend

## Опис проекту

Miraplay Backend - це серверна частина веб-додатку для управління іграми з функціоналом реального часу. Проект побудований на Node.js з використанням Express та MongoDB.

## Основні функції

### 1. Управління іграми

- Додавання нових ігор
- Редагування існуючих ігор
- Видалення ігор
- Отримання списку ігор з пагінацією
- Фільтрація ігор за жанром
- Пошук ігор за назвою

### 2. Інтеграція з API

- Отримання даних про ігри з зовнішнього API
- Об'єднання даних з локальної бази даних та API
- Обробка помилок при недоступності API

### 3. WebSocket функціонал

- Реальний час для оновлень списку ігор
- Сповіщення про нові ігри
- Сповіщення про популярні ігри (топ)
- Управління онлайн користувачами

### 4. Безпека

- Аутентифікація користувачів
- Авторизація доступу
- Захист API endpoints

## Технічний стек

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT для аутентифікації

### API Endpoints

- `GET /api/games` - отримання списку ігор
- `POST /api/games` - додавання нової гри
- `PUT /api/games/:id` - оновлення гри
- `DELETE /api/games/:id` - видалення гри
- `GET /api/games/:id` - отримання деталей гри

### WebSocket події

- `newGame` - сповіщення про нову гру
- `popularGame` - сповіщення про популярну гру
- `topGameChange` - зміна статусу гри в топі
- `onlineUsers` - оновлення списку онлайн користувачів

## Структура проекту

```
src/
├── controllers/     # Контролери для обробки запитів
├── models/         # Mongoose моделі
├── routers/        # Маршрути API
├── services/       # Бізнес-логіка
├── middlewares/    # Проміжні обробники
├── validation/     # Валідація даних
├── utils/          # Допоміжні функції
├── db/             # Налаштування бази даних
└── socket.js       # WebSocket конфігурація
```

## Встановлення та запуск

1. Клонуйте репозиторій:

```bash
git clone [url-репозиторію]
```

2. Встановіть залежності:

```bash
npm install
```

3. Створіть файл .env з необхідними змінними:

```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Запустіть сервер:

```bash
npm run dev
```

## Особливості реалізації

### Реальний час

- Використання Socket.IO для WebSocket з'єднань
- Автоматичне оновлення списку ігор
- Сповіщення про важливі події

### Пагінація та фільтрація

- Підтримка сторінкового виводу
- Фільтрація за жанром
- Пошук за назвою
- Об'єднання даних з різних джерел

### Обробка помилок

- Централізована обробка помилок
- Валідація вхідних даних
- Логування помилок

## Розробка

Проект використовує сучасні практики розробки:

- Модульна архітектура
- Чисті функції
- Обробка помилок
- Логування
- Валідація даних

## Ліцензія

MIT

# Miraplay Frontend

## Опис проекту

Miraplay Frontend - це клієнтська частина веб-додатку для управління іграми з функціоналом реального часу. Проект побудований на React з використанням Redux для управління станом та Socket.IO для роботи з WebSocket.

## Основні функції

### 1. Аутентифікація та Авторизація

- Реєстрація користувачів
- Вхід в систему
- Вихід з системи
- Захищені роути
- Збереження сесії
- Модальні вікна для авторизації

### 2. Управління іграми

- Відображення списку ігор
- Додавання нових ігор (для адміністраторів)
- Редагування існуючих ігор
- Видалення ігор
- Фільтрація та пошук ігор
- Пагінація списку ігор

### 3. Адміністративна панель

- Захищений доступ для адміністраторів
- Управління іграми
- Перегляд статистики
- Модерація контенту

### 4. WebSocket функціонал

- Оновлення списку ігор в реальному часі
- Сповіщення про нові ігри
- Відображення топових ігор
- Відстеження онлайн користувачів

## Технічний стек

### Frontend

- React
- Redux Toolkit
- React Router
- Socket.IO Client
- CSS Modules
- Vite

### Компоненти

- `Header` - навігаційна панель
- `Authorization` - модальне вікно авторизації
- `GamesList` - список ігор
- `GameCard` - картка гри
- `AdminPanel` - адміністративна панель
- `GameModal` - модальне вікно для додавання/редагування гри

### Стилізація

- CSS Modules для стилів
- Адаптивний дизайн
- Шрифт Neue Machina
- Змінні CSS для кольорів та розмірів
- Анімації та переходи

## Структура проекту

```
src/
├── components/     # React компоненти
│   ├── shared/    # Спільні компоненти
│   ├── games/     # Компоненти для ігор
│   └── admin/     # Компоненти адмін-панелі
├── pages/         # Сторінки додатку
├── redux/         # Redux store та slice
├── api/           # API запити та WebSocket
├── contexts/      # React контексти
├── assets/        # Статичні ресурси
└── styles/        # Глобальні стилі
```

## Встановлення та запуск

1. Клонуйте репозиторій:

```bash
git clone [url-репозиторію]
```

2. Встановіть залежності:

```bash
npm install
```

3. Створіть файл .env з необхідними змінними:

```
VITE_API_URL=https://miraplay-back.onrender.com
VITE_SOCKET_URL=https://miraplay-back.onrender.com
```

4. Запустіть додаток:

```bash
npm run dev
```

## Особливості реалізації

### Реальний час

- Інтеграція з Socket.IO
- Автоматичне оновлення даних
- Сповіщення про події
- Управління підключенням

### Безпека

- JWT аутентифікація
- Захищені роути
- Валідація форм
- Обробка помилок

### UX/UI

- Адаптивний дизайн
- Анімації та переходи
- Модальні вікна
- Сповіщення
- Індикатори завантаження

## Розробка

Проект використовує сучасні практики розробки:

- Компонентний підхід
- Хуки React
- Redux для управління станом
- CSS Modules для стилів
- Ліниве завантаження компонентів

## Ліцензія

MIT
