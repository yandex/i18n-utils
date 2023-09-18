import sendStartrekComment from "../send-startrek-comment.mjs";

sendStartrekComment(
	process.env.TICKET_ID,
	`❌ Линтер ((${process.env.CI_JOB_URL} не прошел))`,
	process.env.STAFF_LOGIN
)
