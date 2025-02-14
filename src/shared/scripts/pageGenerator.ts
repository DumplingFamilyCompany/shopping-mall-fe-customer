import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 스크립트 실행시 `PAGE_NAME=sample yarn generate:pages`로 환경 변수 전달
const pageName = process.env.PAGE_NAME;
const uppercasePageName = pageName?.replace(/^\w/, (c) => c.toUpperCase());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAGE_DIR = path.resolve(__dirname, `../../app/(routes)/${pageName}`);
const FEATURES_DIR = path.resolve(__dirname, `../../features/${pageName}`);

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

// app/(routes)/${pageName}/page.tsx 기본 내용
const defaultPageContent = `
    import ${uppercasePageName} from '@/features/${pageName}/${uppercasePageName}';

    const ${uppercasePageName}Page = () => {
      return <${uppercasePageName} />;
    };

    export default ${uppercasePageName}Page;
`;

// features/${pageName}/${uppercasePageName}.tsx 기본 내용
const defaultContainerContent = `
    import styles from './${uppercasePageName}.module.scss';
    
    const ${uppercasePageName} = () => {
        return (
            <div>Welcome ${uppercasePageName}</div>
        )
    };

    export default ${uppercasePageName};
`;

// app/(routes)/${pageName}/page.tsx 생성
createFolderAndFile(PAGE_DIR, `page.tsx`, defaultPageContent);

// features>${pageName}/${uppercasePageName}.tsx 생성
createFolderAndFile(
  FEATURES_DIR,
  `${uppercasePageName}.tsx`,
  defaultContainerContent,
);

// features>${pageName}/${uppercasePageName}.module.scss 생성
createFolderAndFile(FEATURES_DIR, `${uppercasePageName}.module.scss`, '');

// queries/index.ts 생성
createFolderAndFile(path.join(FEATURES_DIR, 'model'), 'api.ts', '');

createFolderAndFile(path.join(FEATURES_DIR, 'model'), 'hooks.ts', '');

createFolderAndFile(path.join(FEATURES_DIR, 'model'), 'types.ts', '');

fs.mkdirSync(path.join(FEATURES_DIR, 'ui'), { recursive: true });

console.log('🚀 페이지 & features 폴더 및 파일 생성 완료!');
