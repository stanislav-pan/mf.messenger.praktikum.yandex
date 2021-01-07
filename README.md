## Описание

Веб-приложение для обмена мгновенными сообщениями с акцентом на скорость и безопасность. Это быстрый, простой, безопасный и бесплатный сервис.

Приложение состоит из нескольких страниц:

- `messanger` - страница со списком чатов и лентой переписки;
- `login` - страница авторизации;
- `sign-up` - страница регистрации;
- `404` - страница 404 ошибки;
- `500` - страница 500 ошибки;
- `sign-up-step-two` - второй шаг регистрации;
- `settings` - страница с настройками;

Ссылка на проект в Netlify: [messenger](https://wizardly-shannon-8ef09d.netlify.app).
Ссылка на проект в Heroku: [messenger](https://yandex-practicum-messenger.herokuapp.com).

## Запуск

- `npm run start` — запуск версии для разработчика. Необходимо использовать вместе с командой `npm run serve`.
- `npm run build` — сборка стабильной версии (используется для сборки в Netlify).
- `npm run build:ios` — сборка стабильной версии. Данная команда должна использоваться на iOS устройствах.
- `npm run serve` — запускает скрипт для отслеживания изменений в файлах.
- `npm run test:watch` — запускает тесты. В проект также был добавлен конфиг для дебаггинга тестов. Для запуска тестов в режиме дебаггинга необходимо использовать VSCode и нажать на F5.

## Деплой на Netlify

- `netlify build`
- `netlify deploy --prod`

## Деплой на Heroku

- `docker build -t web .`
- `heroku container:push web -a yandex-practicum-messenger`
- `heroku container:release web -a yandex-practicum-messenger`

## Макет

Макет можно найти по данной ссылке: [макет](https://www.figma.com/file/W1kZPRNbkrFP4llzkjrc8O/Yandex-Messanger?node-id=0%3A1)
