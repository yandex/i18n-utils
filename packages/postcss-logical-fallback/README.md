# postcss-logical-fallback

This is [postcss](https://github.com/postcss/postcss) plugin for logical css props support in legacy browsers. Main idea of the plugin is
an opportunity to write logical styles like in modern browsers in legacy browsers. When all of your
supported browsers will support all modern logical spec you can just delete this plugin and don't rewrite
your styles. Second idea of the plugin is to use logical props where they supported and do fallback only in
non-supported browsers.


**We highly recommend to use it with
[stylelint plugin](https://github.com/yandex/i18n-utils/packages/stylelint-use-logical-spec)**

Main purpose of this plugin is creating fallbacks for bad supported logical props in legacy browsers.
We have distinguished:
- Absolute positioning props like
`inset-inline-start`, `inset-inline-end`,`inset-block-start`
and `inset-block-end` due to bad support in safari (14.1+ on desktop, 14.5+ on mobile),
chrome (87+) and firefox (66+) and due to high prevalence of these props.

- Shorthand props like `inset-inline`, `inset-block`, `margin-inline`, `margin-block`,
`padding-inline`, `padding-block` due to same bad support in browsers

Full logical props support you can see [here](https://caniuse.com/css-logical-props)

We recommend to use this plugin with [autoprefixer](https://github.com/postcss/autoprefixer)
and setup our plugin before autoprefixer

**WARNING**
Plugin is based on @supports at rule, so it has to be supported, see on [can i use](https://caniuse.com/css-featurequeries)

## Usage

**Step 1:** install plugin and postcss

```sh
npm install --save-dev postcss postcss-logical-fallback
```

**Step 2:** Find config at the root of your project: `postcss.config.js`,
`"postcss"` section in `package.json`
or `postcss` section in your build config.

If you haven't already use postcss you should setup it according to
[official documentation](https://github.com/postcss/postcss#usage) and add postcss-logical-fallback
after it.

**Step 3:** Add plugin to the plugin list

```diff
module.exports = {
  plugins: [
+   require('postcss-logical-fallback'),
    require('autoprefixer')
  ]
}
```

## Examples
### Fallback for absolute positioning props

Before

```css
.class {
  inset-block-start: 12px;
  inset-inline-end: 12px;
}
```

After

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

### Fallback for shorthands

Before

```css
.class {
  margin-inline: 12px;
  padding-block: 24px 36px;
}
```

After

```css
.class {
  margin-inline-start: 12px;
  margin-inline-end: 12px;

  padding-block-start: 24px;
  padding-block-end: 36px;
}
```

### Fallback for inset shorthands

Before

```css
.class {
  inset-inline: 12px;
}

.multiple-props {
  inset-inline: 24px 36px;
}
```

After

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

