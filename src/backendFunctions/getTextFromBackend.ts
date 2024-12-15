export const getTextFromAudio = async (audioFile: File, endpoint: string): Promise<string> => {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch(`${endpoint}/audio-to-text/`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    return data.output_text;
}

export const getTextFromImage = async (imageFile: File, endpoint: string): Promise<string> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${endpoint}/image-to-text/`, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    return data.output_text;
}
