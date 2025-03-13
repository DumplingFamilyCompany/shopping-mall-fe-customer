import { createRandomId } from '@/shared/lib/createRandomId';
import { PaymentMethod, PaymentStatus } from '@/shared/types/payment';
import { Currency } from '@portone/browser-sdk/dist/v2/entity';
import PortOne from '@portone/browser-sdk/v2';
import { Button } from '../button/Button';
import styles from './paymentButton.module.scss';

type PaymentButtonProps = {
  itemId: string;
  itemName: string;
  itemPrice: number;
  currency?: Currency;
  paymentMethod: PaymentMethod;
  paymentStatus: {
    status: PaymentStatus;
    errorMessage?: string;
  };
  onPaymentStatusChange: (status: {
    status: PaymentStatus;
    errorMessage?: string;
  }) => void;
  onPaymentSuccess?: (response: unknown) => void;
  onPaymentError?: (error: unknown) => void;
};

const PaymentButton = ({
  itemId,
  itemName,
  itemPrice,
  currency = 'CURRENCY_KRW',
  paymentMethod,
  paymentStatus,
  onPaymentStatusChange,
  onPaymentSuccess,
  onPaymentError,
}: PaymentButtonProps) => {
  const handleSubmit = async () => {
    onPaymentStatusChange?.({ status: 'PENDING' });

    const paymentId = createRandomId();
    const payment = await PortOne.requestPayment({
      storeId: 'store-e4038486-8d83-41a5-acf1-844a009e0d94',
      channelKey: 'channel-key-4ca6a942-3ee0-48fb-93ef-f4294b876d28',
      paymentId,
      orderName: itemName,
      totalAmount: itemPrice,
      currency,
      payMethod: paymentMethod,
      customData: {
        item: itemId,
      },
    });

    // 반환 값에 code가 있는 경우 오류
    if (!!payment?.code) {
      onPaymentStatusChange?.({
        status: 'FAILED',
        errorMessage: payment.message,
      });
      return;
    }

    const completeResponse = await fetch('/api/payment/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId: payment?.paymentId,
      }),
    });

    if (completeResponse.ok) {
      const paymentComplete = await completeResponse.json();

      onPaymentStatusChange?.({
        status: paymentComplete.status,
      });
      return;
    }

    onPaymentStatusChange?.({
      status: 'FAILED',
      errorMessage: await completeResponse.text(),
    });
  };

  return (
    <div>
      결제 상태: {paymentStatus.status}
      에러 메시지: {paymentStatus.errorMessage}
      <br />
      <button
        type="button"
        aria-busy={paymentStatus.status !== 'IDLE'}
        disabled={paymentStatus.status !== 'IDLE'}
        onClick={handleSubmit}
      >
        결제
      </button>
    </div>
  );
};

export default PaymentButton;
