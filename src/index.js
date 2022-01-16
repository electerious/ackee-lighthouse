import dotenv from 'dotenv'

dotenv.config()

import chromeLauncher from 'chrome-launcher'
import lighthouse from 'lighthouse'
import dotProp from 'dot-prop'

import signale from './utils/signale.js'
import createAction from './api/createAction.js'

const createReport = async (endpoint, event, url, audit, browser) => {
	const { lhr } = await lighthouse(url, {
		port: browser.port,
	}, {
		extends: 'lighthouse:default',
		settings: {
			extraHeaders: { Cookie: 'ackee_ignore=1' },
		},
	})

	const action = {
		key: audit,
		value: dotProp.get(lhr.audits, audit),
	}

	await createAction(endpoint, event, action)

	return action.value
}

const createReports = async (endpoint, events, urls, audit) => {
	const browser = await chromeLauncher.launch({
		chromeFlags: [ '--headless' ],
	})

	signale.start(`Headless browser running on port ${ browser.port }`)

	for (let index = 0; index < urls.length; index++) {
		const event = events[index]
		const url = urls[index]

		signale.await(`Running tests for ${ url }`)
		const value = await createReport(endpoint, event, url, audit, browser)
		signale.success(`Reported value ${ value } for ${ url } to event ${ event.id }`)
	}

	await browser.kill()
}

const endpoint = process.env.ACKEE_ENDPOINT
const events = process.env.ACKEE_EVENT_ID.split(',').map((eventId) => ({ id: eventId }))
const urls = process.env.URL.split(',')
const audit = process.env.AUDIT ?? 'speed-index.numericValue'

createReports(endpoint, events, urls, audit)