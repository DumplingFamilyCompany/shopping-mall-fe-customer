import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const folderName = process.env.FOLDER_NAME;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, `../services/${folderName}`);

const createFolderAndFile = (
  folderPath: string,
  fileName: string,
  content: string,
) => {
  const fullPath = path.join(folderPath, fileName);

  // 폴더가 없으면 생성
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`✅ 폴더 생성: ${folderPath}`);
  }

  // 파일이 없으면 생성
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`✅ 파일 생성: ${fullPath}`);
  } else {
    console.log(`⚠️ 파일이 이미 존재합니다: ${fullPath}`);
  }
};

// ${folderName}Service.ts 기본 내용
const defaultServiceContent = `
  import { typedFetch } from '../apiClient';

  export const ${folderName}Service = {
  get${folderName?.replace(/^\w/, (c) => c.toUpperCase())}List: async () => {
    const response =
      await typedFetch<{ id: string; name: string }[]>('/api/${folderName}');

    return response;
  },
}`;

// index.ts 기본 내용
const defaultIndexContent = `
  export { ${folderName}Service } from './${folderName}Service';
  export * from './queries';
  export * from './mutations';
`;

// queries/index.ts 기본 내용
const queriesIndexContent = `export {};`;

// ${folderName}Service.ts 생성
createFolderAndFile(BASE_DIR, `${folderName}Service.ts`, defaultServiceContent);

// index.ts 생성
createFolderAndFile(BASE_DIR, 'index.ts', defaultIndexContent);

// mutations/index.ts 생성
createFolderAndFile(
  path.join(BASE_DIR, 'mutations'),
  'index.ts',
  queriesIndexContent,
);

// queries/index.ts 생성
createFolderAndFile(
  path.join(BASE_DIR, 'queries'),
  'index.ts',
  queriesIndexContent,
);

console.log('🚀 서비스 폴더 및 파일 생성 완료!');
