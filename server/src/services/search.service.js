import { generateEmbedding } from "./embedding.service.js";
import { getQdrantClient } from "../config/qdrant.js";

const COLLECTION_NAME = "knowflow_documents";

export const searchSimilarChunks = async (
  companyId,
  question,
  limit = 5
) => {
  const qdrant = getQdrantClient();

  const embedding = await generateEmbedding(question);

  const results = await qdrant.query(COLLECTION_NAME, {
    query: embedding,
    limit,
    with_payload: true
  });

  console.log("🔍 Search Results:", results);

  return results.points;
};