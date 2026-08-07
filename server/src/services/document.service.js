// import Document from "../models/Document.js";

// import { extractTextFromPDF } from "./pdf.service.js";
// import { generateChunks } from "./chunk.service.js";
// import { generateEmbedding } from "./embedding.service.js";

// import {
//   initializeCollection,
//   storeChunksInQdrant,
// } from "./qdrant.service.js";

// export const uploadDocument = async (user, file) => {
//   console.log("📄 Extracting PDF...");

//   const extractedText = await extractTextFromPDF(file.path);

//   console.log("✂️ Splitting Text...");

//   const chunks = generateChunks(extractedText);

//   console.log(`✅ ${chunks.length} chunks generated`);

//   const document = await Document.create({
//     companyId: user.companyId,
//     uploadedBy: user._id,

//     originalFileName: file.originalname,
//     storedFileName: file.filename,

//     filePath: file.path,

//     mimeType: file.mimetype,
//     fileSize: file.size,

//     extractedText,

//     totalChunks: chunks.length,

//     status: "PROCESSING",
//   });

//   console.log("🧠 Generating Embeddings...");

//   const embeddings = await Promise.all(
//     chunks.map((chunk) => generateEmbedding(chunk))
//   );

//   console.log("✅ Embeddings Ready");

//   console.log("☁️ Connecting Qdrant...");

//   await initializeCollection();

//   console.log("📤 Uploading vectors...");

//   await storeChunksInQdrant({
//     companyId: user.companyId,
//     documentId: document._id,
//     uploadedBy: user._id,
//     originalFileName: file.originalname,
//     chunks,
//     embeddings,
//   });

//   document.status = "PROCESSED";

//   await document.save();

//   console.log("🎉 Upload Completed");

//   return document;
// };

import Document from "../models/Document.js";

import { extractTextFromPDF } from "./pdf.service.js";
import { generateChunks } from "./chunk.service.js";
import { generateEmbedding } from "./embedding.service.js";

import {
  initializeCollection,
  storeChunksInQdrant,
} from "./qdrant.service.js";

// ==========================
// Upload Document
// ==========================

export const uploadDocument = async (user, file) => {
  console.log("📄 Extracting PDF...");

  const extractedText = await extractTextFromPDF(file.path);

  console.log("✂️ Splitting Text...");

  const chunks = generateChunks(extractedText);

  console.log(`✅ ${chunks.length} chunks generated`);

  const document = await Document.create({
    companyId: user.companyId,
    uploadedBy: user._id,

    originalFileName: file.originalname,
    storedFileName: file.filename,

    filePath: file.path,

    mimeType: file.mimetype,
    fileSize: file.size,

    extractedText,

    totalChunks: chunks.length,

    status: "PROCESSING",
  });

  console.log("🧠 Generating Embeddings...");

  const embeddings = await Promise.all(
    chunks.map((chunk) => generateEmbedding(chunk))
  );

  console.log("✅ Embeddings Ready");

  console.log("☁️ Connecting Qdrant...");

  await initializeCollection();

  console.log("📤 Uploading vectors...");

  await storeChunksInQdrant({
    companyId: user.companyId,
    documentId: document._id,
    uploadedBy: user._id,
    originalFileName: file.originalname,
    chunks,
    embeddings,
  });

  document.status = "PROCESSED";

  await document.save();

  console.log("🎉 Upload Completed");

  return document;
};

// ==========================
// Get Documents
// ==========================

export const getDocuments = async (user) => {
  return await Document.find({
    companyId: user.companyId,
  })
    .select(
      "_id originalFileName fileSize status totalChunks createdAt"
    )
    .sort({
      createdAt: -1,
    });
};

// ==========================
// Delete Document
// ==========================

export const deleteDocument = async (user, documentId) => {
  const document = await Document.findOne({
    _id: documentId,
    companyId: user.companyId,
  });

  if (!document) {
    throw new Error("Document not found");
  }

  await Document.findByIdAndDelete(documentId);

  return document;
};