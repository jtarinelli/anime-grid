export const makeGraphQlQuery = async (query: any, variables: object) => {
    const response = await fetch(import.meta.env.VITE_ANILIST_GRAPHQL_URL, {
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