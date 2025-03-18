'use client';

import { useState } from 'react';
import { useDeleteToken } from '@/entities/auth/hooks';
import { useGetUserDetail, useGetUserList } from '@/entities/user/hooks';
import { PaymentStatus } from '@/shared/types/payment';
import Button from '@/shared/ui/button/Button';
import PaymentButton from '@/shared/ui/paymentButton/PaymentButton';

const AboutPage = () => {
  const useDeleteTokenMutation = useDeleteToken();
  const [paymentStatus, setPaymentStatus] = useState<{
    status: PaymentStatus;
    errorMessage?: string;
  }>({ status: 'IDLE' });

  const { data } = useGetUserList();
  const { data: userDetailData } = useGetUserDetail({ id: 1 });

  const handleLogout = () => {
    useDeleteTokenMutation.mutate(undefined, {
      onSuccess: (res) => {
        console.log(res);
      },
    });
  };

  return (
    <div>
      <h2>유저 리스트는용~</h2>
      {data?.map((user) => (
        <div key={user.username}>
          id: {user.id}, name: {user.username}
        </div>
      ))}
      <br />
      <h2>
        상세 유저는용 <br />
        name: {userDetailData?.username}
        provider: {userDetailData?.providerType}
      </h2>
      <br />
      <PaymentButton
        itemId="id"
        itemName="name"
        itemPrice={20000}
        paymentMethod="CARD"
        paymentStatus={paymentStatus}
        onPaymentStatusChange={setPaymentStatus}
      />
      <Button onClick={handleLogout}>로그아웃 시작</Button>
    </div>
  );
};

export default AboutPage;
