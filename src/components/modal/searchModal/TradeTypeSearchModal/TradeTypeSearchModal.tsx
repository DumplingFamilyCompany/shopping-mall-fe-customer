import {
  Controller,
  ControllerRenderProps,
  useForm,
  useWatch,
} from 'react-hook-form';
import useDebounce from '@/hooks/useDebounce';
import useModal from '@/hooks/useModal';
import { useGetPostsListQuery } from '@/services/auth/queries/useGetPostsListQuery';
import { useUpdateSingleSelectResponseMutation } from '@/services/auth/queries/useUpdateSingleSelectResponseMutation';
import { FieldObjectProps } from '@/components/form/form.context';
import Radio from '@/components/radio/Radio';
import SearchModal from '../SearchModal';

export type SingleSelectSearchModalProps = {
  selected?: FieldObjectProps;
  handleChangeValue: Pick<ControllerRenderProps, 'onChange'>['onChange'];
};

const TradeTypeSearchModal = ({
  selected,
  handleChangeValue,
}: SingleSelectSearchModalProps) => {
  const { closeModal } = useModal();
  const { control, getValues } = useForm<{
    search: string;
    selected: { id: string; label: string };
  }>({
    defaultValues: {
      selected,
    },
  });
  const searchValue = useWatch({ control, name: 'search' });
  const debouncedValue = useDebounce({ value: searchValue });
  const { data: postsData } = useGetPostsListQuery({ site: debouncedValue });
  const updateSingleSelectResponseMutation =
    useUpdateSingleSelectResponseMutation();

  const handleCompleteButton = () => {
    const { id, label } = getValues('selected');

    handleChangeValue({ id, label });

    updateSingleSelectResponseMutation.mutate(
      { data: { id, label }, type: 'trade-type' },
      {
        onSuccess: (res) => {
          if (res) {
            alert('성공');
            closeModal('TradeTypeSearchModal');
            return;
          }
          throw Error('error....');
        },
      },
    );
  };

  return (
    <SearchModal
      type="TradeTypeSearchModal"
      title="상권유형 검색"
      handleCompleteButton={handleCompleteButton}
    >
      <SearchModal.Search
        control={control}
        name="search"
        placeholder="상권유형 코드, 상권유형명 검색"
      />
      <SearchModal.Header>
        <p>상권유형 코드</p>
        <p>상권유형명</p>
      </SearchModal.Header>
      <SearchModal.ScrollContainer>
        <Radio.RadioGroup>
          {postsData?.map((data) => (
            <Controller
              key={data.id}
              control={control}
              name="selected"
              render={({ field: { value, onChange } }) => (
                <SearchModal.Option>
                  <Radio.Label inputId={String(data.id)}>{data.id}</Radio.Label>
                  <Radio.Label inputId={String(data.id)}>
                    {data.title}
                  </Radio.Label>
                  <Radio.Indicator
                    name="greeting"
                    id={String(data.id)}
                    value={String(data.id)}
                    checked={value?.id === String(data.id)}
                    onChange={() =>
                      onChange({ id: String(data.id), label: data.title })
                    }
                  />
                </SearchModal.Option>
              )}
            />
          ))}
        </Radio.RadioGroup>
      </SearchModal.ScrollContainer>
    </SearchModal>
  );
};

export default TradeTypeSearchModal;
