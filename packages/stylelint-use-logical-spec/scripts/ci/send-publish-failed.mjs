import sendStartrekComment from "../send-startrek-comment.mjs";

import packageJson from '../../package.json';

sendStartrekComment(
	process.env.TICKET_ID,
	`❌ Плагин ${packageJson.name} ((${process.env.CI_JOB_URL} не опубликован))`,
	process.env.STAFF_LOGIN
)
