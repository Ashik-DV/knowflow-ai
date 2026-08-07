import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractTextFromPDF = async (filePath) => {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let extractedText = "";

    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
      const page = await pdf.getPage(pageNo);

      const content = await page.getTextContent();

      extractedText +=
        content.items
          .map((item) => item.str)
          .join(" ") + "\n";
    }

    return extractedText;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw error;
  }
};