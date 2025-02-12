import { createContext, useContext } from 'react';
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { ModalTypes } from '../modal/modal.types';

export type FormFieldType = 'text' | 'singleSelect' | 'multiSelect' | 'radio';

export type FormFieldsProps<
  TFieldValues extends FieldValues,
  TType extends FormFieldType,
> = {
  name: FieldPath<TFieldValues>;
  label: string;
  modalType?: ModalTypes;
  disabled?: boolean;
} & FieldTypeProps<TType>;

export type FieldTypeProps<TType extends string> = TType extends 'text'
  ? TextFieldProps
  : TType extends 'singleSelect'
    ? SingleSelectFieldProps
    : TType extends 'multiSelect'
      ? MultiSelectFieldProps
      : RadioFieldProps;

export type TextFieldProps = {
  type: 'text';
  value?: string;
};

export type FieldObjectProps = {
  id: string;
  label: string;
};

export type SingleSelectFieldProps = {
  type: 'singleSelect';
  value?: FieldObjectProps;
};

export type MultiSelectFieldProps = {
  type: 'multiSelect';
  value?: FieldObjectProps[];
};

export type RadioFieldProps = {
  type: 'radio';
  value?: FieldObjectProps;
  options: FieldObjectProps[];
};

export type FormFieldContextType<
  TFieldValues extends FieldValues,
  TType extends FormFieldType,
> = {
  control: Control<TFieldValues>;
  field: FormFieldsProps<TFieldValues, TType>;
  readOnly?: boolean;
};

export type CreateEditFormType<
  TFieldValues extends FieldValues,
  TType extends FormFieldType,
> = {
  control: Control<TFieldValues>;
  formFields: FormFieldsProps<TFieldValues, TType>[];
  readOnly?: boolean;
};

const createFormFieldContext = <TFieldValues extends FieldValues>() => {
  return createContext<{
    onOpenModal?: ({
      modalType,
      selected,
      onChange,
    }: {
      modalType?: ModalTypes;
      selected?: TFieldValues[FieldPath<TFieldValues>];
      onChange: Pick<ControllerRenderProps, 'onChange'>['onChange'];
    }) => void;
  }>({});
};

export const FormFieldContext = createFormFieldContext();

export const useFormFieldContext = () => {
  return useContext(FormFieldContext);
};
