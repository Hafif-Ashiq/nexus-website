export const summarize = async (inputText: string, length: string, apiUrl: string) => {
    const url = `${apiUrl}`;
    const apiData = {
        text: inputText,
        arguments: {
            sentences: length
        }
    };
    console.log(apiData);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData)
    })
    const data = await response.json();
    console.log(data)
    return data;
}