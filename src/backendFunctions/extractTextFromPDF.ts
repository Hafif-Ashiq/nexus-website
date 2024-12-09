export const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pdf-to-text/`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    return data.output_text;
}