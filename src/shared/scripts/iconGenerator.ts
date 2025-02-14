import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, '../../../public/icons');
const EXPORT_FILE = path.resolve(__dirname, '../ui/icon/iconExports.ts');

// 1. 아이콘 파일 가져오기
const iconFiles = fs
  .readdirSync(ICONS_DIR)
  .filter((file) => file.endsWith('.svg'));

// 2. 파일명을 PascalCase로 변환하는 (e.g. "ico_add.svg" -> "IcoAdd")
const toPascalCase = (str: string) =>
  str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase()) // "-"나 "_" 다음 문자를 대문자로 변환
    .replace(/\.svg$/, '') // ".svg" 제거
    .replace(/^\w/, (c) => c.toUpperCase()); // 첫 글자를 대문자로 변환

// 3. import 문 작성
const imports = iconFiles
  .map((file) => {
    const iconName = toPascalCase(file);
    return `import ${iconName} from '../../../../public/icons/${file}'`;
  })
  .join('\n');

// 4. export 객체 생성
const exportEntries = iconFiles
  .map((file) => {
    const keyName = file
      .replace(/\.svg$/, '')
      .replace(/ico_/g, '')
      .replace(/[-_](.)/g, (_, char) => char.toUpperCase()); // "ico_" 접두사 제거
    const iconName = toPascalCase(file);
    return `  ${keyName}: ${iconName},`;
  })
  .join('\n');

const typeDefinitions = `export type IconNames = keyof typeof ICONS;\n\n`;

const fileContent = `${imports}
    ${typeDefinitions}
    
    export const ICONS = {
        ${exportEntries}
    } as const;
`;

// 5. 파일 생성
fs.writeFileSync(EXPORT_FILE, fileContent);

console.log('✅ iconExports.ts 파일이 자동 생성되었습니다.');

// 6. 자동으로 VS Code에서 파일 열기 ✅ 추가
exec(`code ${EXPORT_FILE}`, (err) => {
  if (err) {
    console.error('❌ VS Code에서 파일을 여는 데 실패했습니다.', err);
  } else {
    console.log('✅ VS Code에서 iconExports.ts 파일을 열었습니다.');
  }
});
