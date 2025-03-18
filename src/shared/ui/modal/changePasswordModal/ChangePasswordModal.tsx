import { useForm } from 'react-hook-form';
import Button from '@/shared/ui/button/Button';
import Form from '@/shared/ui/form/Form';
import GuidanceMessage from '@/shared/ui/guidanceMessage/GuidanceMessage';
import Spacer from '@/shared/ui/spacer/Spacer';
import WatchComponent from '@/shared/ui/watchComponent/WatchComponent';
import Modal from '../Modal';

const ChangePasswordModal = () => {
  const { control, getValues } = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>();

  const handleCompleteButton = () => {
    alert('완료');
    console.log(getValues());
  };

  return (
    <Modal type="ChangePasswordModal" width="620px">
      <Modal.Title>비밀번호 변경</Modal.Title>
      <Modal.Content>
        <Form
          control={control}
          formFields={[
            {
              type: 'text',
              name: 'currentPassword',
              label: '현재 비밀번호',
              value: getValues('currentPassword'),
            },
            {
              type: 'text',
              name: 'newPassword',
              label: '새 비밀번호',
              value: getValues('newPassword'),
            },
            {
              type: 'text',
              name: 'confirmPassword',
              label: '새 비밀번호 확인',
              value: getValues('confirmPassword'),
            },
          ]}
        />
        <Spacer />
        <GuidanceMessage>
          다른 아이디/사이트에서 사용한 적 없는 비밀번호, 이전에 사용한 적 없는
          비밀번호가 안전합니다.
        </GuidanceMessage>
        <Spacer height="30px" />
      </Modal.Content>
      <Modal.Footer>
        <WatchComponent.Multiple
          control={control}
          name={['currentPassword', 'newPassword', 'confirmPassword']}
          render={(values) => {
            const disabled = !!values.filter((value) => !value).length;

            return (
              <Button
                width="200px"
                onClick={handleCompleteButton}
                disabled={disabled}
              >
                선택 완료
              </Button>
            );
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
