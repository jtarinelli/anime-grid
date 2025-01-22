export const queryBackend = async (url: string, body?: any) => {
    const response = await fetch(
        `http://localhost:3000/${url}`,
        {
            method: body ? "POST" : undefined,
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        }
    )
    return response.json()
}