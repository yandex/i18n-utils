import sendStartrekComment from "../send-startrek-comment.mjs";

sendStartrekComment(
	process.env.TICKET_ID,
	`❌ Проверка версий npm пакета ((${process.env.CI_JOB_URL} не прошла)). Нужно обновить версию пакета`,
	process.env.STAFF_LOGIN
)
