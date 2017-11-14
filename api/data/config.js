const webServerPort = process.env["SendApi.Port"] || 3000;

const config = require("../services/database").getData("configuration") || {
    webHookUrl: `http://localhost:${webServerPort}/webhook`,
    pageScopeId: "SET_AS_ENV_VAR",
    appSecret: "SET_AS_ENV_VAR",
    pageAccessToken : "SET_AS_ENV_VAR"
};

module.exports = {
    webHookUrl: process.env["SendApi.WebHookUrl"] || config.webHookUrl,
    pageScopeId: process.env["SendApi.PageScopeId"] || config.pageScopeId,
    appSecret: process.env["SendApi.AppSecret"] || config.appSecret,
    port: webServerPort,
    pageAccessToken: config.pageAccessToken
};