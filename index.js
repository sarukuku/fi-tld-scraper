'use strict'

const utils = require('./utils.js')
const settings = require('./settings.js');

(async () => {
  // Start a timer.
  console.time('Scrape duration')

  if (settings.json) {
    // Write the file "header"
    await utils.addToEndOfFile(settings.domainsJsonFilePath, '{"domains":[')
  }

  if (settings.csv) {
    // Write the file "header"
    await utils.addToEndOfFile(settings.domainsCsvFilePath, settings.csvHeaderChema)
  }

  if (!settings.json && !settings.csv) {
    console.log('Stopping the scrape as you\'ve disabled all available output methods')

    // Stop the timer.
    console.timeEnd('Scrape duration')

    // Early exit
    return
  }

  // Start recursive fetching & writing to files.
  await utils.fetchAndWriteDomainsToFile(settings.pagingStartUrl)

  // End the json file properly.
  if (settings.json) {
    await utils.addToEndOfFile(settings.domainsJsonFilePath, ']}')
  }

  // Stop the timer.
  console.timeEnd('Scrape duration')
})()
