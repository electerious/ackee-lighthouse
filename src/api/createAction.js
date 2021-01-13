import fetch from 'node-fetch'

export default async (endpoint, headers, event, action) => {

	const response = await fetch(endpoint, {
		method: 'post',
		headers,
		body: JSON.stringify({
			query: `
				mutation createAction($eventId: ID!, $input: CreateActionInput!) {
					createAction(eventId: $eventId, input: $input) {
						payload {
							id
						}
					}
				}
			`,
			variables: {
				eventId: event.id,
				input: action
			}
		})
	})

	const data = await response.json()

	return data.data.createAction.payload

}