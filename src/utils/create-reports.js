import * as chromeLauncher from 'chrome-launcher'

import createAction from '../api/create-action.js'
import createReport from './create-report.js'
import signale from './signale.js'

export default async function createReports(endpoint, headers, events, urls, audit) {
  const browser = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
  })

  signale.start(`Headless browser running on port ${browser.port}`)

  for (const [index, url] of urls.entries()) {
    const event = events[index]

    signale.await(`Running tests for ${url}`)

    const action = await createReport(url, audit, browser)
    if (action.value == null) {
      signale.warn(`Lighthouse failed to create report for ${url}`)
      continue
    }

    signale.success(`Reporting value ${action.value} for ${url} to event ${event.id}`)

    const actionId = await createAction(endpoint, headers, event, action)

    signale.success(`Created action with id ${actionId}`)
  }

  await browser.kill()
}
