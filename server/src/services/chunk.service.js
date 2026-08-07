import { splitTextIntoChunks } from "../utils/textChunker.js";

export const generateChunks = (text) => {
  return splitTextIntoChunks(text);
};