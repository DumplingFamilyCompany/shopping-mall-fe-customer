'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSetToken } from '@/entities/auth/hooks';
import { Button } from '@/shared/ui/button/Button';

const LoginButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const useLoginMutation = useSetToken();

  const handleLogin = () => {
    useLoginMutation.mutate(
      { accessToken: 'accessToken', refreshToken: 'refreshToken' },
      {
        onSuccess: (res) => {
          console.log(res);
          router.push(redirect);
        },
        onError: (err) => {
          console.error(err);
          alert('로그인 실패');
        },
      },
    );
  };

  return (
    <div>
      <Button.Filled onClick={handleLogin}>로그인 시작</Button.Filled>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense>
      <LoginButton />
    </Suspense>
  );
};

export default LoginPage;
