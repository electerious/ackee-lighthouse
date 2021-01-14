import dotenv from 'dotenv'

dotenv.config()

import { Headers } from 'node-fetch'
import chromeLauncher from 'chrome-launcher'
import lighthouse from 'lighthouse'

import createAction from './api/createAction.js'

const runLighthouse = async (url, flags = {}, config = null) => {
	const chrome = await chromeLauncher.launch(flags)

	const { lhr } = await lighthouse(url, {
		...flags,
		port: chrome.port
	}, config)

	await chrome.kill()

	return lhr
}

const createReport = async (endpoint, headers, event, url, audit) => {
	const lhr = await runLighthouse(url, {
		chromeFlags: [ '--headless' ]
	})

	const speedIndex = lhr.audits[audit]

	const action = {
		key: 'Speed Index',
		value: speedIndex.score
	}

	await createAction(endpoint, headers, event, action)
}

const endpoint = process.env.ACKEE_ENDPOINT
const token = process.env.ACKEE_TOKEN
const event = { id: process.env.ACKEE_EVENT_ID }
const url = process.env.URL
const audit = process.env.AUDIT ?? 'speed-index'

const headers = new Headers({
	Authorization: `Bearer ${ token }`
})

createReport(endpoint, headers, event, url, audit)