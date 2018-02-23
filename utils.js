'use strict'

const fs = require('fs')
const rp = require('request-promise-native')
const settings = require('./settings.js')
let fetchedCount = 0

exports.addToEndOfFile = async (filePath, value) => {
  return new Promise(resolve => {
    fs.appendFile(filePath, value, () => {
      resolve()
    })
  })
}

const getPage = async link => {
  return new Promise(resolve => {
    var options = {
      uri: link,
      json: true
    }

    rp(options)
      .then(async results => {
        resolve(results)
      })
      .catch(err => {
        console.error(err.message)
        resolve()
      })
  })
}

const getStringifiedResults = resultsArr => {
  let jsonString = ''
  resultsArr.forEach((domain, index, array) => {
    jsonString += `${JSON.stringify(domain)},`
  })
  return jsonString
}

// Recursive data fetcher function.
exports.fetchAndWriteDomainsToFile = async link => {
  console.log(`Fetching page ${link}`)
  const results = await getPage(link)

  // We didn't get any more results.
  if (!results || !results.value) {
    return
  }

  // Increase the fetched counter.
  fetchedCount += results.value.length

  // Stringify the json objects.
  let jsonString = getStringifiedResults(results.value)

  /**
   * Remove the trailing last comma from the last
   * domain object string if this is the last page
   */
  if (!results['@odata.nextLink'] || fetchedCount >= settings.fetchTarget) {
    jsonString = jsonString.substring(0, jsonString.length - 1)
  }

  // Write the string to file.
  await exports.addToEndOfFile(settings.domainsJsonFilePath, jsonString)

  // Fetch next page if link available.
  if (results['@odata.nextLink'] && fetchedCount < settings.fetchTarget) {
    return exports.fetchAndWriteDomainsToFile(results['@odata.nextLink'])
  }
}
