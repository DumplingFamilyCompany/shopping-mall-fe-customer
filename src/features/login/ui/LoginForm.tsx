'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/shared/ui/button/Button';

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  return (
    <div>
      <Link href="/api/auth/kakao">
        <Button>카카오 로그인</Button>
      </Link>
    </div>
  );
};

export default LoginForm;
