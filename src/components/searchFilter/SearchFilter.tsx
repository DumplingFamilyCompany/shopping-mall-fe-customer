import { useState } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import useDebounce from '@/hooks/useDebounce';
import { useGetPostsListQuery } from '@/services/auth/queries/useGetPostsListQuery';
import FlexBox from '../flexBox/FlexBox';
import Radio from '../radio/Radio';
import Select from '../select/Select';

const MANDU_OPTION_LIST = [
  { label: '전체', id: '전체' },
  { label: '김치만두', id: '김치만두' },
  { label: '고기만두', id: '고기만두' },
  { label: '새우만두', id: '새우만두' },
  { label: '군만두', id: '군만두' },
  { label: '그럴만두', id: '그럴만두' },
  { label: '저럴만두', id: '저럴만두' },
];

const GAME_OPTION_LIST = [
  { label: '전체', id: '전체' },
  { label: '리그', id: '리그' },
  { label: '오브', id: '오브' },
  { label: '레전드', id: '레전드' },
  { label: 'WoW', id: 'WoW' },
  { label: '오버워치', id: '오버워치' },
];

const DEVICE_TYPE_OPTION_LIST = [
  { id: '냉동', label: '냉동' },
  { id: '냉장', label: '냉장' },
  { id: '라면', label: '라면' },
  { id: '커피', label: '커피' },
];

const DEVICE_STATUS_OPTION_LIST = [
  { id: '정상', label: '정상' },
  { id: '이상', label: '이상' },
];

type SearchFilterProps<TFieldValues extends FieldValues> = {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
};

const TradeType = <TFieldValues extends FieldValues>({
  control,
  name,
}: SearchFilterProps<TFieldValues>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce({
    value: searchValue,
  });
  const { data } = useGetPostsListQuery({ site: debouncedValue });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Select
          value={{
            label: value?.label || '',
            value: value?.id || '',
          }}
          onChange={(selected) =>
            onChange({ id: selected.value, label: selected.label })
          }
          onClose={() => setSearchValue('')}
          hasLabel
        >
          <Select.Label>상권유형</Select.Label>
          <Select.Trigger placeholder={value?.label || '전체'}>
            <Select.Dropdown>
              <Select.SearchBar
                value={searchValue}
                placeholder="상품명, 상품코드 검색"
                onChange={setSearchValue}
              />
              <Select.OptionList>
                {MANDU_OPTION_LIST.map((option) => {
                  return (
                    <Select.Option
                      key={option.id}
                      label={option.label}
                      value={option.id}
                      isActive={option.id === value?.id}
                    />
                  );
                })}
              </Select.OptionList>
            </Select.Dropdown>
          </Select.Trigger>
        </Select>
      )}
    />
  );
};

const Region = <TFieldValues extends FieldValues>({
  control,
  name,
}: SearchFilterProps<TFieldValues>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce({
    value: searchValue,
  });
  const { data } = useGetPostsListQuery({ site: debouncedValue });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Select
          value={{
            label: value?.label || '',
            value: value?.id || '',
          }}
          onChange={(selected) =>
            onChange({ id: selected.value, label: selected.label })
          }
          onClose={() => setSearchValue('')}
          hasLabel
        >
          <Select.Label>지역</Select.Label>
          <Select.Trigger placeholder={value?.label || '전체'}>
            <Select.Dropdown>
              <Select.SearchBar
                value={searchValue}
                placeholder="지역 코드, 지역명 검색"
                onChange={setSearchValue}
              />
              <Select.OptionList>
                {GAME_OPTION_LIST.map((option) => (
                  <Select.Option
                    key={option.id}
                    label={option.label}
                    value={option.id}
                    isActive={option.id === value?.id}
                  />
                ))}
              </Select.OptionList>
            </Select.Dropdown>
          </Select.Trigger>
        </Select>
      )}
    />
  );
};

const Site = <TFieldValues extends FieldValues>({
  control,
  name,
}: SearchFilterProps<TFieldValues>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce({
    value: searchValue,
  });
  const { data } = useGetPostsListQuery({ site: debouncedValue });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Select
          value={{
            label: value?.label || '',
            value: value?.id || '',
          }}
          onChange={(selected) =>
            onChange({ id: selected.value, label: selected.label })
          }
          onClose={() => setSearchValue('')}
          hasLabel
        >
          <Select.Label>사이트</Select.Label>
          <Select.Trigger placeholder={value?.label || '전체'}>
            <Select.Dropdown>
              <Select.SearchBar
                value={searchValue}
                placeholder="사이트 코드, 사이트명 검색"
                onChange={setSearchValue}
              />
              <Select.OptionList>
                {MANDU_OPTION_LIST.map((option) => (
                  <Select.Option
                    key={option.id}
                    label={option.label}
                    value={option.id}
                    isActive={option.id === value?.id}
                  />
                ))}
              </Select.OptionList>
            </Select.Dropdown>
          </Select.Trigger>
        </Select>
      )}
    />
  );
};

const Device = <TFieldValues extends FieldValues>({
  control,
  name,
}: SearchFilterProps<TFieldValues>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce({
    value: searchValue,
  });
  const { data } = useGetPostsListQuery({ site: debouncedValue });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Select
          value={{
            label: value?.label || '',
            value: value?.id || '',
          }}
          onChange={(selected) =>
            onChange({ id: selected.value, label: selected.label })
          }
          onClose={() => setSearchValue('')}
          hasLabel
        >
          <Select.Label>기기종류</Select.Label>
          <Select.Trigger placeholder={value?.label || '전체'}>
            <Select.Dropdown>
              <Select.SearchBar
                value={searchValue}
                placeholder="기기 코드, 기기명 검색"
                onChange={setSearchValue}
              />
              <Select.OptionList>
                {GAME_OPTION_LIST.map((option) => (
                  <Select.Option
                    key={option.id}
                    label={option.label}
                    value={option.id}
                    isActive={option.id === value?.id}
                  />
                ))}
              </Select.OptionList>
            </Select.Dropdown>
          </Select.Trigger>
        </Select>
      )}
    />
  );
};

const DeviceTypeRadio = <TFieldValues extends FieldValues>({
  control,
  name,
  includeAll = false,
}: SearchFilterProps<TFieldValues> & { includeAll?: boolean }) => {
  const { data } = useGetPostsListQuery({});

  return (
    <Radio.RadioGroup>
      <FlexBox gap="40px">
        {includeAll && (
          <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
              <FlexBox gap="16px">
                <Radio.Indicator
                  name={name}
                  id={`${name}all`}
                  value="all"
                  checked={value === 'all'}
                  onChange={onChange}
                />
                <Radio.Label inputId={`${name}all`}>전체</Radio.Label>
              </FlexBox>
            )}
          />
        )}
        {DEVICE_TYPE_OPTION_LIST?.map((data) => (
          <Controller
            key={data.id}
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
              <FlexBox gap="16px">
                <Radio.Indicator
                  name={name}
                  id={data.id}
                  value={data.id}
                  checked={value === data.id}
                  onChange={onChange}
                />
                <Radio.Label inputId={data.id}>{data.label}</Radio.Label>
              </FlexBox>
            )}
          />
        ))}
      </FlexBox>
    </Radio.RadioGroup>
  );
};

const DeviceStatusRadio = <TFieldValues extends FieldValues>({
  control,
  name,
  includeAll = false,
}: SearchFilterProps<TFieldValues> & { includeAll?: boolean }) => {
  const { data } = useGetPostsListQuery({});

  return (
    <Radio.RadioGroup>
      <FlexBox gap="40px">
        {includeAll && (
          <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
              <FlexBox gap="16px">
                <Radio.Indicator
                  name={name}
                  id={`${name}all`}
                  value="all"
                  checked={value === 'all'}
                  onChange={onChange}
                />
                <Radio.Label inputId={`${name}all`}>전체</Radio.Label>
              </FlexBox>
            )}
          />
        )}
        {DEVICE_STATUS_OPTION_LIST?.map((data) => (
          <Controller
            key={data.id}
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
              <FlexBox gap="16px">
                <Radio.Indicator
                  name={name}
                  id={data.id}
                  value={data.id}
                  checked={value === data.id}
                  onChange={onChange}
                />
                <Radio.Label inputId={data.id}>{data.label}</Radio.Label>
              </FlexBox>
            )}
          />
        ))}
      </FlexBox>
    </Radio.RadioGroup>
  );
};

export const SearchFilter = {
  TradeType,
  Region,
  Site,
  Device,
  DeviceTypeRadio,
  DeviceStatusRadio,
};
