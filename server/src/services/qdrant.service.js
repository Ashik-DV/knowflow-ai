import { v4 as uuid } from "uuid";
import { getQdrantClient } from "../config/qdrant.js";

const COLLECTION_NAME = "knowflow_documents";
const VECTOR_SIZE = 3072;

export const initializeCollection = async () => {
  const qdrant = getQdrantClient();

  const collections = await qdrant.getCollections();

  const exists = collections.collections.some(
    (collection) => collection.name === COLLECTION_NAME
  );

  if (exists) {
    console.log("✅ Collection already exists");
    return;
  }

  await qdrant.createCollection(COLLECTION_NAME, {
    vectors: {
      size: VECTOR_SIZE,
      distance: "Cosine",
    },
  });

  console.log("✅ Collection created");
};

export const storeChunksInQdrant = async ({
  companyId,
  documentId,
  uploadedBy,
  originalFileName,
  chunks,
  embeddings,
}) => {
  const qdrant = getQdrantClient();

  const points = chunks.map((chunk, index) => ({
    id: uuid(),
    vector: embeddings[index],
    payload: {
      companyId: companyId.toString(),
      documentId: documentId.toString(),
      uploadedBy: uploadedBy.toString(),
      originalFileName,
      chunkIndex: index,
      text: chunk,
    },
  }));

  await qdrant.upsert(COLLECTION_NAME, {
    wait: true,
    points,
  });

  console.log(`✅ ${points.length} vectors uploaded`);
};