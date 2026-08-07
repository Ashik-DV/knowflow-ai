// import "dotenv/config";
// import { QdrantClient } from "@qdrant/js-client-rest";

// let client = null;

// export const getQdrantClient = () => {
//   if (!client) {
//     console.log("QDRANT_URL:", process.env.QDRANT_URL);
//     console.log("API KEY EXISTS:", !!process.env.QDRANT_API_KEY);

//     client = new QdrantClient({
//       url: process.env.QDRANT_URL,
//       apiKey: process.env.QDRANT_API_KEY,
//       checkCompatibility: false,
//     });
//   }

//   return client;
// };


import "dotenv/config";
import { QdrantClient } from "@qdrant/js-client-rest";

console.log("================================");
console.log("QDRANT_URL:", JSON.stringify(process.env.QDRANT_URL));
console.log("API KEY EXISTS:", !!process.env.QDRANT_API_KEY);
console.log("================================");

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL.trim(),
  apiKey: process.env.QDRANT_API_KEY.trim(),
  checkCompatibility: false,
});

export const getQdrantClient = () => qdrant;