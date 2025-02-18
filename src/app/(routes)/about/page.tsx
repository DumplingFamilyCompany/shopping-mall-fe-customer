'use client';

import { useGetUsers, useLogout } from '@/entities/auth/hooks';
import { Button } from '@/shared/ui/button/Button';

const AboutPage = () => {
  const useLogoutMutation = useLogout();
  const { data } = useGetUsers();

  const handleLogout = () => {
    useLogoutMutation.mutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
      },
    });
  };

  return (
    <div>
      <h1>로그인에 성공하신걸 축하드립니다!!!!!!</h1>
      <Button.Filled onClick={handleLogout}>로그아웃 시작</Button.Filled>
      <h2>유저 리스트는용~</h2>
      {data?.map((user) => (
        <div key={user.id}>
          id: {user.id}, name: {user.name}
        </div>
      ))}
    </div>
  );
};

export default AboutPage;
