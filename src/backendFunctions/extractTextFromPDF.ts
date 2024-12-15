export const extractTextFromPDF = async (pdfFile: File, endpoint: string): Promise<string> => {
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    const response = await fetch(`${endpoint}/pdf-to-text/`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    return data.output_text;
}