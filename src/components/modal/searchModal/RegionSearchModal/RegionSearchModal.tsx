import { Controller, useForm, useWatch } from 'react-hook-form';
import useDebounce from '@/hooks/useDebounce';
import useModal from '@/hooks/useModal';
import { useGetPostsListQuery } from '@/services/auth/queries/useGetPostsListQuery';
import { useUpdateSingleSelectResponseMutation } from '@/services/auth/queries/useUpdateSingleSelectResponseMutation';
import Radio from '@/components/radio/Radio';
import SearchModal from '../SearchModal';
import { SingleSelectSearchModalProps } from '../TradeTypeSearchModal/TradeTypeSearchModal';

const RegionSearchModal = ({
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
  const updateTradeTypeMutation = useUpdateSingleSelectResponseMutation();

  const handleCompleteButton = () => {
    const { id, label } = getValues('selected');

    handleChangeValue({ id, label });

    updateTradeTypeMutation.mutate(
      { data: { id, label }, type: 'region' },
      {
        onSuccess: (res) => {
          if (res) {
            alert('성공');
            closeModal('RegionSearchModal');
            return;
          }
          throw Error('error....');
        },
      },
    );
  };

  return (
    <SearchModal
      type="RegionSearchModal"
      title="지역 검색"
      handleCompleteButton={handleCompleteButton}
    >
      <SearchModal.Search
        control={control}
        name="search"
        placeholder="지역 코드, 지역명 검색"
      />
      <SearchModal.Header>
        <p>지역 코드</p>
        <p>지역명</p>
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

export default RegionSearchModal;
