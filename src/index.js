import createReports from './utils/create-reports.js'

const endpoint = process.env.ACKEE_ENDPOINT
const events = process.env.ACKEE_EVENT_ID.split(',').map((eventId) => ({ id: eventId }))
const urls = process.env.URL.split(',')
const audit = process.env.AUDIT ?? 'speed-index.numericValue'

const headers = new Headers({
  'Content-Type': 'application/json',
})

await createReports(endpoint, headers, events, urls, audit)
