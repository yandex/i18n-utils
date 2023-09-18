import sendStartrekComment from "../send-startrek-comment.mjs";

import packageJson from '../../package.json';

sendStartrekComment(
  process.env.TICKET_ID,
  `✅ Версия ${packageJson.version} плагина ${packageJson.name} ((https://npm.yandex-team.ru/-/ui/?text=${packageJson.name} опубликована))`
)
