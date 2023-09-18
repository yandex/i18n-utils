import {test} from "uvu";
import {run} from "./run";

test('block-and-inline', async () => {
  await run(`.class {
    inset-block-start: 12px;
    inset-inline-end: 12px;
    margin-inline: 50px;
}`, `.class {
    margin-inline-start: 50px;
    margin-inline-end: 50px;
}
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
        right: auto;
        left: 12px;
    }
}`);
});

test('different-supports-tags', async () => {
  await run(`.class {
    float: inline-start;
    inset-block-start: 12px;
    inset-block-end: 12px;
}`, `@supports (inset-block-start: 12px) {
    .class {
        inset-block-start: 12px;
        inset-block-end: 12px;
    }
}
@supports not (inset-block-start: 12px) {
    .class {
        top: 12px;
        bottom: 12px;
    }
}
@supports (float: inline-start) {
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

test('double-block-double-inline', async () => {
  await run(`.class {
    inset-inline-start: 20px;
    inset-inline-end: 10px;
    inset-block-start: 30px;
    inset-block-end: 40px;
}`, `@supports (inset-inline-start: 20px) {
    .class {
        inset-inline-start: 20px;
        inset-inline-end: 10px;
        inset-block-start: 30px;
        inset-block-end: 40px;
    }
}
@supports not (inset-inline-start: 20px) {
    .class {
        left: 20px;
        right: 10px;
        top: 30px;
        bottom: 40px;
    }
    [dir="rtl"] .class {
        left: 10px;
        right: 20px;
    }
}`);
});

test('double-block', async () => {
  await run(`.class {
    inset-block-start: 12px;
    inset-block-end: 12px;
}`, `@supports (inset-block-start: 12px) {
    .class {
        inset-block-start: 12px;
        inset-block-end: 12px;
    }
}
@supports not (inset-block-start: 12px) {
    .class {
        top: 12px;
        bottom: 12px;
    }
}`);
});

test('double-inline', async () => {
  await run(`.class {
    inset-inline-start: 20px;
    inset-inline-end: 10px;
}`, `@supports (inset-inline-start: 20px) {
    .class {
        inset-inline-start: 20px;
        inset-inline-end: 10px;
    }
}
@supports not (inset-inline-start: 20px) {
    .class {
        left: 20px;
        right: 10px;
    }
    [dir="rtl"] .class {
        left: 10px;
        right: 20px;
    }
}`);
});

test.run();
