import {
  Control,
  DeepPartialSkipArrayKey,
  FieldPath,
  FieldPathValue,
  FieldValues,
  PathValue,
  useWatch,
} from 'react-hook-form';

const WatchComponent = ({ children }: { children: React.ReactNode }) => {
  return children;
};

const Single = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  defaultValue,
  disabled,
  exact,
  render,
}: {
  control?: Control<TFieldValues>;
  name: TFieldName;
  defaultValue?: FieldPathValue<TFieldValues, TFieldName>;
  disabled?: boolean;
  exact?: boolean;
  render: (
    value: FieldPathValue<TFieldValues, TFieldName>,
  ) => React.ReactElement | null;
}) => {
  const watchValue = useWatch<TFieldValues, TFieldName>({
    control,
    name,
    defaultValue,
    disabled,
    exact,
  });

  return render(watchValue);
};

const Multiple = <
  TFieldValues extends FieldValues,
  TFieldNames extends readonly FieldPath<TFieldValues>[],
>({
  control,
  name,
  defaultValue,
  disabled,
  exact,
  render,
}: {
  control?: Control<TFieldValues>;
  name: readonly [...TFieldNames];
  defaultValue?: DeepPartialSkipArrayKey<TFieldValues>;
  disabled?: boolean;
  exact?: boolean;
  render: (
    value: readonly PathValue<TFieldValues, TFieldNames[number]>[],
  ) => React.ReactElement | null;
}) => {
  const watchValue = useWatch<TFieldValues>({
    control,
    name,
    defaultValue,
    disabled,
    exact,
  });

  return render(watchValue);
};

WatchComponent.Single = Single;
WatchComponent.Multiple = Multiple;

export default WatchComponent;
