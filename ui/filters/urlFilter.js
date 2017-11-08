module.exports = function () {
    return function (headlessUrl) {
        var url = headlessUrl.startsWith("http") ? headlessUrl : "http://" + headlessUrl;
        return url;
    }
}