import { test } from 'uvu';
import { run } from './run';

test('should not copy comments', async () => {
    await run(
        `body {
      /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
      min-height: 100vh;
      padding: 2rem;
  }`,
        `body {
      /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
      min-height: 100vh;
      padding: 2rem;
  }`,
    );

    await run(
        `.class {
      /*
        multiline
        comment
       */
      min-height: 100vh;
      padding: 2rem;
  }`,
        `.class {
      /*
        multiline
        comment
       */
      min-height: 100vh;
      padding: 2rem;
  }`,
    );
});

test('should not fallback statements with variables', async () => {
    await run(
        `
      .class {
        padding-inline: var(--some-variable);
      }
      `,
        `
      .class {
        padding-inline: var(--some-variable);
      }
      `,
    );

    await run(
        `
      .class {
        margin-block: var(--some-variable);
      }
      `,
        `
      .class {
        margin-block: var(--some-variable);
      }
      `,
    );

    await run(
        `
      .class {
        inset-inline: var(--some-variable);
      }
      `,
        `
      .class {
        inset-inline: var(--some-variable);
      }
      `,
    );
});

test.run();
