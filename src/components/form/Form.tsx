import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import useModal from '@/hooks/useModal';
import { Button } from '../button/Button';
import ContentFrame from '../contentFrame/ContentFrame';
import FlexBox from '../flexBox/FlexBox';
import TextInput from '../input/TextInput';
import { ModalTypes } from '../modal/modal.types';
import Radio from '../radio/Radio';
import Tag from '../tag/Tag';
import {
  CreateEditFormType,
  FieldObjectProps,
  FormFieldContext,
  FormFieldsProps,
  FormFieldType,
  useFormFieldContext,
} from './form.context';
import styles from './form.module.scss';

const Form = <TFieldValues extends FieldValues, TType extends FormFieldType>({
  control,
  formFields,
  readOnly,
}: CreateEditFormType<TFieldValues, TType>) => {
  const { openModal } = useModal();

  const handleOpenModal = ({
    modalType,
    selected,
    onChange,
  }: {
    modalType?: ModalTypes;
    selected?: TFieldValues[FieldPath<TFieldValues>];
    onChange: Pick<ControllerRenderProps, 'onChange'>['onChange'];
  }) => {
    if (!modalType) return;

    openModal({
      modalType,
      modalProps: {
        handleChangeValue: onChange,
        selected,
      },
    });
  };

  return (
    <FormFieldContext.Provider value={{ onOpenModal: handleOpenModal }}>
      <ContentFrame.BoxShadowContainer>
        {formFields.map((field) => (
          <ContentFrame.RowContainer key={field.name}>
            <ContentFrame.RowContainer.Label>
              {field.label}
            </ContentFrame.RowContainer.Label>
            <FieldRenderer
              field={field}
              readOnly={readOnly}
              control={control}
            />
          </ContentFrame.RowContainer>
        ))}
      </ContentFrame.BoxShadowContainer>
    </FormFieldContext.Provider>
  );
};

const FieldRenderer = <
  TFieldValues extends FieldValues,
  TType extends FormFieldType,
>({
  control,
  field,
  readOnly,
}: {
  control: Control<TFieldValues>;
  field: FormFieldsProps<TFieldValues, TType>;
  readOnly?: boolean;
}) => {
  switch (field.type) {
    case 'text':
      return <TextField control={control} field={field} readOnly={readOnly} />;
    case 'singleSelect':
      return (
        <SingleSelectField
          control={control}
          field={field}
          readOnly={readOnly}
        />
      );
    case 'multiSelect':
      return (
        <MultiSelectField control={control} field={field} readOnly={readOnly} />
      );
    case 'radio':
      return <RadioField control={control} field={field} readOnly={readOnly} />;
  }
};

const TextField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  field,
  readOnly,
}: {
  control: Control<TFieldValues>;
  field: FormFieldsProps<TFieldValues, 'text'>;
  readOnly?: boolean;
}) => {
  if (readOnly) {
    return field.value;
  }

  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: { value, onChange } }) => (
        <TextInput.Field
          width="100%"
          value={value}
          onChange={onChange}
          disabled={field.disabled}
        />
      )}
    />
  );
};

const SingleSelectField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  field,
  readOnly,
}: {
  control: Control<TFieldValues>;
  field: FormFieldsProps<TFieldValues, 'singleSelect'>;
  readOnly?: boolean;
}) => {
  const { onOpenModal } = useFormFieldContext();

  if (readOnly) {
    return field.value?.label;
  }

  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: { value, onChange } }) => {
        if (!value?.id) {
          return (
            <Button.Filled
              iconName="add"
              width="98px"
              height="40px"
              onClick={() =>
                onOpenModal?.({ modalType: field.modalType, onChange })
              }
            >
              선택
            </Button.Filled>
          );
        }

        return (
          <div className={styles.selectFieldContainer}>
            {value?.label}
            <Button.Filled
              width="78px"
              height="40px"
              onClick={() =>
                onOpenModal?.({
                  modalType: field.modalType,
                  selected: value,
                  onChange,
                })
              }
            >
              변경
            </Button.Filled>
          </div>
        );
      }}
    />
  );
};

const MultiSelectField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  field,
  readOnly,
}: {
  control: Control<TFieldValues>;
  field: FormFieldsProps<TFieldValues, 'multiSelect'>;
  readOnly?: boolean;
}) => {
  const { onOpenModal } = useFormFieldContext();

  if (readOnly) {
    return field.value
      ?.reduce<string[]>((acc, curr) => [...acc, curr.label], [])
      .join(', ');
  }

  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: { value, onChange } }) => {
        if (!value?.length) {
          return (
            <Button.Filled
              iconName="add"
              width="98px"
              height="40px"
              onClick={() =>
                onOpenModal?.({ modalType: field.modalType, onChange })
              }
            >
              선택
            </Button.Filled>
          );
        }

        return (
          <div className={styles.selectFieldContainer}>
            <div className={styles.tagsContainer}>
              {value.map((selected: FieldObjectProps) => (
                <Tag
                  key={selected.id}
                  label={selected.label}
                  id={selected.id}
                  onRemove={(id) =>
                    onChange(
                      value.filter(
                        (owner: FieldObjectProps) => owner.id !== id,
                      ),
                    )
                  }
                />
              ))}
            </div>
            <Button.Filled
              width="78px"
              height="40px"
              onClick={() =>
                onOpenModal?.({
                  modalType: field.modalType,
                  selected: value,
                  onChange,
                })
              }
            >
              변경
            </Button.Filled>
          </div>
        );
      }}
    />
  );
};

const RadioField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  field,
  readOnly,
}: {
  control: Control<TFieldValues>;
  field: FormFieldsProps<TFieldValues, 'radio'>;
  readOnly?: boolean;
}) => {
  if (readOnly) {
    return field.value?.label;
  }

  return (
    <Controller
      control={control}
      name={field.name}
      render={({ field: { value, onChange } }) => (
        <Radio.RadioGroup>
          <FlexBox gap="40px">
            {field.options.map((option) => (
              <FlexBox gap="16px" key={option.id}>
                <Radio.Indicator
                  id={option.id}
                  name={field.name}
                  value={option.id}
                  checked={value.id === option.id}
                  onChange={(value) =>
                    onChange({ id: value, label: option.label })
                  }
                />
                <Radio.Label inputId={option.id}>{option.label}</Radio.Label>
              </FlexBox>
            ))}
          </FlexBox>
        </Radio.RadioGroup>
      )}
    />
  );
};

Form.TextField = TextField;
Form.SingleSelectField = SingleSelectField;
Form.MultiSelectField = MultiSelectField;
Form.RadioField = RadioField;

export default Form;
