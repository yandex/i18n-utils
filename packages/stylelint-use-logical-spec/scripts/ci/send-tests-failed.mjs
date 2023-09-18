import sendStartrekComment from "../send-startrek-comment.mjs";

sendStartrekComment(
	process.env.TICKET_ID,
	`❌ Тесты ((${process.env.CI_JOB_URL} не прошли))`,
	process.env.STAFF_LOGIN
)
