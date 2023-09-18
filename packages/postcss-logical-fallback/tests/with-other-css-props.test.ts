import {test} from "uvu";
import {run} from "./run";

test('clear', async () => {
  await run(`.class {
    text-align: start;
    color: black;
    clear: inline-start;
    display: flex;
    align-items: center;
    justify-content: center;
}`, `.class {
    text-align: start;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}
@supports (clear: inline-start) {
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

test('float', async () => {
  await run(`/** some comment */
.class {
    text-align: start;
    color: black;
    float: inline-end;
    display: flex;
    align-items: center;
    justify-content: center;
}`, `/** some comment */
.class {
    text-align: start;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}
@supports (float: inline-end) {
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

test('inset-block-end', async () => {
  await run(`.class {
    text-align: start;
    color: black;
    inset-block-end: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}`, `.class {
    text-align: start;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}
@supports (inset-block-end: 20%) {
    .class {
        inset-block-end: 20%;
    }
}
@supports not (inset-block-end: 20%) {
    .class {
        bottom: 20%;
    }
}`);
});

test('inset-block-start', async () => {
  await run(`.class {
    text-align: start;
    color: black;
    inset-block-start: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}`, `.class {
    text-align: start;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}
@supports (inset-block-start: 20%) {
    .class {
        inset-block-start: 20%;
    }
}
@supports not (inset-block-start: 20%) {
    .class {
        top: 20%;
    }
}`);
});

test('inset-inline-end', async () => {
  await run(`.class {
    text-align: start;
    color: black;
    inset-inline-end: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}`, `.class {
    text-align: start;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}
@supports (inset-inline-end: 20%) {
    .class {
        inset-inline-end: 20%;
    }
}
@supports not (inset-inline-end: 20%) {
    .class {
        right: 20%;
    }
    [dir="rtl"] .class {
        right: auto;
        left: 20%;
    }
}`);
});

test('inset-inline-start', async () => {
  await run(`.class {
    text-align: start;
    color: black;
    inset-inline-start: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}`, `.class {
    text-align: start;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}
@supports (inset-inline-start: 20%) {
    .class {
        inset-inline-start: 20%;
    }
}
@supports not (inset-inline-start: 20%) {
    .class {
        left: 20%;
    }
    [dir="rtl"] .class {
        left: auto;
        right: 20%;
    }
}`);
});

test.run();
