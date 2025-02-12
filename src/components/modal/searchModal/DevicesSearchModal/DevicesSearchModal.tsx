import { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import useDebounce from '@/hooks/useDebounce';
import useModal from '@/hooks/useModal';
import { useUpdateMultiSelectResponseMutation } from '@/services/auth/queries/useUpdateMultiSelectResponseMutation';
import Check from '@/components/check/Check';
import { FieldObjectProps } from '@/components/form/form.context';
import Radio from '@/components/radio/Radio';
import Tag from '@/components/tag/Tag';
import { MultiSelectSearchModalProps } from '../OwnersSearchModal/OwnersSearchModal';
import SearchModal from '../SearchModal';

const DevicesSearchModal = ({
  selected,
  handleChangeValue,
}: MultiSelectSearchModalProps) => {
  const { closeModal } = useModal();
  const { control, getValues } = useForm<{
    search: string;
    selected: FieldObjectProps[];
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
      code: `SUSMUF0${index + 2}`,
      name: `홍길${index + 4}`,
    }));
  }, []);

  const handleCompleteButton = () => {
    const selectedDevices = getValues('selected');

    handleChangeValue(selectedDevices);

    updateMultiSelectResponseMutation.mutate(
      { data: selectedDevices, type: 'devices' },
      {
        onSuccess: (res) => {
          if (res) {
            alert('성공');
            closeModal('DevicesSearchModal');
            return;
          }
          throw Error('error....');
        },
      },
    );
  };

  return (
    <SearchModal
      type="DevicesSearchModal"
      title="기기 검색"
      handleCompleteButton={handleCompleteButton}
    >
      <SearchModal.Search
        control={control}
        name="search"
        placeholder="기기 코드, 점주 검색"
      />
      <SearchModal.Header columnWidthArray={['150px', 'auto']}>
        <p>기기 코드</p>
        <p>점주</p>
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
                    columnWidthArray={['150px', '462px', '48px']}
                  >
                    <Check.Label inputId={String(data.id)}>
                      {data.code}
                    </Check.Label>
                    <Check.Label inputId={String(data.id)}>
                      {data.name}
                    </Check.Label>
                    <Check.Indicator
                      name="devices"
                      id={String(data.id)}
                      value={String(data.id)}
                      checked={isActive}
                      onChange={(id) =>
                        isActive
                          ? onChange(value.filter((device) => device.id !== id))
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
                {value.map((device) => (
                  <Tag
                    key={device.id}
                    id={device.id}
                    label={device.label}
                    onRemove={(id) =>
                      onChange(value.filter((device) => device.id !== id))
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

export default DevicesSearchModal;
