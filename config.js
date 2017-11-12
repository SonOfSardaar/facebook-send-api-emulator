const webServerPort= process.env["SendApi.Port"] || 3000;

module.exports = {
    webHookUrl: process.env["SendApi.WebHookUrl"] || `http://localhost:${webServerPort}/webhook`,
    pageScopeId: process.env["SendApi.PageScopeId"] || "SET AS ENV VAR",
    appSecret: process.env["SendApi.AppSecret"] || "SET AS ENV VAR",
    port: webServerPort,
    pageAccessToken:"XXXXXXXXXXXXX"
};