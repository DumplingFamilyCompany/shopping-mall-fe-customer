import { useMemo } from 'react';
import {
  Controller,
  ControllerRenderProps,
  useForm,
  useWatch,
} from 'react-hook-form';
import useDebounce from '@/hooks/useDebounce';
import useModal from '@/hooks/useModal';
import { useUpdateMultiSelectResponseMutation } from '@/services/auth/queries/useUpdateMultiSelectResponseMutation';
import Check from '@/components/check/Check';
import { FieldObjectProps } from '@/components/form/form.context';
import Radio from '@/components/radio/Radio';
import Tag from '@/components/tag/Tag';
import SearchModal from '../SearchModal';

export type MultiSelectSearchModalProps = {
  selected?: FieldObjectProps[];
  handleChangeValue: Pick<ControllerRenderProps, 'onChange'>['onChange'];
};

const OwnersSearchModal = ({
  selected,
  handleChangeValue,
}: MultiSelectSearchModalProps) => {
  const { closeModal } = useModal();
  const { control, getValues } = useForm<{
    search: string;
    selected: { id: string; label: string }[];
  }>({
    defaultValues: {
      selected,
    },
  });
  const searchValue = useWatch({ control, name: 'search' });
  const debouncedValue = useDebounce({ value: searchValue });
  // const { data: postsData } = useGetPostsListQuery({ title: debouncedValue });
  const updateMultiSelectResponseMutation =
    useUpdateMultiSelectResponseMutation();

  const TEST_DATA = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `하${index + 2}`,
      tel: '010-1234-1234',
      site: `동덕여대 외 ${index + 4}개`,
      device: `GGCKUFO${index + 1} 외 ${index + 3}대`,
    }));
  }, []);

  const handleCompleteButton = () => {
    const selectedOwners = getValues('selected');

    handleChangeValue(selectedOwners);

    updateMultiSelectResponseMutation.mutate(
      { data: selectedOwners, type: 'owners' },
      {
        onSuccess: (res) => {
          if (res) {
            alert('성공');
            closeModal('OwnersSearchModal');
            return;
          }
          throw Error('error....');
        },
      },
    );
  };

  return (
    <SearchModal
      type="OwnersSearchModal"
      title="점주 검색"
      handleCompleteButton={handleCompleteButton}
    >
      <SearchModal.Search
        control={control}
        name="search"
        placeholder="이름, 연락처 검색"
      />
      <SearchModal.Header
        columnWidthArray={['120px', '166px', '166px', '208px']}
      >
        <p>점주 이름</p>
        <p>연락처</p>
        <p>운영 사이트</p>
        <p>보유 기기</p>
      </SearchModal.Header>
      <SearchModal.ScrollContainer isMultiSelect>
        <Check.CheckGroup>
          {TEST_DATA?.map((data) => (
            <Controller
              key={data.id}
              control={control}
              name="selected"
              render={({ field: { value = [], onChange } }) => {
                const isActive = !value?.length
                  ? false
                  : !!value?.filter((value) => value.id === String(data.id))
                      .length;

                return (
                  <SearchModal.Option
                    columnWidthArray={[
                      '120px',
                      '166px',
                      '166px',
                      '160px',
                      '48px',
                    ]}
                  >
                    <Check.Label inputId={String(data.id)}>
                      {data.name}
                    </Check.Label>
                    <Check.Label inputId={String(data.id)}>
                      {data.tel}
                    </Check.Label>
                    <Check.Label inputId={String(data.id)}>
                      {data.site}
                    </Check.Label>
                    <Check.Label inputId={String(data.id)}>
                      {data.device}
                    </Check.Label>
                    <Check.Indicator
                      name="owners"
                      id={String(data.id)}
                      value={String(data.id)}
                      checked={isActive}
                      onChange={(id) =>
                        isActive
                          ? onChange(value.filter((owner) => owner.id !== id))
                          : onChange([...value, { id, label: data.name }])
                      }
                    />
                  </SearchModal.Option>
                );
              }}
            />
          ))}
        </Check.CheckGroup>
      </SearchModal.ScrollContainer>
      <SearchModal.Tags>
        <Controller
          control={control}
          name="selected"
          render={({ field: { value = [], onChange } }) => {
            if (!value?.length) return <></>;

            return (
              <>
                {value.map((owner) => (
                  <Tag
                    key={owner.id}
                    id={owner.id}
                    label={owner.label}
                    onRemove={(id) =>
                      onChange(value.filter((owner) => owner.id !== id))
                    }
                  />
                ))}
              </>
            );
          }}
        />
      </SearchModal.Tags>
    </SearchModal>
  );
};

export default OwnersSearchModal;
