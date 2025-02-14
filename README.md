# nextjs-template

## 프로젝트 구조

```
nextjs-template
├─ public (정적 파일, 아이콘 등)
├─ src
│  ├─ app
│  │  ├─ (routes)
│  ├─ entities (전역적으로 사용하는 도메인 데이터)
│  │  └─ user
│  │     ├─ hooks.ts (관련 커스텀 훅 EX. React-query )
│  │     ├─ model.ts (API 요청 및 상태 관리)
│  │     └─ types.ts (타입 정의)
│  ├─ features (특정 기능을 담당하는 UI & 데이터)
│  │  ├─ login
│  │  │  ├─ Login.tsx
│  │  │  ├─ model
│  │  │  │  ├─ api.ts
│  │  │  │  ├─ hooks.ts
│  │  │  │  └─ types.ts
│  │  │  └─ ui
│  │  │     └─ LoginForm.tsx
│  └─ shared (공통적으로 사용되는 요소들)
│     ├─ atoms (jotai 설정 파일)
│     ├─ config (설정 파일, 상수)
│     ├─ hooks (공통 훅)
│     ├─ lib (유틸리티 함수, helpers)
│     ├─ scripts (자동화 스크립트)
│     ├─ types (d.ts 파일)
│     └─ ui (공통 UI 컴포넌트)
├─ .env.development
├─ .env.production
├─ .eslintrc.json
├─ .prettierrc
├─ README.md
├─ next.config.ts
├─ package.json
├─ tsconfig.json
└─ yarn.lock
```
