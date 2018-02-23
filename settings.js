'use strict'

const argv = require('yargs').argv

exports.domainsJsonFilePath = `./scraped-data/domains-run-${Math.floor(Date.now() / 1000)}.json`
exports.pagingStartUrl = 'https://odata.domain.fi/v4/odata/domains'

if (argv.softLimit) {
  exports.fetchTarget = argv.softLimit
} else {
  exports.fetchTarget = Infinity
}
