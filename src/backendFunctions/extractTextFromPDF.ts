import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Set up the worker
GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.js'; // Adjust the path as needed

export const extractTextFromPDF = async (file: File): Promise<string> => {
    const pdfData = await file.arrayBuffer();
    const pdf = await getDocument(pdfData).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(' ') + '\n';
    }

    return text;
}; 