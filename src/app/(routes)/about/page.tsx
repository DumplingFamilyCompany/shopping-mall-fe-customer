'use client';

import Link from 'next/link';
import { useDeleteToken } from '@/entities/auth/hooks';
import { authAPI } from '@/entities/auth/model';
import { useGetUsers } from '@/entities/user/hooks';
import { Button } from '@/shared/ui/button/Button';

const AboutPage = () => {
  const useDeleteTokenMutation = useDeleteToken();
  const { data } = useGetUsers({ page: 0, size: 20 });

  const handleLogout = () => {
    useDeleteTokenMutation.mutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
      },
    });
  };

  return (
    <div>
      <h1>로그인에 성공하신걸 축하드립니다!!!!!!</h1>
      <Link href="/api/auth/kakao">
        <Button.Filled>카카오 로그인 요청</Button.Filled>
      </Link>

      <Button.Filled onClick={handleLogout}>로그아웃 시작</Button.Filled>
      <h2>유저 리스트는용~</h2>
      {data?._embedded.users.map((user) => (
        <div key={user.userId}>
          id: {user.userId}, name: {user.username}
        </div>
      ))}
    </div>
  );
};

export default AboutPage;
