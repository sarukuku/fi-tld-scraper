# .fi TLD scraper
A command line tool that scrapes data of .fi domains from an open api provided by the The Finnish Communications Regulatory Authority and saves the results to a JSON file and to a CSV file.

## How to install
Clone or download the repository and run `yarn` in it.

## Dependencies
The app has been tested only on a macOS High Sierra and has the followind dependencies:
- availability of `/bin/bash`
- availability of `yarn` command on `/bin/bash`
- node version >= 9.3.0
- a good network connection

## How to use
Run a full scrape. This means that the scraper will fech all data on all .fi domains owned by organizations and unions. At the time of writing this the amout is close to 370 000 unique domains. As a result you'll get single JSON file and a single CSV file that both weigh around 250 Mb. Running the full scrape takes about ~20 minutes.
```bash
npm run start
```

Run a limited scrape. The `--soft-limit` handle allows you to set a soft limit for the scrape. Exact returned amount it's guaranteed to be the same as the limit.
```bash
npm run start -- --soft-limit=500
```

Disable JSON output.
```bash
npm run start -- --no-json
```

Disable CSV output.
```bash
npm run start -- --no-csv
```

All of the flags above can be combined freely.

## Example output of a limited test
```bash
$ npm run start -- --soft-limit=500

> @ start /fi-tld-scraper
> node index.js "--soft-limit=500"

Fetching page https://odata.domain.fi/v4/odata/domains
Fetching page https://odata.domain.fi/v4/odata/domains?$skip=100
Fetching page https://odata.domain.fi/v4/odata/domains?$skip=200
Fetching page https://odata.domain.fi/v4/odata/domains?$skip=300
Fetching page https://odata.domain.fi/v4/odata/domains?$skip=400
Scrape duration: 2275.034ms
```

## Form of the resulting JSON file
The resulting JSON file with one domain would look like this (actual data reducted).
```json
{
  "domains":[
    {
      "Name":"",
      "State":"",
      "GrantDate":"",
      "LastValidityDate":"",
      "IsDNSSecInUse":"",
      "Holder":"",
      "Registrar":"",
      "OrganizationId":"",
      "Address":"",
      "PostalCode":"",
      "PostalArea":"",
      "AssociationType":"",
      "PhoneNumber":"",
      "DepartmentOrContactPerson":"",
      "Country":"",
      "NameServer1":"",
      "NameServer2":"",
      "NameServer3":"",
      "NameServer4":"",
      "NameServer5":"",
      "NameServer6":"",
      "NameServer7":"",
      "NameServer8":"",
      "NameServer9":"",
      "NameServer10":""
    }
  ]
}
```

## Form of the resulting CSV file
The resulting CSV file with one domain would look like this (actual data reducted).
```csv
Name;State;GrantDate;LastValidityDate;IsDNSSecInUse;Holder;Registrar;OrganizationId;Address;PostalCode;PostalArea;AssociationType;PhoneNumber;DepartmentOrContactPerson;Country;NameServer1;NameServer2;NameServer3;NameServer4;NameServer5;NameServer6;NameServer7;NameServer8;NameServer9;NameServer10
"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";"";""
```