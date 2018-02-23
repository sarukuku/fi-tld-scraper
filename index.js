'use strict'

const utils = require('./utils.js')
const settings = require('./settings.js');

(async () => {
  // Start a timer.
  console.time('Scrape duration')

  // Start the json file properly.
  await utils.addToEndOfFile(settings.domainsJsonFilePath, '{"domains":[')

  // Start recursive fetching.
  await utils.fetchAndWriteDomainsToFile(settings.pagingStartUrl)

  // End the json file properly.
  await utils.addToEndOfFile(settings.domainsJsonFilePath, ']}')

  // Stop the timer.
  console.timeEnd('Scrape duration')
})()
