module.exports = {
    webHookUrl: process.env["SendApi.WebHookUrl"],
    pageScopeId: process.env["SendApi.PageScopeId"] || "5436671887007625",
    appSecret: process.env["SendApi.AppSecret"],
    port: process.env["SendApi.Port"]
};