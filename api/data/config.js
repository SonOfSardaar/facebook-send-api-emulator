const port =process.env.npm_config_port || process.env.npm_package_config_port || process.env["SendApi.Port"] || 3000;

const config = require("../services/database").getData("configuration") || {
    webHookUrl: `http://localhost:${port}/webhook`,
    pageScopeId: "SET_AS_ENV_VAR",
    appSecret: "SET_AS_ENV_VAR",
    pageAccessToken : "SET_AS_ENV_VAR"
};

const webHookUrl =      process.env.npm_config_webHookUrl      || process.env["SendApi.WebHookUrl"]    || config.webHookUrl;
const pageScopeId =     process.env.npm_config_pageScopeId     || process.env["SendApi.PageScopeId"]   || config.pageScopeId;
const appSecret =       process.env.npm_config_appSecret       || process.env["SendApi.AppSecret"]     || config.appSecret;
const pageAccessToken = process.env.npm_config_pageAccessToken || config.pageAccessToken;

const newConfig={webHookUrl,pageScopeId,appSecret,port,pageAccessToken};

module.exports = newConfig;