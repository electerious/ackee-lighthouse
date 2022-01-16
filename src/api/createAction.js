import fetch from 'node-fetch'

export default async (endpoint, event, action) => {
	const response = await fetch(endpoint, {
		method: 'post',
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
				input: action,
			},
		}),
	})

	const text = await response.text()
	console.log(text)
	const data = JSON.parse(text)

	if (data.errors != null) {
		const message = data.errors[0].message
		throw new Error(message)
	}

	return data.data.createAction.payload
}