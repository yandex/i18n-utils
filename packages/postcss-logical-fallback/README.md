# postcss-logical-fallback

[PostCSS] плагин для поддержки логических свойств в старых браузерах

[PostCSS]: https://github.com/postcss/postcss

**Рекомендуется использовать вместе
со [stylelint плагином](https://github.com/yandex/i18n-utils/packages/stylelint-use-logical-properties)**

Цель данного плагина в том, чтобы создавать фолбеки для плохо поддерживаемых логических
свойств.
Мы выделили:
- Cвойства для абсолютного позиционирования
`inset-inline-start`, `inset-inline-end`,`inset-block-start`
и `inset-block-end` из-за плохой поддержки в safari (14.1+ на десктопе, 14.5+ на мобилке),
chrome (87+) и firefox (66+) и большой распространенности данных свойств

- Свойства сокращения `inset-inline`, `inset-block`, `margin-inline`, `margin-block`,
`padding-inline`, `padding-block` из-за той же плохой поддержки в старых браузерах

Подробнее про логические свойства, rtl и зачем нужен этот плагин
можно почитать на [вики](https://wiki.yandex-team.ru/i18n/guide/rtl/)

Данный плагин стоит использовать с [autoprefixer](https://github.com/postcss/autoprefixer)
и ставить по порядку до него

## Примеры
### Фолбек для свойств абсолютного позиционирования
До

```css
.class {
  inset-block-start: 12px;
  inset-inline-end: 12px;
}
```

После

```css
@supports (inset-block-start: 12px) {
  .class {
    inset-block-start: 12px;
    inset-inline-end: 12px;
  }
}

@supports not (inset-block-start: 12px) {
  .class {
    top: 12px;
    right: 12px;
  }

  [dir="rtl"] .class {
    right: 0;
    left: 12px;
  }
}
```

### Фолбек для сокращений
До

```css
.class {
  margin-inline: 12px;
  padding-block: 24px 36px;
}
```

После

```css
.class {
  margin-inline-start: 12px;
  margin-inline-end: 12px;

  padding-block-start: 24px;
  padding-block-end: 36px;
}
```

### Фолбек для сокращений inset

До

```css
.class {
  inset-inline: 12px;
}

.multiple-props {
  inset-inline: 24px 36px;
}
```

После

```css
@supports (inset-inline: 12px) {
    .class {
        inset-inline: 12px;
    }

    .multiple-props {
        inset-inline: 24px 36px;
    }
}

@supports not (inset-inline: 12px) {
    .class {
        left: 12px;
        right: 12px;
    }

    .multiple-props {
        left: 24px;
        right: 36px;
    }

    [dir="rtl"] .multiple-props {
        left: 36px;
        right: 24px;
    }
}

```

Больше примеров можно найти [здесь](https://wiki.yandex-team.ru/i18n/guide/rtl/#primerytransformacijjplagina)

## Использование

**Шаг1:** Установите плагин:

```sh
npm install --save-dev postcss postcss-logical-fallback
```

**Шаг 2:** Найдите конфиг postcss в корне проекта: `postcss.config.js`,
`"postcss"` секцию в `package.json`
иди `postcss` в конфиге вашего сборщика.

Если вы еще не используете postcss, то установите его в соответствии с
[официальной документацией] и добавьте данный плагин после установки

**Шаг 3:** Добавьте плагин в список плагинов

```diff
module.exports = {
  plugins: [
+   require('postcss-logical-fallback'),
    require('autoprefixer')
  ]
}
```

[официальной документацией]: https://github.com/postcss/postcss#usage
