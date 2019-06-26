const en = require("./locale-en");

let i18n;

switch (process.env.LOCALE) {
    default:
        i18n = en; // eslint-disable-line global-require
        break;
}

module.exports = i18n;
