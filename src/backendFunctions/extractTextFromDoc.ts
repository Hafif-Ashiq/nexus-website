import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Set the workerSrc to the path of the PDF.js worker file
GlobalWorkerOptions.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.mjs';

export const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await getDocument(arrayBuffer).promise;
    let textContent = '';

    for (let i = 0; i < pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i + 1);
        const textContentPage = await page.getTextContent();
        const textItems = textContentPage.items.map((item: any) => item.str);
        textContent += textItems.join(' ') + '\n'; // Join text items and add a newline for each page
    }

    return textContent.trim(); // Return the extracted text
}
