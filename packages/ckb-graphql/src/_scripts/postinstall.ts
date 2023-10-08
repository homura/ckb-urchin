import { readFile, writeFile } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MODULE_ROOT = path.join(__dirname, '../..');
const TYPE_DEF_PATH = path.join(MODULE_ROOT, 'ckb.graphql');
const TYPE_DEF_OUTPUT_PATH = path.join(MODULE_ROOT, 'src/typeDefs.ts');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// copy ckb.graphql to src/typeDefs.ts
async function writeTypeDefs() {
  const buf = await readFileAsync(TYPE_DEF_PATH);
  const typeDefs = `// eslint-disable
// prettier-ignore
export const typeDefs = \`
${buf.toString('utf-8')}\`;
`;
  await writeFileAsync(TYPE_DEF_OUTPUT_PATH, typeDefs);
}

await writeTypeDefs();
