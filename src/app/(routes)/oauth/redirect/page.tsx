'use client';

import { useSearchParams } from 'next/navigation';

const OauthRedirectPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      Oauth Redirect Page
      <div>token: {token}</div>
    </div>
  );
};

export default OauthRedirectPage;
