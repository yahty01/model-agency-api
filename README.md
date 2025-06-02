# Структура проекта Модельного агентства

## Общая структура
```
model-agency/
│
├── backend/                  # Backend часть
│   ├── package.json          # Зависимости Node.js
│   ├── server.js             # Входная точка сервера
│   ├── config/               # Конфигурация приложения
│   │   ├── db.js             # Подключение к MongoDB
│   │   ├── cloudinary.js     # Настройка Cloudinary
│   │   └── auth.js           # Авторизация и JWT
│   │
│   ├── routes/               # API маршруты
│   │   ├── models.js         # Маршруты для моделей
│   │   ├── artists.js        # Маршруты для артистов
│   │   ├── news.js           # Маршруты для новостей
│   │   ├── shop.js           # Маршруты для магазина
│   │   └── auth.js           # Маршруты для авторизации
│   │
│   ├── controllers/          # Контроллеры для бизнес-логики
│   │   ├── modelController.js
│   │   ├── artistController.js
│   │   ├── newsController.js
│   │   └── shopController.js
│   │
│   ├── models/               # Схемы MongoDB
│   │   ├── Model.js          # Схема модели
│   │   ├── Artist.js         # Схема артиста
│   │   ├── News.js           # Схема новости
│   │   ├── Product.js        # Схема товара
│   │   └── User.js           # Схема пользователя (админ)
│   │
│   ├── middleware/           # Промежуточное ПО
│   │   ├── auth.js           # Проверка авторизации
│   │   └── upload.js         # Загрузка файлов
│   │
│   └── admin/                # Простая админ-панель (HTML/CSS/JS)
│       ├── index.html        # Главная страница админки
│       ├── js/               # JavaScript для админки
│       └── css/              # Стили для админки
│
├── frontend/                 # Frontend часть (React)
│   ├── package.json          # Зависимости React
│   ├── public/               # Статические файлы
│   └── src/                  # Исходники React приложения
│       ├── App.js            # Корневой компонент
│       ├── index.js          # Входная точка
│       ├── api/              # RTK Query API
│       │   └── api.js        # Настройка API
│       ├── components/       # React компоненты
│       │   ├── Header/
│       │   ├── Footer/
│       │   └── ... 
│       ├── pages/            # Страницы приложения
│       │   ├── Models/
│       │   ├── Artists/
│       │   ├── News/
│       │   ├── Shop/
│       │   └── About/
│       ├── i18n/             # Локализация
│       │   ├── en/           # Английский
│       │   └── ru/           # Русский
│       └── store/            # Redux store
│
└── README.md                 # Документация проекта
```

## База данных (MongoDB)

### Коллекция Model
```javascript
{
  _id: ObjectId,
  name: String,         // Имя модели
  attributes: {
    height: Number,     // Рост
    bust: Number,       // Бюст
    waist: Number,      // Талия
    hips: Number,       // Бедра
    shoeSize: Number,   // Размер обуви
    hairColor: String,  // Цвет волос
    eyeColor: String    // Цвет глаз
  },
  description: {
    ru: String,         // Описание на русском
    en: String          // Описание на английском
  },
  inCity: Boolean,      // Статус: в городе или нет
  photos: [             // Массив фотографий
    {
      url: String,      // URL в Cloudinary
      publicId: String, // Public ID в Cloudinary
      isCover: Boolean  // Фото для обложки
    }
  ],
  videos: [             // Массив видео
    {
      url: String,      // URL в Cloudinary
      publicId: String  // Public ID в Cloudinary
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Коллекция User (Админ)
```javascript
{
  _id: ObjectId,
  username: String,     // Логин
  password: String,     // Хэшированный пароль
  role: String,         // Роль (admin)
  createdAt: Date
}
```

## API Endpoints

### Модели
- `GET /api/models` - Получить все модели
- `GET /api/models/:id` - Получить модель по ID
- `POST /api/models` - Добавить новую модель (только админ)
- `PUT /api/models/:id` - Обновить модель (только админ)
- `DELETE /api/models/:id` - Удалить модель (только админ)
- `PATCH /api/models/:id/status` - Обновить статус модели (в городе/не в городе)
- `POST /api/models/:id/photos` - Добавить фото для модели
- `DELETE /api/models/:id/photos/:photoId` - Удалить фото модели

### Аутентификация
- `POST /api/auth/login` - Логин админа
- `POST /api/auth/logout` - Выход из админки

## Деплой проекта

### Frontend
- Vercel (www.vercel.com)
    - Бесплатный план с возможностью масштабирования
    - Автоматический деплой из GitHub
    - Легкая конфигурация для React приложений

### Backend
- Railway (www.railway.app)
    - Простой деплой Node.js приложений
    - Автоматический SSL
    - Масштабирование по мере роста трафика
    - Цена от $5-10/месяц

### База данных
- MongoDB Atlas
    - Бесплатный план с 512MB хранилища
    - Простая интеграция с Node.js
    - Платные планы от $9/месяц

### Медиафайлы
- Cloudinary
    - Бесплатный план с 25GB хранилища и ежемесячной квотой на трансформации
    - Оптимизация изображений и видео
    - CDN для быстрой доставки контента
    - Платные планы начинаются от $89/месяц