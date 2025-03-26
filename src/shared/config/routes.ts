export const NAV_ITEMS = {
  // 홈: { name: '홈', path: '/' },
  브랜드: { name: '브랜드', path: '/brand' },
  실링팬: { name: '실링팬', path: '/ceiling-fan' },
  사전예약하기: {
    name: '사전예약하기',
    path: '/reservation',
  },
} as const;

export type NavItemsType = (typeof NAV_ITEMS)[keyof typeof NAV_ITEMS];
