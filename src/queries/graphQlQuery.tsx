export const makeGraphQlQuery = async (query: string, variables: object) => {
    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        })
    })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}