import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsWorker.version}/pdf.worker.min.js`;

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