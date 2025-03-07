'use client';

import { useGetMyProfile } from '@/entities/user/hooks';

const MyPage = () => {
  const { data } = useGetMyProfile();

  console.log(data?.body.user);

  return <div>My Page</div>;
};

export default MyPage;
