module.exports = {
    webHookUrl: process.env["SendApi.WebHookUrl"] || "SET AS ENV VAR",
    pageScopeId: process.env["SendApi.PageScopeId"] || "SET AS ENV VAR",
    appSecret: process.env["SendApi.AppSecret"] || "SET AS ENV VAR",
    port: process.env["SendApi.Port"]
};