'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin } from '@/entities/auth/hooks';
import { Button } from '@/shared/ui/button/Button';

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const useLoginMutation = useLogin();

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

export default LoginPage;
