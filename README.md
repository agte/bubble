# Сортировка пузырьком

Сделана с использованием CustomElements, без фреймворков или библиотек.

## Запуск

### При помощи node

```bash
$ npm start
```

Затем открываем в браузере http://localhost:3000/.

Если нужен другой порт, например 5005, вызываем так:

```bash
$ npm start -- -p 5005
```

Или используем переменные окружения:

```bash
$ export PORT=5005
$ npm start
```

Затем открываем в браузере http://localhost:5005/.

### При помощи docker

```bash
$ docker-compose up
```

Затем открываем в браузере http://localhost:3000/.

Если нужен другой порт, например 5005, используем переменные окружения:

```bash
$ export PORT=5005
$ docker-compose up
```

### Готовая площадка

[https://bubble-sorting.herokuapp.com/](https://bubble-sorting.herokuapp.com/)