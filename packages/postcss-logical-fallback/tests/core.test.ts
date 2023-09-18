import {test} from "uvu";
import {run} from "./run";

test('border-end-end-radius', async () => {
  await run(`.class {
    border-end-end-radius: 5px;
}`, `@supports (border-end-end-radius: 5px) {
    .class {
        border-end-end-radius: 5px;
    }
}
@supports not (border-end-end-radius: 5px) {
    .class {
        border-bottom-right-radius: 5px;
    }
    [dir="rtl"] .class {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 5px;
    }
}`);
});

test('border-end-start-radius', async () => {
  await run(`.class {
    border-end-start-radius: 5px;
}`, `@supports (border-end-start-radius: 5px) {
    .class {
        border-end-start-radius: 5px;
    }
}
@supports not (border-end-start-radius: 5px) {
    .class {
        border-bottom-left-radius: 5px;
    }
    [dir="rtl"] .class {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 5px;
    }
}`);
});

test('border-start-end-radius', async () => {
  await run(`.class {
    border-start-end-radius: 5px;
}`, `@supports (border-start-end-radius: 5px) {
    .class {
        border-start-end-radius: 5px;
    }
}
@supports not (border-start-end-radius: 5px) {
    .class {
        border-top-right-radius: 5px;
    }
    [dir="rtl"] .class {
        border-top-right-radius: 0;
        border-top-left-radius: 5px;
    }
}`);
});

test('border-start-start-radius', async () => {
  await run(`.class {
    border-start-start-radius: 5px;
}`, `@supports (border-start-start-radius: 5px) {
    .class {
        border-start-start-radius: 5px;
    }
}
@supports not (border-start-start-radius: 5px) {
    .class {
        border-top-left-radius: 5px;
    }
    [dir="rtl"] .class {
        border-top-left-radius: 0;
        border-top-right-radius: 5px;
    }
}`);
});

test('clear-inline-end', async () => {
  await run(`.class {
    clear: inline-end;
}`, `@supports (clear: inline-end) {
    .class {
        clear: inline-end;
    }
}
@supports not (clear: inline-end) {
    .class {
        clear: right;
    }
    [dir="rtl"] .class {
        clear: left;
    }
}`);
});

test('clear-inline-start', async () => {
  await run(`.class {
    clear: inline-start;
}`, `@supports (clear: inline-start) {
    .class {
        clear: inline-start;
    }
}
@supports not (clear: inline-start) {
    .class {
        clear: left;
    }
    [dir="rtl"] .class {
        clear: right;
    }
}`);
});

test('float-inline-end', async () => {
  await run(`.class {
    float: inline-end;
}`, `@supports (float: inline-end) {
    .class {
        float: inline-end;
    }
}
@supports not (float: inline-end) {
    .class {
        float: right;
    }
    [dir="rtl"] .class {
        float: left;
    }
}`);
});

test('float-inline-start', async () => {
  await run(`.class {
    float: inline-start;
}`, `@supports (float: inline-start) {
    .class {
        float: inline-start;
    }
}
@supports not (float: inline-start) {
    .class {
        float: left;
    }
    [dir="rtl"] .class {
        float: right;
    }
}`);
});

test('inset-block-end', async () => {
  await run(`.class {
    inset-block-end: 12px;
}`, `@supports (inset-block-end: 12px) {
    .class {
        inset-block-end: 12px;
    }
}
@supports not (inset-block-end: 12px) {
    .class {
        bottom: 12px;
    }
}`);
});

test('inset-block-start', async () => {
  await run(`.class {
    inset-block-start: 12px;
}`, `@supports (inset-block-start: 12px) {
    .class {
        inset-block-start: 12px;
    }
}
@supports not (inset-block-start: 12px) {
    .class {
        top: 12px;
    }
}`);
});

test('inset-block', async () => {
  await run(`.class {
    inset-block: 12px;
}

.multiple-props {
    inset-block: 24px 36px;
}`, `@supports (inset-block: 12px) {
    .class {
        inset-block: 12px;
    }
    .multiple-props {
        inset-block: 24px 36px;
    }
}
@supports not (inset-block: 12px) {
    .class {
        top: 12px;
        bottom: 12px;
    }
    .multiple-props {
        top: 24px;
        bottom: 36px;
    }
}`);
});

test('inset-inline-end', async () => {
  await run(`.class {
    inset-inline-end: 12px;
}`, `@supports (inset-inline-end: 12px) {
    .class {
        inset-inline-end: 12px;
    }
}
@supports not (inset-inline-end: 12px) {
    .class {
        right: 12px;
    }
    [dir="rtl"] .class {
        right: auto;
        left: 12px;
    }
}`);
});

test('inset-inline-start', async () => {
  await run(`.class {
    inset-inline-start: 12px;
}`, `@supports (inset-inline-start: 12px) {
    .class {
        inset-inline-start: 12px;
    }
}
@supports not (inset-inline-start: 12px) {
    .class {
        left: 12px;
    }
    [dir="rtl"] .class {
        left: auto;
        right: 12px;
    }
}`);
});

test('inset-inline', async () => {
  await run(`.class {
    inset-inline: 12px;
}

.multiple-props {
    inset-inline: 24px 36px;
}`, `@supports (inset-inline: 12px) {
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
        right: 24px;
        left: 36px;
    }
}`);
});

test('margin-block', async () => {
  await run(`.class {
    margin-block: 12px;
}

.multiple-props {
    margin-block: 24px 36px;
}`, `.class {
    margin-block-start: 12px;
    margin-block-end: 12px;
}

.multiple-props {
    margin-block-start: 24px;
    margin-block-end: 36px;
}`);
});

test('margin-inline', async () => {
  await run(`.class {
    margin-inline: 12px;
}

.multiple-props {
    margin-inline: 24px 36px;
}`, `.class {
    margin-inline-start: 12px;
    margin-inline-end: 12px;
}

.multiple-props {
    margin-inline-start: 24px;
    margin-inline-end: 36px;
}`);
});

test('padding-block', async () => {
  await run(`.class {
    padding-block: 12px;
}

.multiple-props {
    padding-block: 24px 36px;
}`, `.class {
    padding-block-start: 12px;
    padding-block-end: 12px;
}

.multiple-props {
    padding-block-start: 24px;
    padding-block-end: 36px;
}`);
});

test('padding-inline', async () => {
  await run(`.class {
    padding-inline: 12px;
}

.multiple-props {
    padding-inline: 24px 36px;
}`, `.class {
    padding-inline-start: 12px;
    padding-inline-end: 12px;
}

.multiple-props {
    padding-inline-start: 24px;
    padding-inline-end: 36px;
}`);
});

test.run();
