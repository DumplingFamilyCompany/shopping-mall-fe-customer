import { Suspense } from 'react';
import LoginForm from '@/features/login/ui/LoginForm';

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
