export const translate = async (inputText: string, source: string, target: string, apiUrl: string) => {
    const url = `${apiUrl}`;
    const apiData = {
        source: source,
        target: target,
        text: inputText
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set the content type to application/json
        },
        body: JSON.stringify(apiData)
    });
    const data = await response.json();
    return data;
}