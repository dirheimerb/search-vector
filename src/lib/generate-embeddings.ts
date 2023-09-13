import dotenv from "dotenv";
import { generateEmbeddings } from "./generateEmbeddings";
dotenv.config();

async function main() {
  await generateEmbeddings();
}

main().catch((err) => console.error(err));
