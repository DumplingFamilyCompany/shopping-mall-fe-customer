import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 스크립트 실행시 `PAGE_NAME=sample yarn generate:pages`로 환경 변수 전달
const pageName = process.env.PAGE_NAME;
const uppercasePageName = pageName?.replace(/^\w/, (c) => c.toUpperCase());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAGE_DIR = path.resolve(__dirname, `../app/(navigation)/${pageName}`);
const CONTAINER_DIR = path.resolve(__dirname, `../containers/${pageName}`);

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

// app>(navitation)/${pageName}/page.tsx 기본 내용
const defaultPageContent = `
    import ${uppercasePageName}Container from '@/containers/${pageName}/${uppercasePageName}Container';

    const ${uppercasePageName}Page = () => {
    return <${uppercasePageName}Container />;
    };

    export default ${uppercasePageName}Page;
`;

// containers>${pageName}/${uppercasePageName}Container.tsx 기본 내용
const defaultContainerContent = `
    import styles from './${uppercasePageName}Container.module.scss';
    
    const ${uppercasePageName}Container = () => {
        return (
            <div>Welcome ${uppercasePageName} Container</div>
        )
    };

    export default ${uppercasePageName}Container;
`;

// queries/index.ts 기본 내용
const queriesIndexContent = `export {};`;

// app>(navitation)/${pageName}/page.tsx 생성
createFolderAndFile(PAGE_DIR, `page.tsx`, defaultPageContent);

// containers>${pageName}/${uppercasePageName}Container.tsx 생성
createFolderAndFile(
  CONTAINER_DIR,
  `${uppercasePageName}Container.tsx`,
  defaultContainerContent,
);

// containers>${pageName}/${uppercasePageName}Container.module.scss 생성
createFolderAndFile(
  CONTAINER_DIR,
  `${uppercasePageName}Container.module.scss`,
  '',
);

console.log('🚀 페이지 & 컨테이너 폴더 및 파일 생성 완료!');
