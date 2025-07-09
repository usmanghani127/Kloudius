import { AppButton, ErrorState, InputField, LoadingState } from '@components';
import { RouteKeys, StackScreenProps } from '@navigation/types.ts';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { regex } from '../regex.ts';
import { ForgotPasswordInputFieldFormKeys } from '../types';
import styles from './styles';

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation<StackScreenProps<RouteKeys.FORGOT_PASSWORD>>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordInputFieldFormKeys>({
    mode: 'onSubmit',
    defaultValues: { email: '' },
  });
  const [errorMessage, setErrorMessage] = useState('');
  const isLoading = false;

  const onSubmit = () => {
    Alert.alert('Forgot Password', 'Password reset link sent!');
    goBack();
  };

  return (
    <SafeAreaView style={styles.background} testID={`${RouteKeys.FORGOT_PASSWORD}: background`}>
      <KeyboardAwareScrollView
        testID={`${RouteKeys.FORGOT_PASSWORD}: wrapper`}
        contentContainerStyle={styles.wrapper}
        showsVerticalScrollIndicator={false}
      >
        <InputField
          testID={`${RouteKeys.FORGOT_PASSWORD}: emailInputField`}
          name={'email'}
          control={control}
          errors={errors}
          required={true}
          pattern={regex.email}
          requiredMessage={t('forgotPassword.email.required', 'Email is required')}
          errorMessage={t('forgotPassword.email.invalid', 'Invalid email')}
          placeholder={t('forgotPassword.email.placeholder', 'Enter your email')}
          onSubmitEditing={handleSubmit(onSubmit)}
          returnKeyType={'done'}
        />
        <AppButton
          testID={`${RouteKeys.FORGOT_PASSWORD}: submitButton`}
          onPress={handleSubmit(onSubmit)}
          label={t('forgotPassword.submitButton', 'Send Reset Link')}
        />
      </KeyboardAwareScrollView>
      <LoadingState visible={isLoading} testID={`${RouteKeys.FORGOT_PASSWORD}: loadingState`} />
      <ErrorState
        testID={`${RouteKeys.FORGOT_PASSWORD}: errorState`}
        visible={errorMessage?.length > 0}
        title={t('forgotPassword.error.title', 'Error')}
        message={errorMessage}
        actionButtonText={t('forgotPassword.error.button', 'OK')}
        actionButtonOnPress={() => setErrorMessage('')}
      />
    </SafeAreaView>
  );
};
