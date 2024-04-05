const config = {
    baseUrl: 'https://norma.nomoreparties.space/api', // базовый путь к серверу
    defaultHeaders: {
      'Content-Type': 'application/json'
    },
    ingredients: '/ingredients', // эндпоинт ингредиентов
    order: '/orders', // эндпоинт номера заказа
    registration: '/auth/register', // эндпоинт регистрации
    authorization: '/auth/login', //эндпоинт авторизации
    logout: '/auth/logout', // эндпоинт выхода из системы
    token: '/auth/token', // эндпоинт обновления токена
    forgot: '/password-reset', // эндпоинт восстановления пароля
    reset: '/password-reset/reset', // эндпоинт создания нового пароля
    user: '/auth/user', // эндпоинт получения и обновления данных пользователя
  }

  export const SCREEN_S = 768;

  export default config