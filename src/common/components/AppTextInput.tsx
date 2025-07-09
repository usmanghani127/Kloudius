import { AppTheme } from '@theme';
import React from 'react';
import { Controller } from 'react-hook-form';
// @ts-ignore
import { Control, FieldErrors } from 'react-hook-form/dist/types';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

type InputFieldType = TextInputProps & {
  name: string;
  control: Control;
  errors: FieldErrors;
  required: boolean;
  requiredMessage?: string;
  pattern?: string;
  errorMessage?: string;
};

export const InputField = (props: InputFieldType) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    name,
    control,
    required,
    requiredMessage = '',
    pattern = '^.+$', // accepts any input
    errorMessage = '',
    errors,
    secureTextEntry,
    ...rest
  } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur, ref } }) => (
        <View style={styles.fieldWrapper}>
          <TextInput
            ref={ref}
            secureTextEntry={secureTextEntry && !showPassword}
            style={styles.field}
            onChangeText={onChange}
            value={value}
            autoCapitalize={'none'}
            onBlur={onBlur}
            submitBehavior={'blurAndSubmit'}
            textColor={AppTheme.black}
            error={!!errors[name]}
            right={
              secureTextEntry && (
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )
            }
            {...rest}
          />
          <HelperText type="error" visible={!!errors[name]}>
            {errors[name]?.message}
          </HelperText>
        </View>
      )}
      rules={{
        required: {
          value: required,
          message: requiredMessage,
        },
        pattern: {
          value: new RegExp(pattern),
          message: errorMessage,
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  fieldWrapper: {
    marginHorizontal: 50,
    marginVertical: 15,
    alignSelf: 'stretch',
  },
  field: {
    backgroundColor: AppTheme.white,
  },
});
