import {test} from "uvu";
import {run} from "./run";

test('class-and-html-element', async () => {
  await run(`body {
    inset-inline-start: 12px;
}

.class {
    inset-block-start: 24px;
}`, `@supports (inset-inline-start: 12px) {
    body {
        inset-inline-start: 12px;
    }
    .class {
        inset-block-start: 24px;
    }
}
@supports not (inset-inline-start: 12px) {
    body {
        left: 12px;
    }
    [dir="rtl"] body {
        left: auto;
        right: 12px;
    }
    .class {
        top: 24px;
    }
}`);
});

test('id-and-complicated-selector', async () => {
  await run(`#id {
    inset-inline-start: 12px;
    clear: inline-start;
}

.class > p ~ .test {
    inset-block-end: 36px;
}

.other-class:first-child div {
    inset-block-start: 24px;
    float: inline-end;
}`, `@supports (inset-inline-start: 12px) {
    #id {
        inset-inline-start: 12px;
    }
    .class > p ~ .test {
        inset-block-end: 36px;
    }
    .other-class:first-child div {
        inset-block-start: 24px;
    }
}
@supports not (inset-inline-start: 12px) {
    #id {
        left: 12px;
    }
    [dir="rtl"] #id {
        left: auto;
        right: 12px;
    }
    .class > p ~ .test {
        bottom: 36px;
    }
    .other-class:first-child div {
        top: 24px;
    }
}
@supports (clear: inline-start) {
    #id {
        clear: inline-start;
    }
    .other-class:first-child div {
        float: inline-end;
    }
}
@supports not (clear: inline-start) {
    #id {
        clear: left;
    }
    [dir="rtl"] #id {
        clear: right;
    }
    .other-class:first-child div {
        float: right;
    }
    [dir="rtl"] .other-class:first-child div {
        float: left;
    }
}`);
});

test.run();
