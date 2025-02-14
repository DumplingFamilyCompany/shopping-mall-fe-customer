import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 스크립트 실행시 `FOLDER_NAME=sample yarn generate:entities`로 환경 변수 전달
const folderName = process.env.FOLDER_NAME;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, `../../entities/${folderName}`);

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

// model.ts 기본 내용
const defaultModelContent = `
  import { typedFetch } from '@/shared/lib/apiClient';
  import { createSearchParams } from '@/shared/lib/createSearchParams';

  export const ${folderName}API = {
    // 유저 목록 가져오기
    get${folderName?.replace(/^\w/, (c) => c.toUpperCase())}: async () => {
      return await typedFetch<[]>('/api/${folderName}');
    },

    // 유저 생성 (POST)
    createUser: async (userData: { name: string; email: string }) => {
      return typedFetch<[]>('/api/users', 'POST', userData);
    },
  }

  
`;

// hooks.ts 기본 내용
const defaultHooksContent = `
  import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryOptions,
  } from '@tanstack/react-query';
  import { ${folderName}API } from './model';

  // 📌 1. 유저 목록 조회 훅
  export const useGetUsers = (
    options?: Omit<UseQueryOptions<[]>, 'queryKey' | 'queryFn'>,
  ) => {
    return useQuery<[]>({
      queryKey: ['users'],
      queryFn: ${folderName}API.get${folderName?.replace(/^\w/, (c) => c.toUpperCase())},
      placeholderData: keepPreviousData,
      ...options,
    });
  };

  // 📌 2. 유저 생성 훅
  export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ${folderName}API.createUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] }); // 유저 목록 다시 불러오기
      },
      onError: (err) => {
        console.error(err);
        alert(err);
      },
    });
  };
`;

// ${folderName}Service.ts 생성
createFolderAndFile(BASE_DIR, `model.ts`, defaultModelContent);

// index.ts 생성
createFolderAndFile(BASE_DIR, 'hooks.ts', defaultHooksContent);

// index.ts 생성
createFolderAndFile(BASE_DIR, 'types.ts', '');

console.log('🚀 entities 폴더 및 파일 생성 완료!');
