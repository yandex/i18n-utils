import {test} from "uvu";
import {run} from "./run";

test('multiple-non-rtl', async () => {
  await run(`.class {
    inset-block-start: 12px;
}

@media (max-width: 500px) {
    .class {
        inset-block-start: 24px;
        inset-block-end: 36px;
    }
}`, `@supports (inset-block-start: 12px) {
    .class {
        inset-block-start: 12px;
    }
    @media (max-width: 500px) {
        .class {
            inset-block-start: 24px;
            inset-block-end: 36px;
        }
    }
}
@supports not (inset-block-start: 12px) {
    .class {
        top: 12px;
    }
    @media (max-width: 500px) {
        .class {
            top: 24px;
            bottom: 36px;
        }
    }
}`);
});

test('multiple-rtl', async () => {
  await run(`.class {
    inset-inline-start: 12px;
    clear: inline-end;
}

@media (max-width: 500px) {
    .class {
        inset-inline-start: 24px;
        inset-inline-end: 36px;
        clear: none;
    }
}`, `@media (max-width: 500px) {
    .class {
        clear: none;
    }
}
@supports (inset-inline-start: 12px) {
    .class {
        inset-inline-start: 12px;
    }
    @media (max-width: 500px) {
        .class {
            inset-inline-start: 24px;
            inset-inline-end: 36px;
        }
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
    @media (max-width: 500px) {
        .class {
            left: 24px;
            right: 36px;
        }
        [dir="rtl"] .class {
            left: 36px;
            right: 24px;
        }
    }
}
@supports (clear: inline-end) {
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

test('non-rtl', async () => {
  await run(`.class {
    inset-block-start: 12px;
}

@media (max-width: 500px) {
    .class {
        inset-block-start: 24px;
    }
}`, `@supports (inset-block-start: 12px) {
    .class {
        inset-block-start: 12px;
    }
    @media (max-width: 500px) {
        .class {
            inset-block-start: 24px;
        }
    }
}
@supports not (inset-block-start: 12px) {
    .class {
        top: 12px;
    }
    @media (max-width: 500px) {
        .class {
            top: 24px;
        }
    }
}`);
});

test('rtl', async () => {
  await run(`.class {
    inset-inline-start: 12px;
}

@media (max-width: 500px) {
    .class {
        inset-inline-start: 24px;
    }
}`, `@supports (inset-inline-start: 12px) {
    .class {
        inset-inline-start: 12px;
    }
    @media (max-width: 500px) {
        .class {
            inset-inline-start: 24px;
        }
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
    @media (max-width: 500px) {
        .class {
            left: 24px;
        }
        [dir="rtl"] .class {
            left: auto;
            right: 24px;
        }
    }
}`);
});

test('with-other-css-props', async () => {
  await run(`.class {
    inset-inline-start: 12px;
    color: black;
    margin-inline: 20px 30px;
    padding-block: 40px 50px;
}

@media (max-width: 500px) {
    .class {
        color: white;
        inset-inline-start: 24px;
        inset-inline-end: 36px;
        padding-block: 0;
    }
}`, `.class {
    color: black;
    margin-inline-start: 20px;
    margin-inline-end: 30px;
    padding-block-start: 40px;
    padding-block-end: 50px;
}

@media (max-width: 500px) {
    .class {
        color: white;
        padding-block-start: 0;
        padding-block-end: 0;
    }
}

@supports (inset-inline-start: 12px) {

    .class {
        inset-inline-start: 12px;
    }

    @media (max-width: 500px) {

        .class {
            inset-inline-start: 24px;
            inset-inline-end: 36px;
        }
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

    @media (max-width: 500px) {

        .class {
            left: 24px;
            right: 36px;
        }

        [dir="rtl"] .class {
            left: 36px;
            right: 24px;
        }
    }
}`);
});

test.run();
