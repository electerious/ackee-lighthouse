import { getProperty } from 'dot-prop'
import lighthouse from 'lighthouse'

export default async function createReport(url, audit, browser) {
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
