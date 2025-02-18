'use client';

import { useLogin, useLogout } from '@/entities/auth/hooks';
import { Button } from '@/shared/ui/button/Button';

const LoginPage = () => {
  const useLoginMutation = useLogin();

  const handleLogin = () => {
    useLoginMutation.mutate(
      { accessToken: 'accessToken', refreshToken: 'refreshToken' },
      {
        onSuccess: (res) => {
          console.log(res);
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
