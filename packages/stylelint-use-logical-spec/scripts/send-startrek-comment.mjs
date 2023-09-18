import { init as initStClient } from '@yandex-int/st-client';

const client = initStClient({ token: process.env.STARTREK_TOKEN });

export default (ticketId, text, ...summonees) => client.createIssueComment(ticketId, { text, summonees });
