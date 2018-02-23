'use strict'

const argv = require('yargs').argv

exports.domainsJsonFilePath = `./scraped-data/domains-run-${Math.floor(Date.now() / 1000)}.json`
exports.domainsCsvFilePath = `./scraped-data/domains-run-${Math.floor(Date.now() / 1000)}.csv`
exports.pagingStartUrl = 'https://odata.domain.fi/v4/odata/domains'
exports.csvHeaderChema = 'Name;State;GrantDate;LastValidityDate;IsDNSSecInUse;Holder;Registrar;OrganizationId;Address;PostalCode;PostalArea;AssociationType;PhoneNumber;DepartmentOrContactPerson;Country;NameServer1;NameServer2;NameServer3;NameServer4;NameServer5;NameServer6;NameServer7;NameServer8;NameServer9;NameServer10\n'

exports.fetchTarget = (argv.softLimit) ? argv.softLimit : Infinity
exports.json = (argv.json === undefined) ? true : argv.json
exports.csv = (argv.csv === undefined) ? true : argv.csv
