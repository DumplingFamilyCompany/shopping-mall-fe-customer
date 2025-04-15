'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSetToken } from '@/entities/auth/hooks';

const OauthRedirectContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const setTokenMutation = useSetToken();

  useEffect(() => {
    if (!token) return;

    setTokenMutation.mutate(
      { accessToken: token, refreshToken: '' },
      {
        onSuccess: (res) => {
          console.log(res);

          //   router.push('/mypage');
        },
        onError: (err) => {
          console.error(err);
          alert('토큰 저장 실패');
        },
      },
    );
  }, []);

  return (
    <div>
      Oauth Redirect Page
      <div>token: {token}</div>
    </div>
  );
};

const OauthRedirectPage = () => {
  return (
    <Suspense>
      <OauthRedirectContent />
    </Suspense>
  );
};

export default OauthRedirectPage;
