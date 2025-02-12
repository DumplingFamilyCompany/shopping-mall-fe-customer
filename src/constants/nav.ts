export const NAV_ITEMS = {
  홈: { name: '홈', path: '/', children: {}, visible: true },
  운영구역: {
    name: '운영 구역',
    path: '/operation-area',
    children: {
      상권유형: { name: '상권유형 관리', path: '/trade-type' },
      지역: { name: '지역 관리', path: '/region' },
      사이트: { name: '사이트 관리', path: '/site' },
    },
    visible: true,
  },
  점주: { name: '점주', path: '/owners', children: {}, visible: true },
  기기: { name: '기기', path: '/devices', children: {}, visible: true },
  매출: { name: '매출', path: '/sales', children: {}, visible: true },
  상품: { name: '상품', path: '/products', children: {}, visible: true },
  '어드민 관리자 설정': {
    name: '어드민 관리자 설정',
    path: '/admin-settings',
    children: {},
    visible: true,
  },
  '내 정보': {
    name: '내 정보',
    path: '/profile',
    children: {},
    visible: false,
  },
} as const;

export type NavItemsType = (typeof NAV_ITEMS)[keyof typeof NAV_ITEMS];
