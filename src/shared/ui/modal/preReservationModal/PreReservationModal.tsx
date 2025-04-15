import { Controller, useForm } from 'react-hook-form';
import Spacer from '@/shared/ui/spacer/Spacer';
import Button from '../../button/Button';
import TextInput from '../../input/TextInput';
import Select from '../../select/Select';
import { SelectedValue } from '../../select/select.context';
import Typography from '../../typography/Typography';
import WatchComponent from '../../watchComponent/WatchComponent';
import Modal from '../Modal';
import styles from './PreReservationModal.module.scss';

const PreReservationModal = () => {
  const modalSelectButtonProps = {
    height: '88px',
    textColor: '#000000',
    borderColor: '#E5E5E5',
    borderTop: true,
    borderLeft: true,
    borderRight: true,
    borderBottom: true,
  };

  const timeOptions = Array.from({ length: 10 }, (_, index) => {
    const hour = index + 9 < 10 ? `0${index + 9}` : index + 9;
    return {
      label: `${hour}:00`,
      value: `${hour}:00`,
    };
  });

  const { control, getValues } = useForm<{
    name: string;
    tel: string;
    address: string;
    preferredConsultationTime: SelectedValue;
    selectedModel: string;
  }>();

  const handleCompleteButton = () => {
    alert('완료');
    console.log(getValues());
  };

  return (
    <Modal
      type="PreReservationModal"
      width="clamp(33.75rem, calc(15.534rem + 48.576vw), 108.8rem)"
    >
      <Modal.Title>사전예약신청하기</Modal.Title>
      <Modal.Content>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <div className={styles.formRowContainer}>
              <TextInput.Label description="성함을 입력해주세요." required>
                이름
              </TextInput.Label>
              <TextInput.Field width="100%" value={value} onChange={onChange} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="tel"
          render={({ field: { value, onChange } }) => (
            <div className={styles.formRowContainer}>
              <TextInput.Label
                description="상담이 가능한 연락처를 알려주세요."
                required
              >
                연락처
              </TextInput.Label>
              <TextInput.Field
                width="100%"
                value={value}
                onChange={onChange}
                onlyNumbers
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field: { value, onChange } }) => (
            <div className={styles.formRowContainer}>
              <TextInput.Label
                description="시공하려는 아파트 주소를 알려주세요."
                required
              >
                주소
              </TextInput.Label>
              <TextInput.Field width="100%" value={value} onChange={onChange} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="preferredConsultationTime"
          render={({ field: { value: selected, onChange } }) => (
            <Select value={selected} onChange={onChange} width="100%">
              <Select.Label>
                <Typography
                  fontSize="24px"
                  fontWeight="bold"
                  marginBottom="17px"
                >
                  상담 희망 시간
                </Typography>
              </Select.Label>
              <Select.Trigger placeholder="원하는 상담 시간을 선택해주세요.">
                <Select.Dropdown>
                  <Select.OptionList>
                    {timeOptions.map((time) => (
                      <Select.Option
                        key={time.value}
                        label={time.label}
                        value={time.value}
                        isActive={selected?.value === time.value}
                      />
                    ))}
                  </Select.OptionList>
                </Select.Dropdown>
              </Select.Trigger>
            </Select>
          )}
        />
        <Spacer height="clamp(5rem, calc(2.112rem + 7.702vw), 16.9rem)" />
        <Controller
          control={control}
          name="selectedModel"
          render={({ field: { value, onChange } }) => (
            <>
              <Typography fontSize="24px" fontWeight="bold" marginBottom="24px">
                원하시는 모델 선택
              </Typography>
              <div className={styles.modelSelectorGrid}>
                <Button
                  {...modalSelectButtonProps}
                  variant={value === '에어로웨이 엘리' ? 'yellow' : 'border'}
                  onClick={(e) => onChange(e.currentTarget.innerText)}
                >
                  에어로웨이 엘리
                </Button>
                <Button
                  {...modalSelectButtonProps}
                  variant={value === '에어로웨이 실프' ? 'yellow' : 'border'}
                  onClick={(e) => onChange(e.currentTarget.innerText)}
                >
                  에어로웨이 실프
                </Button>
                <Button
                  {...modalSelectButtonProps}
                  variant={
                    value === '에어로웨이 스틸브로라인' ? 'yellow' : 'border'
                  }
                  onClick={(e) => onChange(e.currentTarget.innerText)}
                >
                  에어로웨이 스틸브로라인
                </Button>
                <Button
                  {...modalSelectButtonProps}
                  variant={value === '에어로웨이' ? 'yellow' : 'border'}
                  onClick={(e) => onChange(e.currentTarget.innerText)}
                >
                  에어로웨이
                </Button>
              </div>
            </>
          )}
        />
      </Modal.Content>
      <Modal.Footer>
        <WatchComponent.Multiple
          control={control}
          name={[
            'name',
            'tel',
            'address',
            'preferredConsultationTime.value',
            'selectedModel',
          ]}
          render={(values) => {
            const disabled = !!values.filter((value) => !value).length;

            return (
              <Button
                height="88px"
                onClick={handleCompleteButton}
                disabled={disabled}
                borderColor="#707070"
                borderTop
                borderBottom
                borderLeft
                borderRight
              >
                접수하기
              </Button>
            );
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default PreReservationModal;
