import * as chromeLauncher from 'chrome-launcher'
import { getProperty } from 'dot-prop'
import dotenv from 'dotenv'
import lighthouse from 'lighthouse'

import createAction from './api/createAction.js'
import signale from './utils/signale.js'

dotenv.config()

const createReport = async (url, audit, browser) => {
  const { lhr } = await lighthouse(
    url,
    {
      port: browser.port,
    },
    {
      extends: 'lighthouse:default',
      settings: {
        extraHeaders: { Cookie: 'ackee_ignore=1' },
      },
    },
  )

  const action = {
    key: audit,
    value: getProperty(lhr.audits, audit),
  }

  return action
}

const createReports = async (endpoint, headers, events, urls, audit) => {
  const browser = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
  })

  signale.start(`Headless browser running on port ${browser.port}`)

  for (let index = 0; index < urls.length; index++) {
    const event = events[index]
    const url = urls[index]

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

const endpoint = process.env.ACKEE_ENDPOINT
const events = process.env.ACKEE_EVENT_ID.split(',').map((eventId) => ({ id: eventId }))
const urls = process.env.URL.split(',')
const audit = process.env.AUDIT ?? 'speed-index.numericValue'

const headers = new Headers({
  'Content-Type': 'application/json',
})

createReports(endpoint, headers, events, urls, audit)
