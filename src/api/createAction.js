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
				input: action,
			},
		}),
	})

	const data = await response.json()

	if (data.errors != null) {
		const message = data.errors[0].message
		throw new Error(message)
	}

	return data.data.createAction.payload.id
}